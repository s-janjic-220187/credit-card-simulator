import api from './api';
import { ApiResponse } from '../types';

export interface Transaction {
  id: string;
  creditCardId: string;
  amount: number;
  fees: number;
  totalAmount: number;
  description: string;
  category: string;
  type: 'PURCHASE' | 'PAYMENT' | 'CASH_ADVANCE' | 'BALANCE_TRANSFER' | 'FEE' | 'INTEREST' | 'REFUND';
  status: 'PENDING' | 'COMPLETED' | 'DECLINED' | 'CANCELLED';
  date: string;
  timestamp: string;
  merchantName?: string;
  merchantCategory?: string;
  location?: string;
  isInternational: boolean;
  referenceId?: string;
  statementId?: string;
  createdAt: string;
}

export const transactionService = {
  // Get all transactions for a user
  async getTransactions(userId: string): Promise<Transaction[]> {
    const response = await api.get<ApiResponse<Transaction[]>>(`/transactions/user/${userId}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch transactions');
    }
    return response.data.data;
  },

  // Get transactions for a specific credit card
  async getCardTransactions(cardId: string, limit: number = 50, offset: number = 0): Promise<Transaction[]> {
    const response = await api.get<ApiResponse<{ transactions: Transaction[] }>>(`/transactions/${cardId}/history`, {
      params: { limit, offset }
    });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch card transactions');
    }
    return response.data.data.transactions;
  },

  // Get transaction by ID
  async getTransaction(transactionId: string): Promise<Transaction> {
    const response = await api.get<ApiResponse<Transaction>>(`/transactions/${transactionId}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch transaction');
    }
    return response.data.data;
  },

  // Create a new transaction
  async createTransaction(transactionData: Partial<Transaction>): Promise<Transaction> {
    const response = await api.post<ApiResponse<Transaction>>('/transactions', transactionData);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to create transaction');
    }
    return response.data.data;
  },

  // Get transaction statistics for a card
  async getCardTransactionStats(cardId: string, days: number = 30): Promise<{
    totalSpent: number;
    totalTransactions: number;
    avgTransactionAmount: number;
    categoryBreakdown: { category: string; amount: number; count: number }[];
  }> {
    const response = await api.get<ApiResponse<any>>(`/transactions/${cardId}/analytics`, {
      params: { days }
    });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch transaction statistics');
    }
    return response.data.data;
  },

  // Get transaction analytics for a card
  async getTransactionAnalytics(cardId: string, startDate?: string, endDate?: string): Promise<any> {
    const params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const response = await api.get<ApiResponse<any>>(`/transactions/${cardId}/analytics`, { params });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch transaction analytics');
    }
    return response.data.data;
  },

  // Get transaction impact simulation
  async getTransactionImpact(cardId: string, amount: number, type: string, isInternational: boolean = false): Promise<any> {
    const response = await api.get<ApiResponse<any>>(`/transactions/${cardId}/impact`, {
      params: { amount, type, isInternational }
    });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch transaction impact');
    }
    return response.data.data;
  },

  // Search transactions
  async searchTransactions(params: {
    userId?: string;
    cardId?: string;
    startDate?: string;
    endDate?: string;
    minAmount?: number;
    maxAmount?: number;
    category?: string;
    type?: string;
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<{
    transactions: Transaction[];
    total: number;
    hasMore: boolean;
  }> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await api.get<ApiResponse<any>>(`/transactions/search?${queryParams.toString()}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to search transactions');
    }
    return response.data.data;
  }
};

export default transactionService;
