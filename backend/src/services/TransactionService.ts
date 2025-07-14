import prisma from '../lib/prisma';

export interface TransactionRequest {
  creditCardId: string;
  amount: number;
  type: TransactionType;
  description?: string;
  merchantCategory?: string;
  isInternational?: boolean;
  cashAdvanceLocation?: string;
}

export enum TransactionType {
  PURCHASE = 'PURCHASE',
  CASH_ADVANCE = 'CASH_ADVANCE',
  BALANCE_TRANSFER = 'BALANCE_TRANSFER',
  PAYMENT = 'PAYMENT',
  FEE = 'FEE',
  INTEREST = 'INTEREST',
  REFUND = 'REFUND'
}

export interface TransactionResult {
  transactionId: string;
  originalAmount: number;
  fees: number;
  totalCharged: number;
  newBalance: number;
  creditUtilization: number;
  impactAnalysis: {
    principalAdded: number;
    feesAdded: number;
    interestImpact: number;
    creditScoreImpact: number;
  };
}

class TransactionService {
  /**
   * Simulate a credit card transaction
   */
  static async simulateTransaction(transaction: TransactionRequest): Promise<TransactionResult> {
    const creditCard = await prisma.creditCard.findUnique({
      where: { id: transaction.creditCardId },
    });

    if (!creditCard) {
      throw new Error('Credit card not found');
    }

    let fees = 0;
    let totalCharged = transaction.amount;
    let principalAdded = transaction.amount;

    // Calculate fees based on transaction type
    switch (transaction.type) {
      case TransactionType.CASH_ADVANCE:
        fees = this.calculateCashAdvanceFee(transaction.amount, creditCard.cashAdvanceFee);
        totalCharged = transaction.amount + fees;
        break;

      case TransactionType.PURCHASE:
        if (transaction.isInternational) {
          fees = this.calculateForeignTransactionFee(transaction.amount, creditCard.foreignTransFee);
          totalCharged = transaction.amount + fees;
        }
        break;

      case TransactionType.BALANCE_TRANSFER:
        fees = this.calculateBalanceTransferFee(transaction.amount, creditCard.balanceTransferFee || 0);
        totalCharged = transaction.amount + fees;
        break;

      case TransactionType.PAYMENT:
        totalCharged = -Math.abs(transaction.amount); // Payments reduce balance
        principalAdded = -Math.abs(transaction.amount);
        break;

      case TransactionType.REFUND:
        totalCharged = -Math.abs(transaction.amount); // Refunds reduce balance
        principalAdded = -Math.abs(transaction.amount);
        break;
    }

    // Calculate new balance
    const newBalance = creditCard.currentBalance + totalCharged;
    
    // Ensure balance doesn't go below 0 for payments/refunds
    const finalBalance = Math.max(0, newBalance);

    // Calculate credit utilization
    const creditUtilization = (finalBalance / creditCard.creditLimit) * 100;

    // Calculate impact analysis
    const interestImpact = this.calculateInterestImpact(totalCharged, creditCard.apr);
    const creditScoreImpact = this.calculateCreditScoreImpact(
      creditCard.currentBalance,
      finalBalance,
      creditCard.creditLimit
    );

    // Create transaction record
    const transactionRecord = await prisma.transaction.create({
      data: {
        creditCardId: transaction.creditCardId,
        amount: transaction.amount,
        fees: fees,
        totalAmount: totalCharged,
        type: transaction.type,
        description: transaction.description || this.getDefaultDescription(transaction.type),
        merchantCategory: transaction.merchantCategory,
        isInternational: transaction.isInternational || false,
        date: new Date(),
        status: 'COMPLETED',
      },
    });

    // Update credit card balance
    await prisma.creditCard.update({
      where: { id: transaction.creditCardId },
      data: {
        currentBalance: finalBalance,
        lastTransactionDate: new Date(),
      },
    });

    return {
      transactionId: transactionRecord.id,
      originalAmount: transaction.amount,
      fees: fees,
      totalCharged: totalCharged,
      newBalance: finalBalance,
      creditUtilization: Math.round(creditUtilization * 100) / 100,
      impactAnalysis: {
        principalAdded: principalAdded,
        feesAdded: fees,
        interestImpact: Math.round(interestImpact * 100) / 100,
        creditScoreImpact: Math.round(creditScoreImpact),
      },
    };
  }

  /**
   * Get transaction history for a credit card
   */
  static async getTransactionHistory(
    creditCardId: string,
    limit: number = 50,
    offset: number = 0
  ) {
    return await prisma.transaction.findMany({
      where: { creditCardId },
      orderBy: { date: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  /**
   * Simulate multiple transactions in a billing cycle
   */
  static async simulateBillingCycleTransactions(
    creditCardId: string,
    transactions: Omit<TransactionRequest, 'creditCardId'>[]
  ) {
    const results = [];
    
    for (const transaction of transactions) {
      const result = await this.simulateTransaction({
        ...transaction,
        creditCardId,
      });
      results.push(result);
    }

    return {
      transactions: results,
      summary: this.generateTransactionSummary(results),
    };
  }

  /**
   * Calculate cash advance fee
   */
  private static calculateCashAdvanceFee(amount: number, feeRate: number): number {
    const percentageFee = amount * (feeRate / 100);
    const minimumFee = 10; // $10 minimum fee
    return Math.max(percentageFee, minimumFee);
  }

  /**
   * Calculate foreign transaction fee
   */
  private static calculateForeignTransactionFee(amount: number, feeRate: number): number {
    return amount * (feeRate / 100);
  }

  /**
   * Calculate balance transfer fee
   */
  private static calculateBalanceTransferFee(amount: number, feeRate: number): number {
    const percentageFee = amount * (feeRate / 100);
    const minimumFee = 5; // $5 minimum fee
    const maximumFee = 200; // $200 maximum fee
    return Math.min(Math.max(percentageFee, minimumFee), maximumFee);
  }

  /**
   * Calculate interest impact of a transaction
   */
  private static calculateInterestImpact(amount: number, apr: number): number {
    if (amount <= 0) return 0; // No interest impact for payments/refunds
    
    const dailyRate = apr / 365 / 100;
    const averageDaysInCycle = 30;
    return amount * dailyRate * averageDaysInCycle;
  }

  /**
   * Calculate credit score impact
   */
  private static calculateCreditScoreImpact(
    oldBalance: number,
    newBalance: number,
    creditLimit: number
  ): number {
    const oldUtilization = (oldBalance / creditLimit) * 100;
    const newUtilization = (newBalance / creditLimit) * 100;
    
    // Simplified credit score impact calculation
    // Higher utilization generally decreases score
    if (newUtilization > oldUtilization) {
      // Increased utilization - negative impact
      if (newUtilization > 90) return -15;
      if (newUtilization > 70) return -10;
      if (newUtilization > 50) return -5;
      if (newUtilization > 30) return -3;
      return -1;
    } else if (newUtilization < oldUtilization) {
      // Decreased utilization - positive impact
      if (oldUtilization > 90 && newUtilization < 30) return 15;
      if (oldUtilization > 70 && newUtilization < 30) return 10;
      if (oldUtilization > 50 && newUtilization < 30) return 5;
      return 3;
    }
    
    return 0; // No change
  }

  /**
   * Get default description for transaction type
   */
  private static getDefaultDescription(type: TransactionType): string {
    switch (type) {
      case TransactionType.PURCHASE:
        return 'Purchase Transaction';
      case TransactionType.CASH_ADVANCE:
        return 'Cash Advance';
      case TransactionType.BALANCE_TRANSFER:
        return 'Balance Transfer';
      case TransactionType.PAYMENT:
        return 'Payment';
      case TransactionType.FEE:
        return 'Fee Charge';
      case TransactionType.INTEREST:
        return 'Interest Charge';
      case TransactionType.REFUND:
        return 'Refund';
      default:
        return 'Transaction';
    }
  }

  /**
   * Generate summary of multiple transactions
   */
  private static generateTransactionSummary(results: TransactionResult[]) {
    return {
      totalTransactions: results.length,
      totalAmount: results.reduce((sum, r) => sum + r.originalAmount, 0),
      totalFees: results.reduce((sum, r) => sum + r.fees, 0),
      totalCharged: results.reduce((sum, r) => sum + r.totalCharged, 0),
      averageTransaction: results.length > 0 
        ? results.reduce((sum, r) => sum + r.originalAmount, 0) / results.length 
        : 0,
      finalBalance: results.length > 0 ? results[results.length - 1].newBalance : 0,
      finalUtilization: results.length > 0 ? results[results.length - 1].creditUtilization : 0,
      totalInterestImpact: results.reduce((sum, r) => sum + r.impactAnalysis.interestImpact, 0),
    };
  }
}

export default TransactionService;
