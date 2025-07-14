import { Request, Response } from 'express';
import TransactionService, { TransactionRequest, TransactionType } from '../services/TransactionService';
import prisma from '../lib/prisma';

export class TransactionController {
  /**
   * Simulate a single transaction
   */
  static async simulateTransaction(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;
      const {
        amount,
        type,
        description,
        merchantCategory,
        isInternational,
        cashAdvanceLocation,
      } = req.body;

      if (!amount || !type) {
        res.status(400).json({
          success: false,
          message: 'Amount and transaction type are required',
        });
        return;
      }

      if (!Object.values(TransactionType).includes(type)) {
        res.status(400).json({
          success: false,
          message: 'Invalid transaction type',
          validTypes: Object.values(TransactionType),
        });
        return;
      }

      const transactionRequest: TransactionRequest = {
        creditCardId: cardId,
        amount: Number(amount),
        type,
        description,
        merchantCategory,
        isInternational,
        cashAdvanceLocation,
      };

      const result = await TransactionService.simulateTransaction(transactionRequest);

      res.status(201).json({
        success: true,
        message: 'Transaction simulated successfully',
        data: result,
      });
    } catch (error) {
      console.error('Error simulating transaction:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to simulate transaction',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Simulate multiple transactions in a billing cycle
   */
  static async simulateBillingCycleTransactions(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;
      const { transactions } = req.body;

      if (!Array.isArray(transactions) || transactions.length === 0) {
        res.status(400).json({
          success: false,
          message: 'Transactions array is required and must not be empty',
        });
        return;
      }

      // Validate each transaction
      for (const [index, transaction] of transactions.entries()) {
        if (!transaction.amount || !transaction.type) {
          res.status(400).json({
            success: false,
            message: `Transaction at index ${index} is missing required fields (amount, type)`,
          });
          return;
        }

        if (!Object.values(TransactionType).includes(transaction.type)) {
          res.status(400).json({
            success: false,
            message: `Invalid transaction type at index ${index}: ${transaction.type}`,
            validTypes: Object.values(TransactionType),
          });
          return;
        }
      }

      const result = await TransactionService.simulateBillingCycleTransactions(
        cardId,
        transactions
      );

      res.status(201).json({
        success: true,
        message: 'Billing cycle transactions simulated successfully',
        data: result,
      });
    } catch (error) {
      console.error('Error simulating billing cycle transactions:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to simulate billing cycle transactions',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get transaction history for a credit card
   */
  static async getTransactionHistory(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;
      const { limit = 50, offset = 0, type } = req.query;

      let whereClause: any = { creditCardId: cardId };
      
      if (type && Object.values(TransactionType).includes(type as TransactionType)) {
        whereClause.type = type;
      }

      const transactions = await prisma.transaction.findMany({
        where: whereClause,
        orderBy: { date: 'desc' },
        take: Number(limit),
        skip: Number(offset),
      });

      const total = await prisma.transaction.count({
        where: whereClause,
      });

      res.status(200).json({
        success: true,
        data: {
          transactions,
          pagination: {
            total,
            limit: Number(limit),
            offset: Number(offset),
            hasMore: Number(offset) + transactions.length < total,
          },
        },
      });
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch transaction history',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get transaction analytics for a credit card
   */
  static async getTransactionAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;
      const { startDate, endDate } = req.query;

      let dateFilter: any = {};
      if (startDate || endDate) {
        dateFilter.date = {};
        if (startDate) dateFilter.date.gte = new Date(startDate as string);
        if (endDate) dateFilter.date.lte = new Date(endDate as string);
      }

      const transactions = await prisma.transaction.findMany({
        where: {
          creditCardId: cardId,
          ...dateFilter,
        },
        orderBy: { date: 'desc' },
      });

      // Calculate analytics
      const analytics = this.calculateTransactionAnalytics(transactions);

      res.status(200).json({
        success: true,
        data: analytics,
      });
    } catch (error) {
      console.error('Error calculating transaction analytics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to calculate transaction analytics',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get transaction impact simulation
   */
  static async getTransactionImpact(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;
      const { amount, type, isInternational } = req.query;

      if (!amount || !type) {
        res.status(400).json({
          success: false,
          message: 'Amount and transaction type are required',
        });
        return;
      }

      const creditCard = await prisma.creditCard.findUnique({
        where: { id: cardId },
      });

      if (!creditCard) {
        res.status(404).json({
          success: false,
          message: 'Credit card not found',
        });
        return;
      }

      // Calculate fees without actually creating the transaction
      let fees = 0;
      const transactionAmount = Number(amount);

      switch (type as TransactionType) {
        case TransactionType.CASH_ADVANCE:
          fees = Math.max(transactionAmount * (creditCard.cashAdvanceFee / 100), 10);
          break;
        case TransactionType.PURCHASE:
          if (isInternational === 'true') {
            fees = transactionAmount * (creditCard.foreignTransFee / 100);
          }
          break;
        case TransactionType.BALANCE_TRANSFER:
          const btFee = transactionAmount * ((creditCard.balanceTransferFee || 0) / 100);
          fees = Math.min(Math.max(btFee, 5), 200);
          break;
      }

      const totalCharged = type === TransactionType.PAYMENT || type === TransactionType.REFUND
        ? -Math.abs(transactionAmount)
        : transactionAmount + fees;

      const newBalance = Math.max(0, creditCard.currentBalance + totalCharged);
      const newUtilization = (newBalance / creditCard.creditLimit) * 100;
      const oldUtilization = (creditCard.currentBalance / creditCard.creditLimit) * 100;

      // Calculate interest impact
      const dailyRate = creditCard.apr / 365 / 100;
      const interestImpact = totalCharged > 0 ? totalCharged * dailyRate * 30 : 0;

      res.status(200).json({
        success: true,
        data: {
          originalAmount: transactionAmount,
          fees: Math.round(fees * 100) / 100,
          totalCharged: Math.round(totalCharged * 100) / 100,
          currentBalance: creditCard.currentBalance,
          newBalance: Math.round(newBalance * 100) / 100,
          balanceChange: Math.round((newBalance - creditCard.currentBalance) * 100) / 100,
          currentUtilization: Math.round(oldUtilization * 100) / 100,
          newUtilization: Math.round(newUtilization * 100) / 100,
          utilizationChange: Math.round((newUtilization - oldUtilization) * 100) / 100,
          monthlyInterestImpact: Math.round(interestImpact * 100) / 100,
          annualInterestImpact: Math.round(interestImpact * 12 * 100) / 100,
        },
      });
    } catch (error) {
      console.error('Error calculating transaction impact:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to calculate transaction impact',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Calculate transaction analytics
   */
  private static calculateTransactionAnalytics(transactions: any[]) {
    const analytics = {
      summary: {
        totalTransactions: transactions.length,
        totalAmount: 0,
        totalFees: 0,
        averageTransaction: 0,
        dateRange: {
          start: transactions.length > 0 ? transactions[transactions.length - 1].date : null,
          end: transactions.length > 0 ? transactions[0].date : null,
        },
      },
      byType: {} as Record<string, any>,
      byMonth: {} as Record<string, any>,
      trends: {
        spendingTrend: 'stable' as 'increasing' | 'decreasing' | 'stable',
        averageMonthlySpend: 0,
        highestTransaction: 0,
        lowestTransaction: 0,
      },
    };

    if (transactions.length === 0) {
      return analytics;
    }

    // Calculate summary
    let totalAmount = 0;
    let totalFees = 0;
    let highestTransaction = 0;
    let lowestTransaction = Infinity;

    transactions.forEach((transaction) => {
      totalAmount += transaction.amount;
      totalFees += transaction.fees || 0;
      
      if (transaction.amount > highestTransaction) {
        highestTransaction = transaction.amount;
      }
      if (transaction.amount < lowestTransaction) {
        lowestTransaction = transaction.amount;
      }

      // Group by type
      if (!analytics.byType[transaction.type]) {
        analytics.byType[transaction.type] = {
          count: 0,
          totalAmount: 0,
          averageAmount: 0,
          totalFees: 0,
        };
      }
      analytics.byType[transaction.type].count++;
      analytics.byType[transaction.type].totalAmount += transaction.amount;
      analytics.byType[transaction.type].totalFees += transaction.fees || 0;

      // Group by month
      const monthKey = transaction.date.toISOString().substring(0, 7); // YYYY-MM
      if (!analytics.byMonth[monthKey]) {
        analytics.byMonth[monthKey] = {
          count: 0,
          totalAmount: 0,
          totalFees: 0,
        };
      }
      analytics.byMonth[monthKey].count++;
      analytics.byMonth[monthKey].totalAmount += transaction.amount;
      analytics.byMonth[monthKey].totalFees += transaction.fees || 0;
    });

    // Calculate averages for transaction types
    Object.keys(analytics.byType).forEach((type) => {
      analytics.byType[type].averageAmount = 
        analytics.byType[type].totalAmount / analytics.byType[type].count;
    });

    // Update summary
    analytics.summary.totalAmount = Math.round(totalAmount * 100) / 100;
    analytics.summary.totalFees = Math.round(totalFees * 100) / 100;
    analytics.summary.averageTransaction = Math.round((totalAmount / transactions.length) * 100) / 100;
    analytics.trends.highestTransaction = highestTransaction;
    analytics.trends.lowestTransaction = lowestTransaction === Infinity ? 0 : lowestTransaction;

    // Calculate monthly average
    const monthCount = Object.keys(analytics.byMonth).length;
    analytics.trends.averageMonthlySpend = monthCount > 0 
      ? Math.round((totalAmount / monthCount) * 100) / 100
      : 0;

    return analytics;
  }
}

export default TransactionController;
