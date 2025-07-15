import React, { useState, useEffect } from 'react';
import { transactionService, Transaction } from '../../services/transactionService';
import toast from 'react-hot-toast';

interface TransactionsListProps {
  creditCardId: string;
  refreshTrigger?: number;
  onEditTransaction?: (transaction: Transaction) => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  creditCardId,
  refreshTrigger = 0,
  onEditTransaction
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{
    type: string;
    category: string;
    search: string;
  }>({
    type: 'all',
    category: 'all',
    search: ''
  });

  useEffect(() => {
    loadTransactions();
  }, [creditCardId, refreshTrigger]);

  const loadTransactions = async () => {
    if (!creditCardId) return;
    
    setLoading(true);
    try {
      const data = await transactionService.getCardTransactions(creditCardId, 100);
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    if (!window.confirm('Are you sure you want to cancel this transaction?')) {
      return;
    }

    try {
      await transactionService.deleteTransaction(transactionId);
      toast.success('Transaction cancelled successfully');
      loadTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error('Failed to cancel transaction');
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = filter.type === 'all' || transaction.type === filter.type;
    const matchesCategory = filter.category === 'all' || transaction.category === filter.category;
    const matchesSearch = filter.search === '' || 
      transaction.description.toLowerCase().includes(filter.search.toLowerCase()) ||
      transaction.merchantName?.toLowerCase().includes(filter.search.toLowerCase());
    
    return matchesType && matchesCategory && matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'PURCHASE': return '🛒';
      case 'PAYMENT': return '💳';
      case 'REFUND': return '↩️';
      case 'FEE': return '💰';
      case 'CASH_ADVANCE': return '💵';
      default: return '📄';
    }
  };

  const getAmountColor = (type: string) => {
    return ['PAYMENT', 'REFUND'].includes(type) ? 'text-green-600' : 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction History</h2>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              value={filter.search}
              onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search transactions..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={filter.type}
              onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="PURCHASE">Purchase</option>
              <option value="PAYMENT">Payment</option>
              <option value="REFUND">Refund</option>
              <option value="FEE">Fee</option>
              <option value="CASH_ADVANCE">Cash Advance</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={filter.category}
              onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="GROCERIES">Groceries</option>
              <option value="DINING">Dining</option>
              <option value="GAS">Gas</option>
              <option value="UTILITIES">Utilities</option>
              <option value="ENTERTAINMENT">Entertainment</option>
              <option value="SHOPPING">Shopping</option>
              <option value="TRAVEL">Travel</option>
              <option value="HEALTHCARE">Healthcare</option>
              <option value="EDUCATION">Education</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="divide-y divide-gray-200">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {transactions.length === 0 ? 'No transactions found' : 'No transactions match your filters'}
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getTransactionIcon(transaction.type)}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {transaction.merchantName || 'Unknown Merchant'}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {transaction.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{transaction.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>{formatDate(transaction.timestamp)}</span>
                      {transaction.location && <span>📍 {transaction.location}</span>}
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {transaction.type}
                      </span>
                      {transaction.status === 'CANCELLED' && (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded">
                          CANCELLED
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-semibold ${getAmountColor(transaction.type)}`}>
                    {['PAYMENT', 'REFUND'].includes(transaction.type) ? '-' : '+'}
                    {formatCurrency(transaction.totalAmount)}
                  </div>
                  
                  {transaction.status !== 'CANCELLED' && (
                    <div className="flex space-x-2 mt-2">
                      {onEditTransaction && (
                        <button
                          onClick={() => onEditTransaction(transaction)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionsList;
