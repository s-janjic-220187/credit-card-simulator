import api from './api';
import { 
  ApiResponse, 
  CreditCard, 
  Transaction, 
  TransactionStats,
  CreateCreditCardData, 
  CreateTransactionData 
} from '../types';

export const creditCardService = {
  // Get all credit cards for a user
  async getCreditCards(userId: string = '1'): Promise<CreditCard[]> {
    const response = await api.get<ApiResponse<CreditCard[]>>(`/${userId}/cards`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch credit cards');
    }
    return response.data.data;
  },

  // Get a specific credit card
  async getCreditCard(cardId: string): Promise<CreditCard> {
    const response = await api.get<ApiResponse<CreditCard>>(`/cards/${cardId}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch credit card');
    }
    return response.data.data;
  },

  // Create a new credit card
  async createCreditCard(cardData: CreateCreditCardData, userId: string = '1'): Promise<CreditCard> {
    const response = await api.post<ApiResponse<CreditCard>>(`/${userId}/cards`, cardData);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to create credit card');
    }
    return response.data.data;
  },

  // Update credit card
  async updateCreditCard(cardId: string, cardData: Partial<CreateCreditCardData>): Promise<CreditCard> {
    const response = await api.put<ApiResponse<CreditCard>>(`/cards/${cardId}`, cardData);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to update credit card');
    }
    return response.data.data;
  },

  // Freeze credit card
  async freezeCard(cardId: string): Promise<CreditCard> {
    const response = await api.post<ApiResponse<CreditCard>>(`/cards/${cardId}/freeze`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to freeze credit card');
    }
    return response.data.data;
  },

  // Unfreeze credit card
  async unfreezeCard(cardId: string): Promise<CreditCard> {
    const response = await api.post<ApiResponse<CreditCard>>(`/cards/${cardId}/unfreeze`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to unfreeze credit card');
    }
    return response.data.data;
  },

  // Close credit card
  async closeCard(cardId: string): Promise<CreditCard> {
    const response = await api.post<ApiResponse<CreditCard>>(`/cards/${cardId}/close`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to close credit card');
    }
    return response.data.data;
  },

  // Simulate a purchase
  async simulatePurchase(cardId: string, transactionData: CreateTransactionData): Promise<Transaction> {
    const response = await api.post<ApiResponse<Transaction>>(`/cards/${cardId}/transactions/purchase`, transactionData);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to create purchase transaction');
    }
    return response.data.data;
  },

  // Simulate a refund
  async simulateRefund(cardId: string, transactionData: CreateTransactionData): Promise<Transaction> {
    const response = await api.post<ApiResponse<Transaction>>(`/cards/${cardId}/transactions/refund`, transactionData);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to create refund transaction');
    }
    return response.data.data;
  },

  // Get transactions for a credit card
  async getTransactions(cardId: string, limit: number = 50, offset: number = 0): Promise<Transaction[]> {
    const response = await api.get<ApiResponse<Transaction[]>>(`/cards/${cardId}/transactions`, {
      params: { limit, offset }
    });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch transactions');
    }
    return response.data.data;
  },

  // Get transaction statistics
  async getTransactionStats(cardId: string, days: number = 30): Promise<TransactionStats> {
    const response = await api.get<ApiResponse<TransactionStats>>(`/cards/${cardId}/transactions/stats`, {
      params: { days }
    });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Failed to fetch transaction statistics');
    }
    return response.data.data;
  },
};
