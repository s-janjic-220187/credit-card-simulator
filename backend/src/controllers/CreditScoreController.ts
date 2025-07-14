import { Request, Response } from 'express';
import CreditScoreCalculatorService from '../services/CreditScoreCalculatorService';

export class CreditScoreController {
  /**
   * Get credit score analysis for a user
   */
  static async getCreditScoreAnalysis(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({
          success: false,
          message: 'User ID is required',
        });
        return;
      }

      const analysis = await CreditScoreCalculatorService.calculateCreditScore(userId);

      res.status(200).json({
        success: true,
        data: analysis,
      });
    } catch (error) {
      console.error('Error calculating credit score:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to calculate credit score',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Simulate the impact of an action on credit score
   */
  static async simulateActionImpact(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { action, parameters } = req.body;

      if (!userId || !action) {
        res.status(400).json({
          success: false,
          message: 'User ID and action are required',
        });
        return;
      }

      const validActions = ['make_payment', 'change_utilization', 'open_new_account', 'close_account'];
      if (!validActions.includes(action)) {
        res.status(400).json({
          success: false,
          message: 'Invalid action',
          validActions,
        });
        return;
      }

      const impact = await CreditScoreCalculatorService.simulateActionImpact(
        userId,
        action,
        parameters || {}
      );

      res.status(200).json({
        success: true,
        data: impact,
      });
    } catch (error) {
      console.error('Error simulating action impact:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to simulate action impact',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get credit score ranges and explanations
   */
  static async getCreditScoreRanges(_req: Request, res: Response): Promise<void> {
    try {
      const ranges = CreditScoreCalculatorService.getCreditScoreRanges();

      res.status(200).json({
        success: true,
        data: ranges,
      });
    } catch (error) {
      console.error('Error getting credit score ranges:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get credit score ranges',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get credit score improvement strategies
   */
  static async getCreditScoreStrategies(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({
          success: false,
          message: 'User ID is required',
        });
        return;
      }

      const analysis = await CreditScoreCalculatorService.calculateCreditScore(userId);
      
      // Generate specific strategies based on current score and factors
      const strategies = this.generateImprovementStrategies(analysis);

      res.status(200).json({
        success: true,
        data: {
          currentScore: analysis.currentScore,
          scoreRange: this.getScoreRange(analysis.currentScore),
          strategies,
          prioritizedActions: this.prioritizeActions(analysis),
        },
      });
    } catch (error) {
      console.error('Error getting credit score strategies:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get credit score strategies',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get credit score factor breakdown
   */
  static async getCreditScoreFactors(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({
          success: false,
          message: 'User ID is required',
        });
        return;
      }

      const analysis = await CreditScoreCalculatorService.calculateCreditScore(userId);

      const factorBreakdown = {
        paymentHistory: {
          score: analysis.factors.paymentHistory,
          weight: 35,
          description: 'Your track record of making payments on time',
          grade: this.getGrade(analysis.factors.paymentHistory),
        },
        creditUtilization: {
          score: analysis.factors.creditUtilization,
          weight: 30,
          description: 'How much of your available credit you\'re using',
          grade: this.getGrade(analysis.factors.creditUtilization),
        },
        lengthOfCreditHistory: {
          score: analysis.factors.lengthOfCreditHistory,
          weight: 15,
          description: 'How long you\'ve had credit accounts',
          grade: this.getGrade(analysis.factors.lengthOfCreditHistory),
        },
        creditMix: {
          score: analysis.factors.creditMix,
          weight: 10,
          description: 'The variety of credit types you have',
          grade: this.getGrade(analysis.factors.creditMix),
        },
        newCredit: {
          score: analysis.factors.newCredit,
          weight: 10,
          description: 'How often you apply for new credit',
          grade: this.getGrade(analysis.factors.newCredit),
        },
      };

      res.status(200).json({
        success: true,
        data: {
          overallScore: analysis.currentScore,
          factors: factorBreakdown,
        },
      });
    } catch (error) {
      console.error('Error getting credit score factors:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get credit score factors',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Generate improvement strategies based on current analysis
   */
  private static generateImprovementStrategies(analysis: any) {
    const strategies = [];

    // Payment history strategies
    if (analysis.factors.paymentHistory < 700) {
      strategies.push({
        category: 'Payment History',
        priority: 'High',
        impact: 'High',
        timeframe: '3-6 months',
        actions: [
          'Set up automatic payments for at least the minimum amount',
          'Pay all bills on time, every time',
          'If you have late payments, focus on current payments - time heals old wounds',
        ],
      });
    }

    // Credit utilization strategies
    if (analysis.factors.creditUtilization < 750) {
      strategies.push({
        category: 'Credit Utilization',
        priority: 'High',
        impact: 'High',
        timeframe: '1-3 months',
        actions: [
          'Pay down existing credit card balances',
          'Keep utilization below 30% on all cards',
          'Consider making multiple payments per month',
          'Request credit limit increases on existing cards',
        ],
      });
    }

    // Length of credit history strategies
    if (analysis.factors.lengthOfCreditHistory < 700) {
      strategies.push({
        category: 'Credit History Length',
        priority: 'Medium',
        impact: 'Medium',
        timeframe: '6+ months',
        actions: [
          'Keep older credit cards open, even if you don\'t use them',
          'Use old cards occasionally to keep them active',
          'Avoid closing your oldest credit cards',
        ],
      });
    }

    // Credit mix strategies
    if (analysis.factors.creditMix < 700) {
      strategies.push({
        category: 'Credit Mix',
        priority: 'Low',
        impact: 'Low',
        timeframe: '6+ months',
        actions: [
          'Consider diversifying with different types of credit over time',
          'Only open new accounts when you need them',
        ],
      });
    }

    // New credit strategies
    if (analysis.factors.newCredit < 700) {
      strategies.push({
        category: 'New Credit',
        priority: 'Medium',
        impact: 'Medium',
        timeframe: '6-12 months',
        actions: [
          'Avoid applying for new credit cards unnecessarily',
          'Space out credit applications by at least 6 months',
          'Only apply for credit you really need',
        ],
      });
    }

    return strategies;
  }

  /**
   * Prioritize actions based on current score
   */
  private static prioritizeActions(analysis: any) {
    const actions = [];

    // Always prioritize payment history if it's low
    if (analysis.factors.paymentHistory < 700) {
      actions.push({
        action: 'Improve Payment History',
        priority: 1,
        expectedImpact: '+20-50 points',
        description: 'Make all payments on time going forward',
      });
    }

    // Credit utilization is usually the quickest way to improve
    if (analysis.factors.creditUtilization < 750) {
      actions.push({
        action: 'Reduce Credit Utilization',
        priority: 2,
        expectedImpact: '+10-40 points',
        description: 'Pay down balances or increase credit limits',
      });
    }

    // Other factors
    if (analysis.factors.lengthOfCreditHistory < 700) {
      actions.push({
        action: 'Maintain Credit History',
        priority: 3,
        expectedImpact: '+5-15 points',
        description: 'Keep old accounts open and active',
      });
    }

    return actions;
  }

  /**
   * Get letter grade for a score
   */
  private static getGrade(score: number): string {
    if (score >= 800) return 'A+';
    if (score >= 750) return 'A';
    if (score >= 700) return 'B+';
    if (score >= 650) return 'B';
    if (score >= 600) return 'C+';
    if (score >= 550) return 'C';
    if (score >= 500) return 'D';
    return 'F';
  }

  /**
   * Get score range description
   */
  private static getScoreRange(score: number): string {
    const ranges = CreditScoreCalculatorService.getCreditScoreRanges();
    
    if (score >= ranges.exceptional.min) return 'Exceptional';
    if (score >= ranges.veryGood.min) return 'Very Good';
    if (score >= ranges.good.min) return 'Good';
    if (score >= ranges.fair.min) return 'Fair';
    return 'Poor';
  }
}

export default CreditScoreController;
