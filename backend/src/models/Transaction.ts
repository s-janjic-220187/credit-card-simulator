import { Transaction, TransactionType, TransactionCategory } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { CreditCardService } from './CreditCard';

export interface CreateTransactionData {
  creditCardId: string;
  type: TransactionType;
  amount: number;
  fees?: number;
  description: string;
  category?: TransactionCategory;
  merchantName?: string;
  location?: string;
}

export class TransactionService {
  /**
   * Create a new transaction
   */
  static async createTransaction(transactionData: CreateTransactionData): Promise<Transaction> {
    const { creditCardId, amount, type } = transactionData;

    // For purchases, check if transaction is allowed
    if (type === 'PURCHASE') {
      const isAllowed = await CreditCardService.isTransactionAllowed(creditCardId, amount);
      if (!isAllowed) {
        throw new Error('Transaction declined: Insufficient credit or card not active');
      }
    }

    // Create the transaction
    const transaction = await prisma.transaction.create({
      data: {
        ...transactionData,
        totalAmount: transactionData.amount + (transactionData.fees || 0),
        category: transactionData.category || 'OTHER',
        status: 'COMPLETED',
        referenceId: this.generateReferenceId(),
      },
    });

    // Update card balance based on transaction type
    const isCredit = ['REFUND', 'PAYMENT', 'CREDIT'].includes(type);
    await CreditCardService.updateCardBalance(creditCardId, amount, isCredit);

    return transaction;
  }

  /**
   * Generate a unique reference ID for transactions
   */
  static generateReferenceId(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `TXN${timestamp}${random}`;
  }

  /**
   * Find transactions by credit card ID
   */
  static async findTransactionsByCardId(
    creditCardId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Transaction[]> {
    return prisma.transaction.findMany({
      where: { creditCardId },
      orderBy: { timestamp: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  /**
   * Find transaction by ID
   */
  static async findTransactionById(id: string): Promise<Transaction | null> {
    return prisma.transaction.findUnique({
      where: { id },
    });
  }

  /**
   * Find transactions by date range
   */
  static async findTransactionsByDateRange(
    creditCardId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    return prisma.transaction.findMany({
      where: {
        creditCardId,
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { timestamp: 'desc' },
    });
  }

  /**
   * Find transactions by category
   */
  static async findTransactionsByCategory(
    creditCardId: string,
    category: TransactionCategory
  ): Promise<Transaction[]> {
    return prisma.transaction.findMany({
      where: {
        creditCardId,
        category,
      },
      orderBy: { timestamp: 'desc' },
    });
  }

  /**
   * Get transaction statistics for a card
   */
  static async getTransactionStats(creditCardId: string, days: number = 30): Promise<{
    totalTransactions: number;
    totalSpent: number;
    totalRefunds: number;
    avgTransactionAmount: number;
    categoryBreakdown: { category: string; amount: number; count: number }[];
  }> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const transactions = await this.findTransactionsByDateRange(
      creditCardId,
      startDate,
      new Date()
    );

    const purchases = transactions.filter(t => t.type === 'PURCHASE');
    const refunds = transactions.filter(t => t.type === 'REFUND');

    const totalSpent = purchases.reduce((sum, t) => sum + t.amount, 0);
    const totalRefunds = refunds.reduce((sum, t) => sum + t.amount, 0);

    // Category breakdown
    const categoryMap = new Map<string, { amount: number; count: number }>();
    
    purchases.forEach(transaction => {
      const category = transaction.category;
      const existing = categoryMap.get(category) || { amount: 0, count: 0 };
      categoryMap.set(category, {
        amount: existing.amount + transaction.amount,
        count: existing.count + 1,
      });
    });

    const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      amount: data.amount,
      count: data.count,
    }));

    return {
      totalTransactions: transactions.length,
      totalSpent,
      totalRefunds,
      avgTransactionAmount: purchases.length > 0 ? totalSpent / purchases.length : 0,
      categoryBreakdown,
    };
  }

  /**
   * Simulate a purchase transaction
   */
  static async simulatePurchase(
    creditCardId: string,
    amount: number,
    description: string,
    category: TransactionCategory = 'OTHER',
    merchantName?: string,
    location?: string
  ): Promise<Transaction> {
    return this.createTransaction({
      creditCardId,
      type: 'PURCHASE',
      amount,
      description,
      category,
      merchantName,
      location,
    });
  }

  /**
   * Simulate a refund transaction
   */
  static async simulateRefund(
    creditCardId: string,
    amount: number,
    description: string,
    originalTransactionId?: string
  ): Promise<Transaction> {
    let refundDescription = `Refund: ${description}`;
    if (originalTransactionId) {
      refundDescription += ` (Ref: ${originalTransactionId})`;
    }

    return this.createTransaction({
      creditCardId,
      type: 'REFUND',
      amount,
      description: refundDescription,
      category: 'OTHER',
    });
  }

  /**
   * Cancel a pending transaction
   */
  static async cancelTransaction(transactionId: string): Promise<Transaction> {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    if (transaction.status !== 'PENDING') {
      throw new Error('Only pending transactions can be cancelled');
    }

    return prisma.transaction.update({
      where: { id: transactionId },
      data: { status: 'CANCELLED' },
    });
  }
}
