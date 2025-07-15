import React, { useState } from 'react';
import { transactionService } from '../../services/transactionService';
import toast from 'react-hot-toast';

interface TransactionFormProps {
  creditCardId: string;
  onSuccess: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

type TransactionType = 'PURCHASE' | 'PAYMENT' | 'REFUND' | 'FEE' | 'CASH_ADVANCE';
type TransactionCategory = 'GROCERIES' | 'DINING' | 'GAS' | 'UTILITIES' | 'ENTERTAINMENT' | 'SHOPPING' | 'TRAVEL' | 'HEALTHCARE' | 'EDUCATION' | 'OTHER';

interface CreateTransactionData {
  amount: number;
  type: TransactionType;
  description: string;
  category: TransactionCategory;
  merchantName: string;
  location?: string;
  fees?: number;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  creditCardId,
  onSuccess,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<CreateTransactionData>({
    amount: 0,
    type: 'PURCHASE',
    description: '',
    category: 'OTHER',
    merchantName: '',
    location: '',
    fees: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const transactionTypes: { value: TransactionType; label: string; description: string }[] = [
    { value: 'PURCHASE', label: 'Purchase', description: 'Regular purchase transaction' },
    { value: 'PAYMENT', label: 'Payment', description: 'Payment towards credit card balance' },
    { value: 'REFUND', label: 'Refund', description: 'Refund from merchant' },
    { value: 'FEE', label: 'Fee', description: 'Credit card fee (annual, late, etc.)' },
    { value: 'CASH_ADVANCE', label: 'Cash Advance', description: 'Cash advance from credit card' }
  ];

  const categories: { value: TransactionCategory; label: string }[] = [
    { value: 'GROCERIES', label: 'Groceries' },
    { value: 'DINING', label: 'Dining & Restaurants' },
    { value: 'GAS', label: 'Gas & Fuel' },
    { value: 'UTILITIES', label: 'Utilities' },
    { value: 'ENTERTAINMENT', label: 'Entertainment' },
    { value: 'SHOPPING', label: 'Shopping' },
    { value: 'TRAVEL', label: 'Travel' },
    { value: 'HEALTHCARE', label: 'Healthcare' },
    { value: 'EDUCATION', label: 'Education' },
    { value: 'OTHER', label: 'Other' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' || name === 'fees' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.amount <= 0) {
      toast.error('Amount must be greater than 0');
      return;
    }

    setIsSubmitting(true);
    try {
      await transactionService.createManualTransaction(creditCardId, formData);
      toast.success('Transaction created successfully!');
      onSuccess();
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCredit = ['PAYMENT', 'REFUND'].includes(formData.type);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Manual Transaction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            Transaction Type *
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {transactionTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {transactionTypes.find(t => t.value === formData.type)?.description}
          </p>
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount ($) *
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isCredit ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
            }`}
          />
          <p className="text-xs mt-1">
            {isCredit ? (
              <span className="text-green-600">✓ This will reduce your balance</span>
            ) : (
              <span className="text-red-600">⚠ This will increase your balance</span>
            )}
          </p>
        </div>

        {['PURCHASE', 'CASH_ADVANCE', 'FEE'].includes(formData.type) && (
          <div>
            <label htmlFor="fees" className="block text-sm font-medium text-gray-700 mb-2">
              Additional Fees ($)
            </label>
            <input
              type="number"
              id="fees"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <label htmlFor="merchantName" className="block text-sm font-medium text-gray-700 mb-2">
            Merchant Name *
          </label>
          <input
            type="text"
            id="merchantName"
            name="merchantName"
            value={formData.merchantName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Amazon, Walmart, Starbucks"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description of the transaction"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., New York, NY"
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Transaction'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
