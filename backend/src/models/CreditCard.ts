import { CreditCard, Transaction, Payment } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { addDays, addMonths } from 'date-fns';

export type CreditCardWithTransactions = CreditCard & {
  transactions?: Transaction[];
  payments?: Payment[];
};

export interface CreateCreditCardData {
  userId: string;
  cardholderName: string;
  creditLimit: number;
  apr?: number;
  cycleStartDate?: number;
}

export interface UpdateCreditCardData {
  creditLimit?: number;
  apr?: number;
  status?: 'ACTIVE' | 'FROZEN' | 'CLOSED' | 'EXPIRED';
  cycleStartDate?: number;
}

export class CreditCardService {
  /**
   * Generate a random credit card number (for simulation purposes only)
   */
  static generateCardNumber(): string {
    // Generate a 16-digit card number starting with 4532 (Visa-like)
    const prefix = '4532';
    let cardNumber = prefix;
    
    for (let i = 0; i < 12; i++) {
      cardNumber += Math.floor(Math.random() * 10);
    }
    
    return cardNumber;
  }

  /**
   * Generate CVV code
   */
  static generateCVV(): string {
    return Math.floor(100 + Math.random() * 900).toString();
  }

  /**
   * Calculate available credit
   */
  static calculateAvailableCredit(creditLimit: number, currentBalance: number): number {
    return Math.max(0, creditLimit - currentBalance);
  }

  /**
   * Create a new credit card
   */
  static async createCreditCard(cardData: CreateCreditCardData): Promise<CreditCard> {
    const cardNumber = this.generateCardNumber();
    const cvv = this.generateCVV();
    const currentYear = new Date().getFullYear();
    
    return prisma.creditCard.create({
      data: {
        ...cardData,
        cardNumber,
        cvv,
        expiryMonth: 12,
        expiryYear: currentYear + 5, // 5 years from now
        currentBalance: 0,
        availableCredit: cardData.creditLimit,
        apr: cardData.apr || 24.99,
        cycleStartDate: cardData.cycleStartDate || 1,
        status: 'ACTIVE',
      },
    });
  }

  /**
   * Find credit card by ID
   */
  static async findCreditCardById(id: string): Promise<CreditCardWithTransactions | null> {
    return prisma.creditCard.findUnique({
      where: { id },
      include: {
        transactions: {
          orderBy: { timestamp: 'desc' },
          take: 50, // Limit to recent 50 transactions
        },
        payments: {
          orderBy: { paymentDate: 'desc' },
          take: 20, // Limit to recent 20 payments
        },
      },
    });
  }

  /**
   * Find credit cards by user ID
   */
  static async findCreditCardsByUserId(userId: string): Promise<CreditCard[]> {
    return prisma.creditCard.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Update credit card
   */
  static async updateCreditCard(id: string, data: UpdateCreditCardData): Promise<CreditCard> {
    const updateData: any = { ...data };
    
    // If credit limit is being updated, recalculate available credit
    if (data.creditLimit !== undefined) {
      const currentCard = await prisma.creditCard.findUnique({
        where: { id },
        select: { currentBalance: true },
      });
      
      if (currentCard) {
        updateData.availableCredit = this.calculateAvailableCredit(
          data.creditLimit,
          currentCard.currentBalance
        );
      }
    }
    
    return prisma.creditCard.update({
      where: { id },
      data: updateData,
    });
  }

  /**
   * Update card balance after transaction
   */
  static async updateCardBalance(cardId: string, amount: number, isCredit: boolean = false): Promise<CreditCard> {
    const card = await prisma.creditCard.findUnique({
      where: { id: cardId },
      select: { currentBalance: true, creditLimit: true },
    });

    if (!card) {
      throw new Error('Credit card not found');
    }

    const newBalance = isCredit 
      ? Math.max(0, card.currentBalance - amount)
      : card.currentBalance + amount;

    const availableCredit = this.calculateAvailableCredit(card.creditLimit, newBalance);

    return prisma.creditCard.update({
      where: { id: cardId },
      data: {
        currentBalance: newBalance,
        availableCredit,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Check if transaction amount is within credit limit
   */
  static async isTransactionAllowed(cardId: string, amount: number): Promise<boolean> {
    const card = await prisma.creditCard.findUnique({
      where: { id: cardId },
      select: { availableCredit: true, status: true },
    });

    if (!card || card.status !== 'ACTIVE') {
      return false;
    }

    return card.availableCredit >= amount;
  }

  /**
   * Calculate minimum payment (typically 2% of balance or $25, whichever is higher)
   */
  static calculateMinimumPayment(balance: number): number {
    const percentagePayment = balance * 0.02; // 2%
    const minimumFloor = 25; // $25 minimum
    
    if (balance <= 0) return 0;
    if (balance <= minimumFloor) return balance;
    
    return Math.max(percentagePayment, minimumFloor);
  }

  /**
   * Calculate next billing cycle dates
   */
  static calculateBillingCycleDates(cycleStartDate: number): {
    periodStart: Date;
    periodEnd: Date;
    dueDate: Date;
  } {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Start of current billing period
    let periodStart = new Date(currentYear, currentMonth, cycleStartDate);
    
    // If we're past the cycle start date, move to next month
    if (today.getDate() >= cycleStartDate) {
      periodStart = addMonths(periodStart, 1);
    }
    
    // End of billing period (day before next cycle starts)
    const periodEnd = addDays(addMonths(periodStart, 1), -1);
    
    // Due date (typically 21 days after period end)
    const dueDate = addDays(periodEnd, 21);
    
    return {
      periodStart,
      periodEnd,
      dueDate,
    };
  }

  /**
   * Freeze a credit card
   */
  static async freezeCard(cardId: string): Promise<CreditCard> {
    return prisma.creditCard.update({
      where: { id: cardId },
      data: { status: 'FROZEN' },
    });
  }

  /**
   * Unfreeze a credit card
   */
  static async unfreezeCard(cardId: string): Promise<CreditCard> {
    return prisma.creditCard.update({
      where: { id: cardId },
      data: { status: 'ACTIVE' },
    });
  }

  /**
   * Close a credit card
   */
  static async closeCard(cardId: string): Promise<CreditCard> {
    return prisma.creditCard.update({
      where: { id: cardId },
      data: { status: 'CLOSED' },
    });
  }

  /**
   * Get card utilization percentage
   */
  static calculateUtilization(currentBalance: number, creditLimit: number): number {
    if (creditLimit === 0) return 0;
    return Math.round((currentBalance / creditLimit) * 100);
  }
}
