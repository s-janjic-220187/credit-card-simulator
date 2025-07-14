import prisma from '../lib/prisma';

export class BillingService {
  /**
   * Calculate daily interest rate from APR
   */
  static calculateDailyInterestRate(apr: number): number {
    return apr / 365 / 100;
  }

  /**
   * Calculate interest charge for a billing cycle
   */
  static calculateInterestCharge(
    averageDailyBalance: number,
    apr: number,
    daysInCycle: number
  ): number {
    const dailyRate = this.calculateDailyInterestRate(apr);
    return averageDailyBalance * dailyRate * daysInCycle;
  }

  /**
   * Calculate minimum payment (typically 2-3% of balance or $35, whichever is higher)
   */
  static calculateMinimumPayment(
    balance: number,
    interestAndFees: number,
    minPercentage: number = 0.02
  ): number {
    const percentageAmount = balance * minPercentage;
    const minimumAmount = 35; // Standard minimum
    const totalOfInterestAndFees = interestAndFees;
    
    return Math.max(percentageAmount, minimumAmount, totalOfInterestAndFees);
  }

  /**
   * Calculate late fee
   */
  static calculateLateFee(
    balance: number,
    lateFeePct: number,
    lateFeeFlat: number,
    maxLateFee: number = 40
  ): number {
    const percentageFee = balance * (lateFeePct / 100);
    const fee = Math.max(percentageFee, lateFeeFlat);
    return Math.min(fee, maxLateFee);
  }

  /**
   * Calculate overlimit fee
   */
  static calculateOverlimitFee(
    balance: number,
    creditLimit: number,
    overlimitFeePct: number,
    overlimitFeeFlat: number
  ): number {
    if (balance <= creditLimit) return 0;
    
    const overlimitAmount = balance - creditLimit;
    const percentageFee = overlimitAmount * (overlimitFeePct / 100);
    return Math.max(percentageFee, overlimitFeeFlat);
  }

  /**
   * Calculate foreign transaction fee
   */
  static calculateForeignTransactionFee(
    transactionAmount: number,
    foreignTransFeePct: number
  ): number {
    return transactionAmount * (foreignTransFeePct / 100);
  }

  /**
   * Calculate average daily balance for a billing cycle
   */
  static async calculateAverageDailyBalance(
    creditCardId: string,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    const transactions = await prisma.transaction.findMany({
      where: {
        creditCardId,
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    const creditCard = await prisma.creditCard.findUnique({
      where: { id: creditCardId },
    });

    if (!creditCard) throw new Error('Credit card not found');

    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    let runningBalance = creditCard.currentBalance;
    let dailyBalanceSum = 0;
    let currentDate = new Date(startDate);

    for (let day = 0; day < totalDays; day++) {
      // Apply any transactions for this day
      const dayTransactions = transactions.filter((t: any) => 
        t.timestamp.toDateString() === currentDate.toDateString()
      );

      dayTransactions.forEach((transaction: any) => {
        if (transaction.type === 'PURCHASE' || transaction.type === 'INTEREST_CHARGE') {
          runningBalance += transaction.amount;
        } else if (transaction.type === 'PAYMENT' || transaction.type === 'CREDIT') {
          runningBalance -= transaction.amount;
        }
      });

      dailyBalanceSum += runningBalance;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dailyBalanceSum / totalDays;
  }

  /**
   * Generate a new billing cycle
   */
  static async generateBillingCycle(creditCardId: string): Promise<any> {
    const creditCard = await prisma.creditCard.findUnique({
      where: { id: creditCardId },
      include: {
        billingCycles: {
          orderBy: { cycleNumber: 'desc' },
          take: 1,
        },
      },
    });

    if (!creditCard) throw new Error('Credit card not found');

    const lastCycle = creditCard.billingCycles[0];
    const cycleNumber = lastCycle ? lastCycle.cycleNumber + 1 : 1;

    // Calculate cycle dates
    const startDate = lastCycle ? 
      new Date(lastCycle.endDate.getTime() + 24 * 60 * 60 * 1000) : // Day after last cycle
      new Date(); // First cycle starts today

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + creditCard.billingCycleLength);

    const dueDate = new Date(endDate);
    dueDate.setDate(endDate.getDate() + creditCard.gracePerod);

    // Calculate average daily balance
    const averageDailyBalance = await this.calculateAverageDailyBalance(
      creditCardId,
      startDate,
      endDate
    );

    // Calculate interest charge
    const interestCharged = this.calculateInterestCharge(
      averageDailyBalance,
      creditCard.apr,
      creditCard.billingCycleLength
    );

    // Calculate fees (late fees, overlimit fees, etc.)
    let feesCharged = 0;
    
    // Check if previous cycle was paid late
    if (lastCycle && !lastCycle.isPaid && new Date() > lastCycle.dueDate) {
      feesCharged += this.calculateLateFee(
        lastCycle.endingBalance,
        creditCard.lateFeePct,
        creditCard.lateFeeFlat
      );
    }

    // Check for overlimit
    if (creditCard.currentBalance > creditCard.creditLimit) {
      feesCharged += this.calculateOverlimitFee(
        creditCard.currentBalance,
        creditCard.creditLimit,
        creditCard.overlimitFeePct,
        creditCard.overlimitFeeFlat
      );
    }

    // Calculate totals
    const totalPurchases = await this.calculatePurchasesInPeriod(creditCardId, startDate, endDate);
    const totalPayments = await this.calculatePaymentsInPeriod(creditCardId, startDate, endDate);
    
    const startingBalance = lastCycle ? lastCycle.endingBalance : 0;
    const endingBalance = startingBalance + totalPurchases - totalPayments + interestCharged + feesCharged;
    
    const minimumPayment = this.calculateMinimumPayment(
      endingBalance,
      interestCharged + feesCharged
    );

    // Create billing cycle
    const billingCycle = await prisma.billingCycle.create({
      data: {
        creditCardId,
        cycleNumber,
        startDate,
        endDate,
        dueDate,
        startingBalance,
        endingBalance,
        averageDailyBalance,
        totalPurchases,
        totalPayments,
        interestCharged,
        feesCharged,
        minimumPayment,
      },
    });

    // Update credit card balance
    await prisma.creditCard.update({
      where: { id: creditCardId },
      data: {
        currentBalance: endingBalance,
        availableCredit: creditCard.creditLimit - endingBalance,
        minimumPayment,
        nextDueDate: dueDate,
      },
    });

    return billingCycle;
  }

  /**
   * Calculate total purchases in a period
   */
  private static async calculatePurchasesInPeriod(
    creditCardId: string,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    const result = await prisma.transaction.aggregate({
      where: {
        creditCardId,
        type: 'PURCHASE',
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum?.amount || 0;
  }

  /**
   * Calculate total payments in a period
   */
  private static async calculatePaymentsInPeriod(
    creditCardId: string,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    const result = await prisma.transaction.aggregate({
      where: {
        creditCardId,
        type: 'PAYMENT',
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum?.amount || 0;
  }

  /**
   * Generate statement for a billing cycle
   */
  static async generateStatement(billingCycleId: string): Promise<any> {
    const billingCycle = await prisma.billingCycle.findUnique({
      where: { id: billingCycleId },
      include: {
        creditCard: true,
      },
    });

    if (!billingCycle) throw new Error('Billing cycle not found');

    const statement = await prisma.statement.create({
      data: {
        creditCardId: billingCycle.creditCardId,
        billingCycleId: billingCycleId,
        statementNumber: `STMT-${billingCycle.cycleNumber.toString().padStart(6, '0')}`,
        billingPeriodStart: billingCycle.startDate,
        billingPeriodEnd: billingCycle.endDate,
        dueDate: billingCycle.dueDate,
        minimumPayment: billingCycle.minimumPayment,
        totalBalance: billingCycle.endingBalance,
        previousBalance: billingCycle.startingBalance,
        paymentsCredits: billingCycle.totalPayments,
        purchasesDebits: billingCycle.totalPurchases,
        interestCharges: billingCycle.interestCharged,
        feesCharges: billingCycle.feesCharged,
        creditLimit: billingCycle.creditCard.creditLimit,
        availableCredit: billingCycle.creditCard.availableCredit,
        apr: billingCycle.creditCard.apr,
        dailyInterestRate: this.calculateDailyInterestRate(billingCycle.creditCard.apr),
        averageDailyBalance: billingCycle.averageDailyBalance,
        daysInBillingCycle: billingCycle.creditCard.billingCycleLength,
      },
    });

    // Mark billing cycle as having statement generated
    await prisma.billingCycle.update({
      where: { id: billingCycleId },
      data: { isStatementGenerated: true },
    });

    return statement;
  }
}

export default BillingService;
