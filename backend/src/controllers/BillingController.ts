import { Request, Response } from 'express';
import BillingService from '../services/BillingService';
import prisma from '../lib/prisma';

export class BillingController {
  /**
   * Generate a new billing cycle for a credit card
   */
  static async generateBillingCycle(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;

      if (!cardId) {
        res.status(400).json({
          success: false,
          message: 'Credit card ID is required',
        });
        return;
      }

      const billingCycle = await BillingService.generateBillingCycle(cardId);

      res.status(201).json({
        success: true,
        message: 'Billing cycle generated successfully',
        data: billingCycle,
      });
    } catch (error) {
      console.error('Error generating billing cycle:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to generate billing cycle',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get billing cycles for a credit card
   */
  static async getBillingCycles(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;
      const { limit = 12, offset = 0 } = req.query;

      const billingCycles = await prisma.billingCycle.findMany({
        where: { creditCardId: cardId },
        orderBy: { cycleNumber: 'desc' },
        take: Number(limit),
        skip: Number(offset),
        include: {
          statement: true,
        },
      });

      res.status(200).json({
        success: true,
        data: billingCycles,
      });
    } catch (error) {
      console.error('Error fetching billing cycles:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch billing cycles',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get a specific billing cycle
   */
  static async getBillingCycle(req: Request, res: Response): Promise<void> {
    try {
      const { cycleId } = req.params;

      const billingCycle = await prisma.billingCycle.findUnique({
        where: { id: cycleId },
        include: {
          creditCard: true,
          statement: true,
        },
      });

      if (!billingCycle) {
        res.status(404).json({
          success: false,
          message: 'Billing cycle not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: billingCycle,
      });
    } catch (error) {
      console.error('Error fetching billing cycle:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch billing cycle',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Generate statement for a billing cycle
   */
  static async generateStatement(req: Request, res: Response): Promise<void> {
    try {
      const { cycleId } = req.params;

      const statement = await BillingService.generateStatement(cycleId);

      res.status(201).json({
        success: true,
        message: 'Statement generated successfully',
        data: statement,
      });
    } catch (error) {
      console.error('Error generating statement:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to generate statement',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Calculate interest for current balance
   */
  static async calculateInterest(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;

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

      const dailyRate = BillingService.calculateDailyInterestRate(creditCard.apr);
      const monthlyInterest = BillingService.calculateInterestCharge(
        creditCard.currentBalance,
        creditCard.apr,
        30 // Assume 30-day cycle
      );

      res.status(200).json({
        success: true,
        data: {
          currentBalance: creditCard.currentBalance,
          apr: creditCard.apr,
          dailyInterestRate: dailyRate,
          monthlyInterest: monthlyInterest,
          dailyInterest: creditCard.currentBalance * dailyRate,
        },
      });
    } catch (error) {
      console.error('Error calculating interest:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to calculate interest',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Calculate fees for a credit card
   */
  static async calculateFees(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;

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

      const lateFee = BillingService.calculateLateFee(
        creditCard.currentBalance,
        creditCard.lateFeePct,
        creditCard.lateFeeFlat
      );

      const overlimitFee = BillingService.calculateOverlimitFee(
        creditCard.currentBalance,
        creditCard.creditLimit,
        creditCard.overlimitFeePct,
        creditCard.overlimitFeeFlat
      );

      res.status(200).json({
        success: true,
        data: {
          currentBalance: creditCard.currentBalance,
          creditLimit: creditCard.creditLimit,
          lateFee: lateFee,
          overlimitFee: overlimitFee,
          annualFee: creditCard.annualFee,
          foreignTransactionFeeRate: creditCard.foreignTransFee,
          cashAdvanceFeeRate: creditCard.cashAdvanceFee,
        },
      });
    } catch (error) {
      console.error('Error calculating fees:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to calculate fees',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Calculate minimum payment
   */
  static async calculateMinimumPayment(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;

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

      // Get current interest and fees
      const dailyRate = BillingService.calculateDailyInterestRate(creditCard.apr);
      const monthlyInterest = creditCard.currentBalance * dailyRate * 30;
      
      const lateFee = BillingService.calculateLateFee(
        creditCard.currentBalance,
        creditCard.lateFeePct,
        creditCard.lateFeeFlat
      );

      const totalFees = lateFee;
      const minimumPayment = BillingService.calculateMinimumPayment(
        creditCard.currentBalance,
        monthlyInterest + totalFees
      );

      res.status(200).json({
        success: true,
        data: {
          currentBalance: creditCard.currentBalance,
          minimumPayment: minimumPayment,
          interestCharge: monthlyInterest,
          fees: totalFees,
          breakdown: {
            principalPortion: minimumPayment - monthlyInterest - totalFees,
            interestPortion: monthlyInterest,
            feesPortion: totalFees,
          },
        },
      });
    } catch (error) {
      console.error('Error calculating minimum payment:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to calculate minimum payment',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Calculate payoff scenarios
   */
  static async calculatePayoffScenarios(req: Request, res: Response): Promise<void> {
    try {
      const { cardId } = req.params;
      const { paymentAmount } = req.query;

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

      const balance = creditCard.currentBalance;
      const monthlyRate = creditCard.apr / 12 / 100;
      
      // Calculate payoff scenarios
      const scenarios = [];

      // Minimum payment scenario
      const minPayment = BillingService.calculateMinimumPayment(balance, 0);
      scenarios.push({
        paymentType: 'Minimum Payment',
        monthlyPayment: minPayment,
        ...this.calculatePayoffTime(balance, minPayment, monthlyRate),
      });

      // Custom payment scenario
      if (paymentAmount && Number(paymentAmount) > minPayment) {
        scenarios.push({
          paymentType: 'Custom Payment',
          monthlyPayment: Number(paymentAmount),
          ...this.calculatePayoffTime(balance, Number(paymentAmount), monthlyRate),
        });
      }

      // Aggressive payoff scenarios
      const aggressivePayments = [
        balance * 0.05, // 5% of balance
        balance * 0.10, // 10% of balance
        balance * 0.15, // 15% of balance
      ];

      aggressivePayments.forEach((payment, index) => {
        if (payment > minPayment) {
          scenarios.push({
            paymentType: `${(index + 1) * 5}% of Balance`,
            monthlyPayment: payment,
            ...this.calculatePayoffTime(balance, payment, monthlyRate),
          });
        }
      });

      res.status(200).json({
        success: true,
        data: {
          currentBalance: balance,
          apr: creditCard.apr,
          scenarios: scenarios,
        },
      });
    } catch (error) {
      console.error('Error calculating payoff scenarios:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to calculate payoff scenarios',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Helper method to calculate payoff time
   */
  private static calculatePayoffTime(balance: number, payment: number, monthlyRate: number) {
    if (payment <= balance * monthlyRate) {
      return {
        months: Infinity,
        totalInterest: Infinity,
        totalPaid: Infinity,
        warning: 'Payment is too low to cover interest - balance will grow',
      };
    }

    let currentBalance = balance;
    let months = 0;
    let totalInterest = 0;

    while (currentBalance > 0.01 && months < 600) { // Cap at 50 years
      const interestCharge = currentBalance * monthlyRate;
      const principalPayment = Math.min(payment - interestCharge, currentBalance);
      
      currentBalance -= principalPayment;
      totalInterest += interestCharge;
      months++;
    }

    return {
      months: months,
      years: Math.round((months / 12) * 10) / 10,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPaid: Math.round((balance + totalInterest) * 100) / 100,
    };
  }
}

export default BillingController;
