import prisma from '../lib/prisma';

export interface CreditScoreFactors {
  paymentHistory: number;        // 35% of score
  creditUtilization: number;     // 30% of score
  lengthOfCreditHistory: number; // 15% of score
  creditMix: number;            // 10% of score
  newCredit: number;            // 10% of score
}

export interface CreditScoreAnalysis {
  currentScore: number;
  factors: CreditScoreFactors;
  recommendations: string[];
  impactAnalysis: {
    paymentOnTime: number;
    paymentLate: number;
    utilizationReduction: number;
    utilizationIncrease: number;
    accountClosure: number;
    newAccountOpening: number;
  };
}

export interface ActionImpact {
  action: string;
  currentScore: number;
  projectedScore: number;
  impact: number;
  timeframe: string;
  explanation: string;
}

class CreditScoreCalculatorService {
  /**
   * Calculate credit score based on user's credit profile
   */
  static async calculateCreditScore(userId: string): Promise<CreditScoreAnalysis> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        creditCards: {
          include: {
            transactions: {
              orderBy: { date: 'desc' },
              take: 100, // Last 100 transactions
            },
            payments: {
              orderBy: { paymentDate: 'desc' },
              take: 24, // Last 24 months of payments
            },
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Calculate each factor
    const paymentHistory = this.calculatePaymentHistoryScore(user.creditCards);
    const creditUtilization = this.calculateCreditUtilizationScore(user.creditCards);
    const lengthOfCreditHistory = this.calculateLengthOfCreditHistoryScore(user.creditCards);
    const creditMix = this.calculateCreditMixScore(user.creditCards);
    const newCredit = this.calculateNewCreditScore(user.creditCards);

    // Calculate overall score (weighted average)
    const overallScore = Math.round(
      paymentHistory * 0.35 +
      creditUtilization * 0.30 +
      lengthOfCreditHistory * 0.15 +
      creditMix * 0.10 +
      newCredit * 0.10
    );

    const factors: CreditScoreFactors = {
      paymentHistory,
      creditUtilization,
      lengthOfCreditHistory,
      creditMix,
      newCredit,
    };

    const recommendations = this.generateRecommendations(factors, user.creditCards);
    const impactAnalysis = this.calculateActionImpacts(factors, user.creditCards);

    return {
      currentScore: overallScore,
      factors,
      recommendations,
      impactAnalysis,
    };
  }

  /**
   * Simulate the impact of a specific action on credit score
   */
  static async simulateActionImpact(
    userId: string,
    action: string,
    parameters: Record<string, any>
  ): Promise<ActionImpact> {
    const currentAnalysis = await this.calculateCreditScore(userId);
    let projectedScore = currentAnalysis.currentScore;
    let explanation = '';
    let timeframe = 'Immediate';

    switch (action) {
      case 'make_payment':
        const paymentImpact = this.simulatePaymentImpact(
          currentAnalysis.factors,
          parameters.amount,
          parameters.isOnTime
        );
        projectedScore = currentAnalysis.currentScore + paymentImpact.scoreChange;
        explanation = paymentImpact.explanation;
        timeframe = paymentImpact.timeframe;
        break;

      case 'change_utilization':
        const utilizationImpact = this.simulateUtilizationChange(
          currentAnalysis.factors.creditUtilization,
          parameters.newUtilization
        );
        projectedScore = currentAnalysis.currentScore + utilizationImpact.scoreChange;
        explanation = utilizationImpact.explanation;
        timeframe = utilizationImpact.timeframe;
        break;

      case 'open_new_account':
        const newAccountImpact = this.simulateNewAccountImpact(currentAnalysis.factors);
        projectedScore = currentAnalysis.currentScore + newAccountImpact.scoreChange;
        explanation = newAccountImpact.explanation;
        timeframe = newAccountImpact.timeframe;
        break;

      case 'close_account':
        const closeAccountImpact = this.simulateAccountClosureImpact(
          currentAnalysis.factors,
          parameters.accountAge
        );
        projectedScore = currentAnalysis.currentScore + closeAccountImpact.scoreChange;
        explanation = closeAccountImpact.explanation;
        timeframe = closeAccountImpact.timeframe;
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    // Ensure score stays within valid range (300-850)
    projectedScore = Math.max(300, Math.min(850, projectedScore));

    return {
      action,
      currentScore: currentAnalysis.currentScore,
      projectedScore: Math.round(projectedScore),
      impact: Math.round(projectedScore - currentAnalysis.currentScore),
      timeframe,
      explanation,
    };
  }

  /**
   * Get credit score ranges and their meanings
   */
  static getCreditScoreRanges() {
    return {
      poor: { min: 300, max: 579, description: 'Poor - Limited credit options, high interest rates' },
      fair: { min: 580, max: 669, description: 'Fair - Some credit options, higher interest rates' },
      good: { min: 670, max: 739, description: 'Good - Good credit options, average interest rates' },
      veryGood: { min: 740, max: 799, description: 'Very Good - Great credit options, low interest rates' },
      exceptional: { min: 800, max: 850, description: 'Exceptional - Best credit options, lowest rates' },
    };
  }

  /**
   * Calculate payment history score (35% of credit score)
   */
  private static calculatePaymentHistoryScore(creditCards: any[]): number {
    if (creditCards.length === 0) return 300; // Base score for no credit history

    let totalPayments = 0;
    let onTimePayments = 0;
    let latePayments = 0;

    creditCards.forEach(card => {
      card.payments.forEach((payment: any) => {
        totalPayments++;
        // Simplified logic - in real scenario, would check if payment was on time
        if (payment.status === 'COMPLETED') {
          onTimePayments++;
        } else if (payment.status === 'FAILED') {
          latePayments++;
        }
      });
    });

    if (totalPayments === 0) return 600; // Average score for new credit

    const onTimePercentage = onTimePayments / totalPayments;
    
    // Score from 300-850 based on on-time payment percentage
    if (onTimePercentage >= 0.95) return 800;
    if (onTimePercentage >= 0.90) return 750;
    if (onTimePercentage >= 0.80) return 700;
    if (onTimePercentage >= 0.70) return 650;
    if (onTimePercentage >= 0.60) return 600;
    if (onTimePercentage >= 0.50) return 550;
    return 500;
  }

  /**
   * Calculate credit utilization score (30% of credit score)
   */
  private static calculateCreditUtilizationScore(creditCards: any[]): number {
    if (creditCards.length === 0) return 300;

    let totalLimit = 0;
    let totalBalance = 0;

    creditCards.forEach(card => {
      totalLimit += card.creditLimit;
      totalBalance += card.currentBalance;
    });

    if (totalLimit === 0) return 300;

    const utilizationRate = totalBalance / totalLimit;
    
    // Score based on utilization rate
    if (utilizationRate <= 0.10) return 850;  // Under 10%
    if (utilizationRate <= 0.20) return 800;  // 10-20%
    if (utilizationRate <= 0.30) return 750;  // 20-30%
    if (utilizationRate <= 0.50) return 700;  // 30-50%
    if (utilizationRate <= 0.70) return 650;  // 50-70%
    if (utilizationRate <= 0.90) return 600;  // 70-90%
    return 500; // Over 90%
  }

  /**
   * Calculate length of credit history score (15% of credit score)
   */
  private static calculateLengthOfCreditHistoryScore(creditCards: any[]): number {
    if (creditCards.length === 0) return 300;

    const now = new Date();
    let totalAge = 0;
    let oldestAccount = now;

    creditCards.forEach(card => {
      const accountAge = now.getTime() - card.issueDate.getTime();
      totalAge += accountAge;
      
      if (card.issueDate < oldestAccount) {
        oldestAccount = card.issueDate;
      }
    });

    const averageAgeYears = totalAge / creditCards.length / (1000 * 60 * 60 * 24 * 365);
    const oldestAccountYears = (now.getTime() - oldestAccount.getTime()) / (1000 * 60 * 60 * 24 * 365);

    // Score based on average age and oldest account
    if (averageAgeYears >= 10 || oldestAccountYears >= 15) return 800;
    if (averageAgeYears >= 5 || oldestAccountYears >= 10) return 750;
    if (averageAgeYears >= 3 || oldestAccountYears >= 7) return 700;
    if (averageAgeYears >= 2 || oldestAccountYears >= 5) return 650;
    if (averageAgeYears >= 1 || oldestAccountYears >= 2) return 600;
    return 550;
  }

  /**
   * Calculate credit mix score (10% of credit score)
   */
  private static calculateCreditMixScore(creditCards: any[]): number {
    // Simplified - only considering credit cards
    // In real scenario, would consider various account types (auto loans, mortgages, etc.)
    
    const accountCount = creditCards.length;
    
    if (accountCount === 0) return 300;
    if (accountCount === 1) return 650;
    if (accountCount <= 3) return 750;
    if (accountCount <= 5) return 800;
    return 750; // Too many accounts can hurt score
  }

  /**
   * Calculate new credit score (10% of credit score)
   */
  private static calculateNewCreditScore(creditCards: any[]): number {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
    const twoYearsAgo = new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000);

    let recentAccounts = 0;
    let newAccounts = 0;

    creditCards.forEach(card => {
      if (card.issueDate > sixMonthsAgo) {
        recentAccounts++;
      }
      if (card.issueDate > twoYearsAgo) {
        newAccounts++;
      }
    });

    // Penalize for too many recent accounts
    if (recentAccounts >= 3) return 500;
    if (recentAccounts === 2) return 650;
    if (recentAccounts === 1) return 750;
    if (newAccounts >= 4) return 700;
    if (newAccounts >= 2) return 750;
    return 800;
  }

  /**
   * Generate personalized recommendations
   */
  private static generateRecommendations(factors: CreditScoreFactors, _creditCards: any[]): string[] {
    const recommendations: string[] = [];

    // Payment history recommendations
    if (factors.paymentHistory < 700) {
      recommendations.push('Make all payments on time to improve your payment history (35% of your score)');
      recommendations.push('Set up automatic payments to avoid missing due dates');
    }

    // Credit utilization recommendations
    if (factors.creditUtilization < 750) {
      recommendations.push('Keep credit utilization below 30% of your limit (ideally under 10%)');
      recommendations.push('Pay down existing balances or request credit limit increases');
    }

    // Length of credit history recommendations
    if (factors.lengthOfCreditHistory < 700) {
      recommendations.push('Keep older accounts open to maintain credit history length');
      recommendations.push('Avoid closing your oldest credit cards');
    }

    // Credit mix recommendations
    if (factors.creditMix < 700) {
      recommendations.push('Consider diversifying your credit mix with different types of accounts');
    }

    // New credit recommendations
    if (factors.newCredit < 700) {
      recommendations.push('Avoid opening too many new accounts in a short period');
      recommendations.push('Only apply for new credit when necessary');
    }

    return recommendations;
  }

  /**
   * Calculate impact of various actions
   */
  private static calculateActionImpacts(factors: CreditScoreFactors, _creditCards: any[]) {
    return {
      paymentOnTime: factors.paymentHistory < 700 ? 10 : 5,
      paymentLate: factors.paymentHistory > 600 ? -50 : -30,
      utilizationReduction: factors.creditUtilization < 750 ? 20 : 10,
      utilizationIncrease: factors.creditUtilization > 500 ? -25 : -15,
      accountClosure: factors.lengthOfCreditHistory > 650 ? -10 : -5,
      newAccountOpening: factors.newCredit > 650 ? -10 : -5,
    };
  }

  /**
   * Simulate payment impact
   */
  private static simulatePaymentImpact(factors: CreditScoreFactors, _amount: number, isOnTime: boolean) {
    if (isOnTime) {
      return {
        scoreChange: factors.paymentHistory < 700 ? 5 : 2,
        explanation: 'On-time payments gradually improve your payment history over time',
        timeframe: '1-2 months',
      };
    } else {
      return {
        scoreChange: factors.paymentHistory > 600 ? -30 : -20,
        explanation: 'Late payments significantly damage your credit score and stay on your report for 7 years',
        timeframe: 'Immediate',
      };
    }
  }

  /**
   * Simulate utilization change impact
   */
  private static simulateUtilizationChange(currentUtilization: number, newUtilization: number) {
    const scoreDiff = newUtilization - currentUtilization;
    
    return {
      scoreChange: scoreDiff,
      explanation: scoreDiff > 0 
        ? 'Reducing credit utilization can quickly improve your credit score'
        : 'Increasing credit utilization will lower your credit score',
      timeframe: '1-2 months',
    };
  }

  /**
   * Simulate new account impact
   */
  private static simulateNewAccountImpact(factors: CreditScoreFactors) {
    return {
      scoreChange: factors.newCredit > 650 ? -10 : -5,
      explanation: 'Opening a new account creates a hard inquiry and lowers average account age',
      timeframe: '3-6 months',
    };
  }

  /**
   * Simulate account closure impact
   */
  private static simulateAccountClosureImpact(_factors: CreditScoreFactors, accountAge: number) {
    const impact = accountAge > 5 ? -15 : -5; // Bigger impact for older accounts
    
    return {
      scoreChange: impact,
      explanation: 'Closing accounts reduces available credit and may affect credit mix',
      timeframe: 'Immediate to 3 months',
    };
  }
}

export default CreditScoreCalculatorService;
