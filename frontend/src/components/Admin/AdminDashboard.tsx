/**
 * Admin Dashboard
 * 
 * Complete administrative interface for managing users, credit cards,
 * and system monitoring in the SJ-CCMS application.
 * 
 * Features:
 * - User management (view, edit, delete)
 * - Credit card oversight
 * - System statistics
 * - Recent transactions monitoring
 * 
 * @author Credit Card Simulator Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    creditScore?: number;
  };
  creditCards: CreditCard[];
}

interface CreditCard {
  id: string;
  cardNumber: string;
  cardholderName: string;
  creditLimit: number;
  currentBalance: number;
  status: string;
  issueDate: string;
}

interface Transaction {
  id: string;
  amount: number;
  totalAmount: number;
  description: string;
  date: string;
  creditCard: {
    cardNumber: string;
    user: {
      email: string;
      profile?: {
        firstName?: string;
        lastName?: string;
      };
    };
  };
}

interface SystemStats {
  users: {
    total: number;
    recentlyCreated: number;
  };
  cards: {
    total: number;
  };
  transactions: {
    total: number;
    totalValue: number;
  };
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingCard, setEditingCard] = useState<CreditCard | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      const [usersRes, cardsRes, transactionsRes, statsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/credit-cards'),
        fetch('/api/admin/transactions?limit=20'),
        fetch('/api/admin/stats')
      ]);

      if (!usersRes.ok || !cardsRes.ok || !transactionsRes.ok || !statsRes.ok) {
        throw new Error('Failed to load admin data');
      }

      const [usersData, cardsData, transactionsData, statsData] = await Promise.all([
        usersRes.json(),
        cardsRes.json(),
        transactionsRes.json(),
        statsRes.json()
      ]);

      setUsers(usersData.data || []);
      setCreditCards(cardsData.data || []);
      setTransactions(transactionsData.data || []);
      setStats(statsData.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully');
    } catch (err) {
      alert('Failed to delete user: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleUpdateCreditCard = async (cardId: string, updatedData: Partial<CreditCard>) => {
    try {
      const response = await fetch(`/api/admin/credit-cards/${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update credit card');
      }

      const result = await response.json();
      setCreditCards(cards => 
        cards.map(card => card.id === cardId ? { ...card, ...result.data } : card)
      );
      setEditingCard(null);
      alert('Credit card updated successfully');
    } catch (err) {
      alert('Failed to update credit card: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD' 
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const maskCardNumber = (cardNumber: string) => {
    return '**** **** **** ' + cardNumber.slice(-4);
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error">
          <h2>Error Loading Dashboard</h2>
          <p>{error}</p>
          <button onClick={loadDashboardData} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>SJ-CCMS Admin Dashboard</h1>
        <p>Complete system oversight and user management</p>
      </div>

      <div className="admin-nav">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Users ({users.length})
        </button>
        <button 
          className={activeTab === 'cards' ? 'active' : ''}
          onClick={() => setActiveTab('cards')}
        >
          Credit Cards ({creditCards.length})
        </button>
        <button 
          className={activeTab === 'transactions' ? 'active' : ''}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'overview' && stats && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <div className="stat-number">{stats.users.total}</div>
                <div className="stat-detail">
                  {stats.users.recentlyCreated} new this month
                </div>
              </div>
              <div className="stat-card">
                <h3>Credit Cards</h3>
                <div className="stat-number">{stats.cards.total}</div>
                <div className="stat-detail">Active cards in system</div>
              </div>
              <div className="stat-card">
                <h3>Transactions</h3>
                <div className="stat-number">{stats.transactions.total}</div>
                <div className="stat-detail">
                  {formatCurrency(stats.transactions.totalValue)} total volume
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {transactions.slice(0, 5).map(transaction => (
                  <div key={transaction.id} className="activity-item">
                    <div className="activity-details">
                      <strong>{transaction.description}</strong>
                      <div className="activity-meta">
                        {transaction.creditCard.user.profile?.firstName} {transaction.creditCard.user.profile?.lastName} - 
                        {maskCardNumber(transaction.creditCard.cardNumber)} - 
                        {formatDate(transaction.date)}
                      </div>
                    </div>
                    <div className="activity-amount">
                      {formatCurrency(transaction.totalAmount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <div className="section-header">
              <h2>User Management</h2>
              <button onClick={loadDashboardData} className="btn-secondary">
                Refresh
              </button>
            </div>

            <div className="users-table">
              <div className="table-header">
                <div>User</div>
                <div>Email</div>
                <div>Credit Score</div>
                <div>Cards</div>
                <div>Status</div>
                <div>Actions</div>
              </div>
              {users.map(user => (
                <div key={user.id} className="table-row">
                  <div className="user-info">
                    <strong>
                      {user.profile?.firstName} {user.profile?.lastName}
                    </strong>
                    <div className="user-username">@{user.username}</div>
                  </div>
                  <div>{user.email}</div>
                  <div>{user.profile?.creditScore || 'N/A'}</div>
                  <div>{user.creditCards.length}</div>
                  <div className={`status ${user.isActive ? 'active' : 'inactive'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </div>
                  <div className="user-actions">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="btn-small btn-primary"
                    >
                      View
                    </button>
                    {user.role !== 'ADMIN' && (
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="btn-small btn-danger"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="cards-section">
            <div className="section-header">
              <h2>Credit Card Management</h2>
              <button onClick={loadDashboardData} className="btn-secondary">
                Refresh
              </button>
            </div>

            <div className="cards-grid">
              {creditCards.map(card => (
                <div key={card.id} className="card-item">
                  <div className="card-header">
                    <h3>{maskCardNumber(card.cardNumber)}</h3>
                    <span className={`card-status ${card.status.toLowerCase()}`}>
                      {card.status}
                    </span>
                  </div>
                  <div className="card-details">
                    <p><strong>Cardholder:</strong> {card.cardholderName}</p>
                    <p><strong>Limit:</strong> {formatCurrency(card.creditLimit)}</p>
                    <p><strong>Balance:</strong> {formatCurrency(card.currentBalance)}</p>
                    <p><strong>Available:</strong> {formatCurrency(card.creditLimit - card.currentBalance)}</p>
                    <p><strong>Issued:</strong> {formatDate(card.issueDate)}</p>
                  </div>
                  <div className="card-actions">
                    <button 
                      onClick={() => setEditingCard(card)}
                      className="btn-small btn-primary"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transactions-section">
            <div className="section-header">
              <h2>Recent Transactions</h2>
              <button onClick={loadDashboardData} className="btn-secondary">
                Refresh
              </button>
            </div>

            <div className="transactions-table">
              <div className="table-header">
                <div>Date</div>
                <div>Description</div>
                <div>User</div>
                <div>Card</div>
                <div>Amount</div>
              </div>
              {transactions.map(transaction => (
                <div key={transaction.id} className="table-row">
                  <div>{formatDate(transaction.date)}</div>
                  <div>{transaction.description}</div>
                  <div>
                    {transaction.creditCard.user.profile?.firstName} {transaction.creditCard.user.profile?.lastName}
                    <div className="user-email">{transaction.creditCard.user.email}</div>
                  </div>
                  <div>{maskCardNumber(transaction.creditCard.cardNumber)}</div>
                  <div className="transaction-amount">
                    {formatCurrency(transaction.totalAmount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>User Details</h2>
              <button 
                onClick={() => setSelectedUser(null)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="user-detail-grid">
                <div className="detail-section">
                  <h3>Personal Information</h3>
                  <p><strong>Name:</strong> {selectedUser.profile?.firstName} {selectedUser.profile?.lastName}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Username:</strong> {selectedUser.username}</p>
                  <p><strong>Role:</strong> {selectedUser.role}</p>
                  <p><strong>Status:</strong> {selectedUser.isActive ? 'Active' : 'Inactive'}</p>
                  <p><strong>Member Since:</strong> {formatDate(selectedUser.createdAt)}</p>
                  <p><strong>Credit Score:</strong> {selectedUser.profile?.creditScore || 'N/A'}</p>
                </div>
                <div className="detail-section">
                  <h3>Credit Cards ({selectedUser.creditCards.length})</h3>
                  {selectedUser.creditCards.map(card => (
                    <div key={card.id} className="card-summary">
                      <p><strong>{maskCardNumber(card.cardNumber)}</strong></p>
                      <p>Limit: {formatCurrency(card.creditLimit)}</p>
                      <p>Balance: {formatCurrency(card.currentBalance)}</p>
                      <p>Status: {card.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Edit Modal */}
      {editingCard && (
        <div className="modal-overlay" onClick={() => setEditingCard(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Credit Card</h2>
              <button 
                onClick={() => setEditingCard(null)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const updatedData = {
                  creditLimit: parseFloat(formData.get('creditLimit') as string),
                  currentBalance: parseFloat(formData.get('currentBalance') as string),
                  status: formData.get('status') as string
                };
                handleUpdateCreditCard(editingCard.id, updatedData);
              }}>
                <div className="form-grid">
                  <div>
                    <label htmlFor="creditLimit">Credit Limit:</label>
                    <input
                      type="number"
                      id="creditLimit"
                      name="creditLimit"
                      defaultValue={editingCard.creditLimit}
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="currentBalance">Current Balance:</label>
                    <input
                      type="number"
                      id="currentBalance"
                      name="currentBalance"
                      defaultValue={editingCard.currentBalance}
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="status">Status:</label>
                    <select
                      id="status"
                      name="status"
                      defaultValue={editingCard.status}
                      required
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                      <option value="SUSPENDED">Suspended</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setEditingCard(null)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Update Card
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
