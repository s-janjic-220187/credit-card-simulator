import React, { useState, useEffect } from 'react';
import { CreditCard } from '../../contexts/UserContext';
import transactionService, { Transaction } from '../../services/transactionService';

interface CreditCardDetailsProps {
  card: CreditCard;
  isOpen: boolean;
  onClose: () => void;
}

type ManagementAction = 'freeze' | 'pin' | 'limits' | 'preferences' | 'replacement' | null;

const CreditCardDetails: React.FC<CreditCardDetailsProps> = ({ card, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'details'>('overview');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Card Management State
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<ManagementAction>(null);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [spendingLimit, setSpendingLimit] = useState('');
  const [replacementReason, setReplacementReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardFrozen, setCardFrozen] = useState(card.status === 'FROZEN');

  // Card Management Functions
  const handleManageCard = () => {
    setIsManageModalOpen(true);
  };

  const handleCloseManageModal = () => {
    setIsManageModalOpen(false);
    setActiveAction(null);
    setNewPin('');
    setConfirmPin('');
    setSpendingLimit('');
    setReplacementReason('');
  };

  const handleFreezeToggle = async () => {
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCardFrozen(!cardFrozen);
      alert(cardFrozen ? 'Card has been unfrozen' : 'Card has been frozen');
    } catch (error) {
      alert('Failed to update card status');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePinChange = async () => {
    if (newPin !== confirmPin) {
      alert('PINs do not match');
      return;
    }
    if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
      alert('PIN must be 4 digits');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('PIN has been changed successfully');
      handleCloseManageModal();
    } catch (error) {
      alert('Failed to change PIN');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSpendingLimitUpdate = async () => {
    const limit = parseFloat(spendingLimit);
    if (isNaN(limit) || limit <= 0) {
      alert('Please enter a valid spending limit');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Daily spending limit set to $${limit.toLocaleString()}`);
      handleCloseManageModal();
    } catch (error) {
      alert('Failed to update spending limit');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReplacementRequest = async () => {
    if (!replacementReason.trim()) {
      alert('Please provide a reason for replacement');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Replacement card request submitted. You will receive it in 7-10 business days.');
      handleCloseManageModal();
    } catch (error) {
      alert('Failed to submit replacement request');
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock transaction data - in real app this would come from API
  useEffect(() => {
    if (isOpen) {
      // Try to fetch real transactions first
      const fetchTransactions = async () => {
        try {
          const realTransactions = await transactionService.getCardTransactions(card.id);
          setTransactions(realTransactions);
        } catch (error) {
          // Fallback to mock data if API fails
          console.log('Using mock transaction data');
          const mockTransactions: Transaction[] = [
            {
              id: '1',
              creditCardId: card.id,
              date: '2025-07-10',
              timestamp: '2025-07-10T10:30:00Z',
              description: 'Amazon Purchase',
              amount: -89.99,
              fees: 0,
              totalAmount: -89.99,
              type: 'PURCHASE',
              category: 'SHOPPING',
              status: 'COMPLETED',
              merchantName: 'Amazon',
              merchantCategory: 'Online Retail',
              isInternational: false,
              createdAt: '2025-07-10T10:30:00Z'
            },
            {
              id: '2',
              creditCardId: card.id,
              date: '2025-07-08',
              timestamp: '2025-07-08T08:15:00Z',
              description: 'Starbucks Coffee',
              amount: -15.47,
              fees: 0,
              totalAmount: -15.47,
              type: 'PURCHASE',
              category: 'DINING',
              status: 'COMPLETED',
              merchantName: 'Starbucks',
              merchantCategory: 'Coffee Shop',
              isInternational: false,
              createdAt: '2025-07-08T08:15:00Z'
            },
            {
              id: '3',
              creditCardId: card.id,
              date: '2025-07-05',
              timestamp: '2025-07-05T14:20:00Z',
              description: 'Payment - Thank You',
              amount: 500.00,
              fees: 0,
              totalAmount: 500.00,
              type: 'PAYMENT',
              category: 'OTHER',
              status: 'COMPLETED',
              isInternational: false,
              createdAt: '2025-07-05T14:20:00Z'
            },
            {
              id: '4',
              creditCardId: card.id,
              date: '2025-07-01',
              timestamp: '2025-07-01T00:01:00Z',
              description: 'Interest Charge',
              amount: -23.45,
              fees: 0,
              totalAmount: -23.45,
              type: 'INTEREST',
              category: 'OTHER',
              status: 'COMPLETED',
              isInternational: false,
              createdAt: '2025-07-01T00:01:00Z'
            },
            {
              id: '5',
              creditCardId: card.id,
              date: '2025-06-28',
              timestamp: '2025-06-28T16:45:00Z',
              description: 'Gas Station',
              amount: -45.30,
              fees: 0,
              totalAmount: -45.30,
              type: 'PURCHASE',
              category: 'GAS',
              status: 'COMPLETED',
              merchantName: 'Shell Gas Station',
              merchantCategory: 'Gas Station',
              isInternational: false,
              createdAt: '2025-06-28T16:45:00Z'
            }
          ];
          setTransactions(mockTransactions);
        }
      };

      fetchTransactions();
    }
  }, [isOpen, card.id]);

  const formatCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(.{4})/g, '$1 ').trim();
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase': return '🛒';
      case 'payment': return '💰';
      case 'interest': return '📈';
      case 'fee': return '⚠️';
      default: return '📄';
    }
  };

  const getTransactionColor = (amount: number) => {
    return amount > 0 ? 'text-green-600' : 'text-red-600';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Credit Card Details Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Credit Card Details</h2>
              <div className="text-lg font-mono opacity-90">
                {formatCardNumber(card.cardNumber)}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: '📊 Overview', icon: '📊' },
              { id: 'transactions', label: '💳 Transactions', icon: '💳' },
              { id: 'details', label: '🔍 Details', icon: '🔍' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-700">
                    ${card.availableCredit?.toLocaleString() || (card.creditLimit - card.currentBalance).toLocaleString()}
                  </div>
                  <div className="text-green-600 text-sm">Available Credit</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-700">
                    ${card.creditLimit.toLocaleString()}
                  </div>
                  <div className="text-blue-600 text-sm">Credit Limit</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-2xl font-bold text-red-700">
                    ${card.currentBalance.toLocaleString()}
                  </div>
                  <div className="text-red-600 text-sm">Current Balance</div>
                </div>
              </div>

              {/* Usage Chart */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Credit Utilization</h3>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((card.currentBalance / card.creditLimit) * 100, 100)}%`
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>0%</span>
                  <span className="font-medium">
                    {((card.currentBalance / card.creditLimit) * 100).toFixed(1)}% Used
                  </span>
                  <span>100%</span>
                </div>
              </div>

              {/* Account Status */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Account Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      card.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {card.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">APR:</span>
                    <span className="ml-2 font-medium">{card.apr}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                <span className="text-sm text-gray-500">{transactions.length} transactions</span>
              </div>
              
              <div className="space-y-2">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{getTransactionIcon(transaction.type)}</div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                            {transaction.category && ` • ${transaction.category}`}
                          </div>
                        </div>
                      </div>
                      <div className={`font-bold text-lg ${getTransactionColor(transaction.amount)}`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {transactions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📄</div>
                  <p>No transactions available</p>
                </div>
              )}
            </div>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Card Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-4">Card Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Card Number</label>
                    <div className="font-mono">{formatCardNumber(card.cardNumber)}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Cardholder Name</label>
                    <div className="font-medium">{card.cardholderName}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Card ID</label>
                    <div className="font-mono text-sm">{card.id}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">User ID</label>
                    <div className="font-mono text-sm">{card.userId}</div>
                  </div>
                </div>
              </div>

              {/* Financial Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-4">Financial Terms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Annual Percentage Rate</label>
                    <div className="text-lg font-bold text-blue-600">{card.apr}%</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Credit Limit</label>
                    <div className="text-lg font-bold">${card.creditLimit.toLocaleString()}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Current Balance</label>
                    <div className="text-lg font-bold text-red-600">${card.currentBalance.toLocaleString()}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Available Credit</label>
                    <div className="text-lg font-bold text-green-600">
                      ${(card.availableCredit || (card.creditLimit - card.currentBalance)).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-4">Account Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      card.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {card.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Credit Utilization:</span>
                    <span className="font-medium">
                      {((card.currentBalance / card.creditLimit) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <button 
              onClick={handleManageCard}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Manage Card
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Card Management Modal - Separate high z-index modal */}
      {isManageModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-lg bg-white">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Manage Card</h2>
              <button
                onClick={handleCloseManageModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {!activeAction ? (
              /* Main Management Menu */
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-4">Choose an action:</h3>
                
                {/* Freeze/Unfreeze Card */}
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{cardFrozen ? 'Unfreeze Card' : 'Freeze Card'}</h4>
                      <p className="text-sm text-gray-600">
                        {cardFrozen ? 'Reactivate your card for transactions' : 'Temporarily disable card transactions'}
                      </p>
                    </div>
                    <button
                      onClick={handleFreezeToggle}
                      disabled={isProcessing}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        cardFrozen 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isProcessing ? 'Processing...' : (cardFrozen ? 'Unfreeze' : 'Freeze')}
                    </button>
                  </div>
                </div>

                {/* Change PIN */}
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Change PIN</h4>
                      <p className="text-sm text-gray-600">Update your 4-digit PIN for ATM and card transactions</p>
                    </div>
                    <button
                      onClick={() => setActiveAction('pin')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Change PIN
                    </button>
                  </div>
                </div>

                {/* Set Spending Limits */}
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Set Spending Limits</h4>
                      <p className="text-sm text-gray-600">Set daily transaction limits for better control</p>
                    </div>
                    <button
                      onClick={() => setActiveAction('limits')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Set Limits
                    </button>
                  </div>
                </div>

                {/* Request Replacement */}
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Request Replacement Card</h4>
                      <p className="text-sm text-gray-600">Order a new card (lost, stolen, or damaged)</p>
                    </div>
                    <button
                      onClick={() => setActiveAction('replacement')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Request
                    </button>
                  </div>
                </div>
              </div>
            ) : activeAction === 'pin' ? (
              /* PIN Change Form */
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <button
                    onClick={() => setActiveAction(null)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    ← Back
                  </button>
                  <h3 className="text-lg font-medium">Change PIN</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New PIN (4 digits)
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm PIN
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0000"
                    />
                  </div>

                  <button
                    onClick={handlePinChange}
                    disabled={isProcessing || newPin.length !== 4 || confirmPin.length !== 4}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Changing PIN...' : 'Change PIN'}
                  </button>
                </div>
              </div>
            ) : activeAction === 'limits' ? (
              /* Spending Limits Form */
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <button
                    onClick={() => setActiveAction(null)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    ← Back
                  </button>
                  <h3 className="text-lg font-medium">Set Spending Limits</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Spending Limit ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={spendingLimit}
                      onChange={(e) => setSpendingLimit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1000.00"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Current limit: No limit set
                    </p>
                  </div>

                  <button
                    onClick={handleSpendingLimitUpdate}
                    disabled={isProcessing || !spendingLimit}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Setting Limit...' : 'Set Limit'}
                  </button>
                </div>
              </div>
            ) : activeAction === 'replacement' ? (
              /* Replacement Request Form */
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <button
                    onClick={() => setActiveAction(null)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    ← Back
                  </button>
                  <h3 className="text-lg font-medium">Request Replacement Card</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for replacement
                    </label>
                    <select
                      value={replacementReason}
                      onChange={(e) => setReplacementReason(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a reason</option>
                      <option value="lost">Lost card</option>
                      <option value="stolen">Stolen card</option>
                      <option value="damaged">Damaged card</option>
                      <option value="compromised">Security compromise</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                      <svg className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="text-sm font-medium text-yellow-800">Important</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Your current card will be deactivated immediately upon confirmation. 
                          The new card will arrive in 7-10 business days.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleReplacementRequest}
                    disabled={isProcessing || !replacementReason}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Submitting Request...' : 'Request Replacement'}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default CreditCardDetails;
