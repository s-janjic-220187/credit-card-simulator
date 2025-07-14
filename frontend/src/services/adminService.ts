import api from './api';

export interface AdminStats {
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

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  profile?: {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    annualIncome?: number;
    creditScore?: number;
    employmentStatus?: string;
  };
  creditCards?: any[];
}

export interface AdminCreditCard {
  id: string;
  userId: string;
  cardNumber: string;
  cardholderName: string;
  creditLimit: number;
  currentBalance: number;
  availableCredit: number;
  apr: number;
  status: string;
  issueDate: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    username: string;
    email: string;
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
  transactions?: any[];
}

export interface AdminTransaction {
  id: string;
  creditCardId: string;
  date: string;
  description: string;
  amount: number;
  totalAmount: number;  // Add this property
  type: string;
  category: string;
  status: string;
  createdAt: string;
  creditCard?: {  // Add nested creditCard data
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

class AdminService {
  /**
   * Get all users with their profiles and credit cards
   */
  async getAllUsers(): Promise<AdminUser[]> {
    const response = await api.get('/admin/users');
    return response.data.data;
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<AdminUser> {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data.data;
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, profileData: any): Promise<AdminUser> {
    const response = await api.put(`/admin/users/${userId}/profile`, profileData);
    return response.data.data;
  }

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<void> {
    await api.delete(`/admin/users/${userId}`);
  }

  /**
   * Get all credit cards with user information
   */
  async getAllCreditCards(): Promise<AdminCreditCard[]> {
    const response = await api.get('/admin/credit-cards');
    return response.data.data;
  }

  /**
   * Update credit card
   */
  async updateCreditCard(cardId: string, cardData: any): Promise<AdminCreditCard> {
    const response = await api.put(`/admin/credit-cards/${cardId}`, cardData);
    return response.data.data;
  }

  /**
   * Get system statistics
   */
  async getSystemStats(): Promise<AdminStats> {
    const response = await api.get('/admin/stats');
    return response.data.data;
  }

  /**
   * Get recent transactions
   */
  async getRecentTransactions(limit: number = 20): Promise<AdminTransaction[]> {
    const response = await api.get(`/admin/transactions?limit=${limit}`);
    return response.data.data;
  }

  /**
   * Create initial admin user
   */
  async createInitialAdmin(adminData: { username: string; email: string; password: string }): Promise<AdminUser> {
    const response = await api.post('/admin/create-admin', adminData);
    return response.data.data;
  }
}

export default new AdminService();
