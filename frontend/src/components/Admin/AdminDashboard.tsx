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

import React, { useEffect, useState } from "react";
import { useI18n } from "../../contexts/I18nContext";
import adminService, {
  AdminCreditCard,
  AdminStats,
  AdminTransaction,
  AdminUser,
} from "../../services/adminService";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [creditCards, setCreditCards] = useState<AdminCreditCard[]>([]);
  const [transactions, setTransactions] = useState<AdminTransaction[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [editingCard, setEditingCard] = useState<AdminCreditCard | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("📊 Loading dashboard data using admin service...");

      const [users, creditCards, transactions, stats] = await Promise.all([
        adminService.getAllUsers(),
        adminService.getAllCreditCards(),
        adminService.getRecentTransactions(20),
        adminService.getSystemStats(),
      ]);

      console.log("✅ Dashboard data loaded successfully");
      console.log("Users:", users.length);
      console.log("Credit Cards:", creditCards.length);
      console.log("Transactions:", transactions.length);
      console.log("Stats:", stats);

      setUsers(users);
      setCreditCards(creditCards);
      setTransactions(transactions);
      setStats(stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
      console.error("❌ Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await adminService.deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      alert("User deleted successfully");
    } catch (err) {
      alert(
        "Failed to delete user: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  const handleUpdateCreditCard = async (
    cardId: string,
    updatedData: Partial<AdminCreditCard>
  ) => {
    try {
      const updatedCard = await adminService.updateCreditCard(
        cardId,
        updatedData
      );
      setCreditCards((cards) =>
        cards.map((card) =>
          card.id === cardId ? { ...card, ...updatedCard } : card
        )
      );
      setEditingCard(null);
      alert("Credit card updated successfully");
    } catch (err) {
      alert(
        "Failed to update credit card: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const maskCardNumber = (cardNumber: string) => {
    return "**** **** **** " + cardNumber.slice(-4);
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>{t.components.adminDashboard.loadingMessage}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error">
          <h2>{t.admin.dashboard.errorLoading}</h2>
          <p>{error}</p>
          <button onClick={loadDashboardData} className="btn-primary">
            {t.components.adminDashboard.retry}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>{t.admin.dashboard.title}</h1>
        <p>{t.admin.dashboard.subtitle}</p>
      </div>

      <div className="admin-nav">
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          {t.admin.dashboard.tabs.overview}
        </button>
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          {t.admin.dashboard.tabs.users} ({users.length})
        </button>
        <button
          className={activeTab === "cards" ? "active" : ""}
          onClick={() => setActiveTab("cards")}
        >
          {t.admin.dashboard.tabs.creditCards} ({creditCards.length})
        </button>
        <button
          className={activeTab === "transactions" ? "active" : ""}
          onClick={() => setActiveTab("transactions")}
        >
          {t.admin.dashboard.tabs.transactions}
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "overview" && stats && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{t.admin.dashboard.stats.totalUsers}</h3>
                <div className="stat-number">{stats.users.total}</div>
                <div className="stat-detail">
                  {stats.users.recentlyCreated} new this month
                </div>
              </div>
              <div className="stat-card">
                <h3>{t.admin.dashboard.stats.creditCards}</h3>
                <div className="stat-number">{stats.cards.total}</div>
                <div className="stat-detail">
                  {t.admin.dashboard.stats.activeCards}
                </div>
              </div>
              <div className="stat-card">
                <h3>{t.admin.dashboard.stats.transactions}</h3>
                <div className="stat-number">{stats.transactions.total}</div>
                <div className="stat-detail">
                  {formatCurrency(stats.transactions.totalValue)} total volume
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h2>{t.admin.dashboard.sections.recentActivity}</h2>
              <div className="activity-list">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="activity-item">
                    <div className="activity-details">
                      <strong>{transaction.description}</strong>
                      <div className="activity-meta">
                        {" "}
                        {transaction.creditCard?.user.profile?.firstName ||
                          "Unknown"}{" "}
                        {transaction.creditCard?.user.profile?.lastName ||
                          "User"}{" "}
                        -
                        {transaction.creditCard?.cardNumber
                          ? maskCardNumber(transaction.creditCard.cardNumber)
                          : "Unknown Card"}{" "}
                        -{formatDate(transaction.date)}
                      </div>
                    </div>
                    <div className="activity-amount">
                      {formatCurrency(
                        transaction.totalAmount || transaction.amount
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="users-section">
            <div className="section-header">
              <h2>{t.admin.dashboard.sections.userManagement}</h2>
              <button onClick={loadDashboardData} className="btn-secondary">
                {t.components.adminDashboard.refresh}
              </button>
            </div>

            <div className="users-table">
              <div className="table-header">
                <div>{t.components.adminDashboard.user}</div>
                <div>{t.common.email}</div>
                <div>{t.admin.dashboard.sections.creditScore}</div>
                <div>{t.components.adminDashboard.cards}</div>
                <div>{t.common.status}</div>
                <div>{t.components.adminDashboard.actions}</div>
              </div>
              {users.map((user) => (
                <div key={user.id} className="table-row">
                  <div className="user-info">
                    <strong>
                      {user.profile?.firstName} {user.profile?.lastName}
                    </strong>
                    <div className="user-username">@{user.username}</div>
                  </div>
                  <div>{user.email}</div>
                  <div>{user.profile?.creditScore || "N/A"}</div>
                  <div>{user.creditCards?.length || 0}</div>
                  <div
                    className={`status ${
                      user.isActive ? "active" : "inactive"
                    }`}
                  >
                    {user.isActive
                      ? t.components.adminDashboard.cardStatuses.active
                      : t.components.adminDashboard.cardStatuses.inactive}
                  </div>
                  <div className="user-actions">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="btn-small btn-primary"
                    >
                      {t.components.adminDashboard.view}
                    </button>
                    {user.role !== "ADMIN" && (
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="btn-small btn-danger"
                      >
                        {t.components.adminDashboard.delete}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "cards" && (
          <div className="cards-section">
            <div className="section-header">
              <h2>{t.admin.dashboard.sections.creditCardManagement}</h2>
              <button onClick={loadDashboardData} className="btn-secondary">
                {t.components.adminDashboard.refresh}
              </button>
            </div>

            <div className="cards-grid">
              {creditCards.map((card) => (
                <div key={card.id} className="card-item">
                  <div className="card-header">
                    <h3>{maskCardNumber(card.cardNumber)}</h3>
                    <span
                      className={`card-status ${card.status.toLowerCase()}`}
                    >
                      {card.status}
                    </span>
                  </div>
                  <div className="card-details">
                    <p>
                      <strong>{t.components.adminDashboard.cardholder}:</strong>{" "}
                      {card.cardholderName}
                    </p>
                    <p>
                      <strong>{t.components.adminDashboard.limit}:</strong>{" "}
                      {formatCurrency(card.creditLimit)}
                    </p>
                    <p>
                      <strong>{t.components.adminDashboard.balance}:</strong>{" "}
                      {formatCurrency(card.currentBalance)}
                    </p>
                    <p>
                      <strong>{t.components.adminDashboard.available}:</strong>{" "}
                      {formatCurrency(card.creditLimit - card.currentBalance)}
                    </p>
                    <p>
                      <strong>{t.components.adminDashboard.issued}:</strong>{" "}
                      {formatDate(card.issueDate)}
                    </p>
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

        {activeTab === "transactions" && (
          <div className="transactions-section">
            <div className="section-header">
              <h2>{t.components.adminDashboard.recentTransactions}</h2>
              <button onClick={loadDashboardData} className="btn-secondary">
                {t.components.adminDashboard.refresh}
              </button>
            </div>

            <div className="transactions-table">
              <div className="table-header">
                <div>{t.components.adminDashboard.date}</div>
                <div>{t.common.description}</div>
                <div>{t.components.adminDashboard.user}</div>
                <div>{t.components.adminDashboard.card}</div>
                <div>{t.common.amount}</div>
              </div>
              {transactions.map((transaction) => (
                <div key={transaction.id} className="table-row">
                  <div>{formatDate(transaction.date)}</div>
                  <div>{transaction.description}</div>
                  <div>
                    {transaction.creditCard?.user.profile?.firstName ||
                      "Unknown"}{" "}
                    {transaction.creditCard?.user.profile?.lastName || "User"}
                    <div className="user-email">
                      {transaction.creditCard?.user.email || "Unknown Email"}
                    </div>
                  </div>
                  <div>
                    {transaction.creditCard?.cardNumber
                      ? maskCardNumber(transaction.creditCard.cardNumber)
                      : "Unknown Card"}
                  </div>
                  <div className="transaction-amount">
                    {formatCurrency(
                      transaction.totalAmount || transaction.amount
                    )}
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t.components.adminDashboard.userDetails}</h2>
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
                  <h3>{t.components.adminDashboard.personalInformation}</h3>
                  <p>
                    <strong>{t.components.adminDashboard.name}:</strong>{" "}
                    {selectedUser.profile?.firstName}{" "}
                    {selectedUser.profile?.lastName}
                  </p>
                  <p>
                    <strong>{t.common.email}:</strong> {selectedUser.email}
                  </p>
                  <p>
                    <strong>{t.common.username}:</strong>{" "}
                    {selectedUser.username}
                  </p>
                  <p>
                    <strong>
                      {t.admin.dashboard.userManagement.userDetails.role}:
                    </strong>{" "}
                    {selectedUser.role}
                  </p>
                  <p>
                    <strong>{t.common.status}:</strong>{" "}
                    {selectedUser.isActive
                      ? t.common.active
                      : t.common.inactive}
                  </p>
                  <p>
                    <strong>
                      {t.admin.dashboard.userManagement.userDetails.memberSince}
                      :
                    </strong>{" "}
                    {formatDate(selectedUser.createdAt)}
                  </p>
                  <p>
                    <strong>
                      {t.admin.dashboard.userManagement.userDetails.creditScore}
                      :
                    </strong>{" "}
                    {selectedUser.profile?.creditScore || "N/A"}
                  </p>
                </div>
                <div className="detail-section">
                  <h3>
                    {t.admin.dashboard.userManagement.userDetails.creditCards} (
                    {selectedUser.creditCards?.length || 0})
                  </h3>
                  {selectedUser.creditCards?.map((card) => (
                    <div key={card.id} className="card-summary">
                      <p>
                        <strong>{maskCardNumber(card.cardNumber)}</strong>
                      </p>
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t.components.adminDashboard.editCreditCard}</h2>
              <button
                onClick={() => setEditingCard(null)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const updatedData = {
                    creditLimit: parseFloat(
                      formData.get("creditLimit") as string
                    ),
                    currentBalance: parseFloat(
                      formData.get("currentBalance") as string
                    ),
                    status: formData.get("status") as string,
                  };
                  handleUpdateCreditCard(editingCard.id, updatedData);
                }}
              >
                <div className="form-grid">
                  <div>
                    <label htmlFor="creditLimit">
                      {t.components.adminDashboard.creditLimit}:
                    </label>
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
                    <label htmlFor="currentBalance">
                      {t.components.adminDashboard.currentBalance}:
                    </label>
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
                    <label htmlFor="status">{t.common.status}:</label>
                    <select
                      id="status"
                      name="status"
                      defaultValue={editingCard.status}
                      required
                    >
                      <option value="ACTIVE">
                        {t.components.adminDashboard.cardStatuses.active}
                      </option>
                      <option value="INACTIVE">
                        {t.components.adminDashboard.cardStatuses.inactive}
                      </option>
                      <option value="SUSPENDED">
                        {t.components.adminDashboard.cardStatuses.suspended}
                      </option>
                      <option value="CLOSED">
                        {t.components.adminDashboard.cardStatuses.closed}
                      </option>
                    </select>
                  </div>
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setEditingCard(null)}
                    className="btn-secondary"
                  >
                    {t.components.adminDashboard.cancel}
                  </button>
                  <button type="submit" className="btn-primary">
                    {t.components.adminDashboard.updateCard}
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
