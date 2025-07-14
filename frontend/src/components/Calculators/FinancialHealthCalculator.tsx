import React, { useState, useMemo } from 'react';

interface FinancialData {
  // Credit Information
  currentBalance: number;
  creditLimit: number;
  numCreditCards: number;
  averageAPR: number;
  creditScore: number;
  paymentHistory: 'excellent' | 'good' | 'fair' | 'poor'; // % on-time payments
  accountAge: number; // years
  
  // Income & Expenses
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyDebtPayments: number;
  emergencyFund: number; // months of expenses
  
  // Financial Habits
  paymentStrategy: 'full' | 'more_than_minimum' | 'minimum' | 'sometimes_late';
  budgetTracking: 'detailed' | 'basic' | 'mental' | 'none';
  financialGoals: 'clear' | 'general' | 'vague' | 'none';
}

interface HealthScore {
  overall: number;
  creditHealth: number;
  debtManagement: number;
  cashFlow: number;
  financialHabits: number;
}

interface HealthFactor {
  category: string;
  factor: string;
  score: number;
  maxScore: number;
  impact: 'high' | 'medium' | 'low';
  explanation: string;
  recommendations: string[];
}

const FinancialHealthCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FinancialData>({
    currentBalance: 5000,
    creditLimit: 10000,
    numCreditCards: 2,
    averageAPR: 22,
    creditScore: 700,
    paymentHistory: 'good',
    accountAge: 3,
    monthlyIncome: 5000,
    monthlyExpenses: 3500,
    monthlyDebtPayments: 500,
    emergencyFund: 2,
    paymentStrategy: 'more_than_minimum',
    budgetTracking: 'basic',
    financialGoals: 'general',
  });

  const [showRecommendations, setShowRecommendations] = useState(false);

  const healthScore = useMemo((): HealthScore & { factors: HealthFactor[] } => {
    const factors: HealthFactor[] = [];

    // Credit Health Factors (25 points total)
    
    // Credit Utilization (10 points)
    const utilization = (formData.currentBalance / formData.creditLimit) * 100;
    let utilizationScore = 0;
    if (utilization <= 10) utilizationScore = 10;
    else if (utilization <= 30) utilizationScore = 8;
    else if (utilization <= 50) utilizationScore = 5;
    else if (utilization <= 75) utilizationScore = 2;
    else utilizationScore = 0;

    factors.push({
      category: 'Credit Health',
      factor: 'Credit Utilization',
      score: utilizationScore,
      maxScore: 10,
      impact: 'high',
      explanation: `Your utilization is ${utilization.toFixed(1)}%. Lower is better for your credit score.`,
      recommendations: utilization > 30 ? [
        'Pay down balances to below 30% of credit limits',
        'Consider requesting credit limit increases',
        'Make multiple payments per month to keep utilization low'
      ] : ['Maintain current low utilization rate']
    });

    // Payment History (8 points)
    const paymentHistoryScores = { excellent: 8, good: 6, fair: 3, poor: 0 };
    const paymentHistoryScore = paymentHistoryScores[formData.paymentHistory];
    
    factors.push({
      category: 'Credit Health',
      factor: 'Payment History',
      score: paymentHistoryScore,
      maxScore: 8,
      impact: 'high',
      explanation: `Your payment history is ${formData.paymentHistory}. This is the most important credit factor.`,
      recommendations: paymentHistoryScore < 6 ? [
        'Set up automatic payments for at least minimum amounts',
        'Create payment reminders and calendar alerts',
        'Consider autopay for full balance if cash flow allows'
      ] : ['Continue making all payments on time']
    });

    // Credit Score (7 points)
    let creditScorePoints = 0;
    if (formData.creditScore >= 800) creditScorePoints = 7;
    else if (formData.creditScore >= 740) creditScorePoints = 6;
    else if (formData.creditScore >= 670) creditScorePoints = 4;
    else if (formData.creditScore >= 580) creditScorePoints = 2;
    else creditScorePoints = 0;

    factors.push({
      category: 'Credit Health',
      factor: 'Credit Score',
      score: creditScorePoints,
      maxScore: 7,
      impact: 'high',
      explanation: `Your credit score of ${formData.creditScore} determines your access to credit and interest rates.`,
      recommendations: creditScorePoints < 6 ? [
        'Focus on payment history and utilization reduction',
        'Monitor credit report for errors',
        'Avoid opening new accounts unless necessary'
      ] : ['Maintain excellent credit habits']
    });

    const creditHealth = utilizationScore + paymentHistoryScore + creditScorePoints;

    // Debt Management (25 points total)
    
    // Debt-to-Income Ratio (10 points)
    const debtToIncome = (formData.monthlyDebtPayments / formData.monthlyIncome) * 100;
    let dtiScore = 0;
    if (debtToIncome <= 20) dtiScore = 10;
    else if (debtToIncome <= 30) dtiScore = 7;
    else if (debtToIncome <= 40) dtiScore = 4;
    else if (debtToIncome <= 50) dtiScore = 2;
    else dtiScore = 0;

    factors.push({
      category: 'Debt Management',
      factor: 'Debt-to-Income Ratio',
      score: dtiScore,
      maxScore: 10,
      impact: 'high',
      explanation: `Your debt payments are ${debtToIncome.toFixed(1)}% of income. Lower ratios indicate better debt management.`,
      recommendations: dtiScore < 7 ? [
        'Create aggressive debt payoff plan',
        'Consider debt consolidation options',
        'Avoid taking on new debt until current debt is reduced'
      ] : ['Maintain healthy debt levels']
    });

    // Payment Strategy (8 points)
    const paymentStrategyScores = { 
      full: 8, 
      more_than_minimum: 6, 
      minimum: 2, 
      sometimes_late: 0 
    };
    const paymentStrategyScore = paymentStrategyScores[formData.paymentStrategy];

    factors.push({
      category: 'Debt Management',
      factor: 'Payment Strategy',
      score: paymentStrategyScore,
      maxScore: 8,
      impact: 'high',
      explanation: `You ${formData.paymentStrategy.replace('_', ' ')} pay your credit cards.`,
      recommendations: paymentStrategyScore < 6 ? [
        'Try to pay more than minimum when possible',
        'Focus extra payments on highest APR debts first',
        'Consider the debt avalanche or snowball method'
      ] : ['Continue your effective payment strategy']
    });

    // Interest Rate Management (7 points)
    let aprScore = 0;
    if (formData.averageAPR <= 15) aprScore = 7;
    else if (formData.averageAPR <= 20) aprScore = 5;
    else if (formData.averageAPR <= 25) aprScore = 3;
    else if (formData.averageAPR <= 30) aprScore = 1;
    else aprScore = 0;

    factors.push({
      category: 'Debt Management',
      factor: 'Average Interest Rate',
      score: aprScore,
      maxScore: 7,
      impact: 'medium',
      explanation: `Your average APR is ${formData.averageAPR}%. Lower rates save money over time.`,
      recommendations: aprScore < 5 ? [
        'Look for balance transfer opportunities',
        'Negotiate with current card issuers for rate reductions',
        'Focus on improving credit score to qualify for better rates'
      ] : ['Continue monitoring for better rate opportunities']
    });

    const debtManagement = dtiScore + paymentStrategyScore + aprScore;

    // Cash Flow & Emergency Preparedness (25 points total)
    
    // Emergency Fund (12 points)
    let emergencyScore = 0;
    if (formData.emergencyFund >= 6) emergencyScore = 12;
    else if (formData.emergencyFund >= 3) emergencyScore = 8;
    else if (formData.emergencyFund >= 1) emergencyScore = 4;
    else emergencyScore = 0;

    factors.push({
      category: 'Cash Flow',
      factor: 'Emergency Fund',
      score: emergencyScore,
      maxScore: 12,
      impact: 'high',
      explanation: `You have ${formData.emergencyFund} months of expenses saved for emergencies.`,
      recommendations: emergencyScore < 8 ? [
        'Build emergency fund to at least 3-6 months of expenses',
        'Start with small automatic transfers to savings',
        'Keep emergency fund in high-yield savings account'
      ] : ['Maintain and protect your emergency fund']
    });

    // Cash Flow Margin (8 points)
    const monthlyMargin = formData.monthlyIncome - formData.monthlyExpenses - formData.monthlyDebtPayments;
    const marginPercent = (monthlyMargin / formData.monthlyIncome) * 100;
    let marginScore = 0;
    if (marginPercent >= 20) marginScore = 8;
    else if (marginPercent >= 10) marginScore = 6;
    else if (marginPercent >= 5) marginScore = 3;
    else if (marginPercent >= 0) marginScore = 1;
    else marginScore = 0;

    factors.push({
      category: 'Cash Flow',
      factor: 'Monthly Cash Flow Margin',
      score: marginScore,
      maxScore: 8,
      impact: 'high',
      explanation: `You have ${marginPercent.toFixed(1)}% of income available after expenses and debt payments.`,
      recommendations: marginScore < 6 ? [
        'Review and reduce non-essential expenses',
        'Look for ways to increase income',
        'Prioritize debt reduction to free up cash flow'
      ] : ['Consider increasing savings and investments']
    });

    // Income Stability (5 points)
    // This is simplified - in a real app, you'd ask about job security, income variability, etc.
    const incomeStabilityScore = formData.monthlyIncome >= 3000 ? 5 : 3;

    factors.push({
      category: 'Cash Flow',
      factor: 'Income Level',
      score: incomeStabilityScore,
      maxScore: 5,
      impact: 'medium',
      explanation: `Your monthly income of $${formData.monthlyIncome.toLocaleString()} provides ${incomeStabilityScore === 5 ? 'good' : 'adequate'} financial foundation.`,
      recommendations: incomeStabilityScore < 5 ? [
        'Explore opportunities for income growth',
        'Consider side income or skill development',
        'Focus on essential expenses and debt reduction'
      ] : ['Consider diversifying income sources']
    });

    const cashFlow = emergencyScore + marginScore + incomeStabilityScore;

    // Financial Habits & Planning (25 points total)
    
    // Budget Tracking (10 points)
    const budgetScores = { detailed: 10, basic: 7, mental: 3, none: 0 };
    const budgetScore = budgetScores[formData.budgetTracking];

    factors.push({
      category: 'Financial Habits',
      factor: 'Budget Tracking',
      score: budgetScore,
      maxScore: 10,
      impact: 'medium',
      explanation: `You use ${formData.budgetTracking.replace('_', ' ')} budget tracking.`,
      recommendations: budgetScore < 7 ? [
        'Implement detailed budget tracking system',
        'Use budgeting apps or spreadsheets',
        'Review spending patterns monthly'
      ] : ['Continue disciplined budget management']
    });

    // Financial Goals (8 points)
    const goalScores = { clear: 8, general: 5, vague: 2, none: 0 };
    const goalScore = goalScores[formData.financialGoals];

    factors.push({
      category: 'Financial Habits',
      factor: 'Financial Goal Setting',
      score: goalScore,
      maxScore: 8,
      impact: 'medium',
      explanation: `You have ${formData.financialGoals} financial goals.`,
      recommendations: goalScore < 6 ? [
        'Set specific, measurable financial goals',
        'Create timeline for achieving major milestones',
        'Review and adjust goals regularly'
      ] : ['Continue working toward your financial goals']
    });

    // Credit Management (7 points)
    let creditManagementScore = 0;
    if (formData.numCreditCards <= 3 && formData.accountAge >= 2) creditManagementScore = 7;
    else if (formData.numCreditCards <= 5 && formData.accountAge >= 1) creditManagementScore = 5;
    else if (formData.numCreditCards <= 7) creditManagementScore = 3;
    else creditManagementScore = 1;

    factors.push({
      category: 'Financial Habits',
      factor: 'Credit Portfolio Management',
      score: creditManagementScore,
      maxScore: 7,
      impact: 'low',
      explanation: `You have ${formData.numCreditCards} credit cards with average age of ${formData.accountAge} years.`,
      recommendations: creditManagementScore < 5 ? [
        'Avoid opening new accounts unless necessary',
        'Keep older accounts open to maintain credit history',
        'Use cards responsibly to build positive history'
      ] : ['Maintain current credit portfolio']
    });

    const financialHabits = budgetScore + goalScore + creditManagementScore;

    // Calculate overall score
    const overall = creditHealth + debtManagement + cashFlow + financialHabits;

    return {
      overall,
      creditHealth,
      debtManagement,
      cashFlow,
      financialHabits,
      factors
    };
  }, [formData]);

  const getScoreLevel = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 85) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (percentage >= 70) return { level: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (percentage >= 50) return { level: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Needs Improvement', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const updateFormData = (field: keyof FinancialData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          📊 Financial Health Score Calculator
        </h1>
        <p className="text-gray-600">
          Get a comprehensive analysis of your financial health across four key areas: credit management, 
          debt control, cash flow, and financial habits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">💳 Credit Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Current Balance</label>
                  <input
                    type="number"
                    value={formData.currentBalance}
                    onChange={(e) => updateFormData('currentBalance', parseInt(e.target.value) || 0)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="5000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Credit Limit</label>
                  <input
                    type="number"
                    value={formData.creditLimit}
                    onChange={(e) => updateFormData('creditLimit', parseInt(e.target.value) || 0)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="10000"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Number of Credit Cards</label>
                  <input
                    type="number"
                    value={formData.numCreditCards}
                    onChange={(e) => updateFormData('numCreditCards', parseInt(e.target.value) || 0)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Average APR (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.averageAPR}
                    onChange={(e) => updateFormData('averageAPR', parseFloat(e.target.value) || 0)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="22.0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Credit Score</label>
                  <input
                    type="number"
                    value={formData.creditScore}
                    onChange={(e) => updateFormData('creditScore', parseInt(e.target.value) || 0)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Account Age (years)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.accountAge}
                    onChange={(e) => updateFormData('accountAge', parseFloat(e.target.value) || 0)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Payment History</label>
                <select
                  value={formData.paymentHistory}
                  onChange={(e) => updateFormData('paymentHistory', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="excellent">Excellent (95-100% on-time)</option>
                  <option value="good">Good (85-94% on-time)</option>
                  <option value="fair">Fair (70-84% on-time)</option>
                  <option value="poor">Poor (Below 70% on-time)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">💰 Income & Expenses</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Monthly Income</label>
                  <input
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => updateFormData('monthlyIncome', parseInt(e.target.value) || 0)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="5000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Monthly Expenses</label>
                  <input
                    type="number"
                    value={formData.monthlyExpenses}
                    onChange={(e) => updateFormData('monthlyExpenses', parseInt(e.target.value) || 0)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="3500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Monthly Debt Payments</label>
                  <input
                    type="number"
                    value={formData.monthlyDebtPayments}
                    onChange={(e) => updateFormData('monthlyDebtPayments', parseInt(e.target.value) || 0)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Emergency Fund (months)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.emergencyFund}
                    onChange={(e) => updateFormData('emergencyFund', parseFloat(e.target.value) || 0)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">🎯 Financial Habits</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Payment Strategy</label>
                <select
                  value={formData.paymentStrategy}
                  onChange={(e) => updateFormData('paymentStrategy', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="full">Pay full balance every month</option>
                  <option value="more_than_minimum">Pay more than minimum</option>
                  <option value="minimum">Pay minimum only</option>
                  <option value="sometimes_late">Sometimes pay late</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Budget Tracking</label>
                <select
                  value={formData.budgetTracking}
                  onChange={(e) => updateFormData('budgetTracking', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="detailed">Detailed tracking with apps/spreadsheets</option>
                  <option value="basic">Basic tracking of major categories</option>
                  <option value="mental">Mental tracking only</option>
                  <option value="none">No budget tracking</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Financial Goals</label>
                <select
                  value={formData.financialGoals}
                  onChange={(e) => updateFormData('financialGoals', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="clear">Clear, specific goals with timelines</option>
                  <option value="general">General goals without specific timelines</option>
                  <option value="vague">Vague ideas about financial future</option>
                  <option value="none">No specific financial goals</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">Overall Financial Health Score</h2>
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {healthScore.overall}/100
              </div>
              <div className={`text-xl font-semibold px-4 py-2 rounded-full inline-block ${getScoreLevel(healthScore.overall, 100).bgColor} ${getScoreLevel(healthScore.overall, 100).color}`}>
                {getScoreLevel(healthScore.overall, 100).level}
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">Score Breakdown:</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Credit Health</span>
                  <span className="font-medium">{healthScore.creditHealth}/25</span>
                </div>
                <div className="flex justify-between">
                  <span>Debt Management</span>
                  <span className="font-medium">{healthScore.debtManagement}/25</span>
                </div>
                <div className="flex justify-between">
                  <span>Cash Flow</span>
                  <span className="font-medium">{healthScore.cashFlow}/25</span>
                </div>
                <div className="flex justify-between">
                  <span>Financial Habits</span>
                  <span className="font-medium">{healthScore.financialHabits}/25</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Scores */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Credit Health', score: healthScore.creditHealth, max: 25, icon: '💳' },
              { name: 'Debt Management', score: healthScore.debtManagement, max: 25, icon: '📊' },
              { name: 'Cash Flow', score: healthScore.cashFlow, max: 25, icon: '💰' },
              { name: 'Financial Habits', score: healthScore.financialHabits, max: 25, icon: '🎯' },
            ].map(category => {
              const level = getScoreLevel(category.score, category.max);
              return (
                <div key={category.name} className="bg-white rounded-lg shadow-md p-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="font-medium text-sm mb-1">{category.name}</div>
                    <div className="text-xl font-bold mb-1">{category.score}/{category.max}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${level.bgColor} ${level.color}`}>
                      {level.level}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Analysis Button */}
          <div className="text-center">
            <button
              onClick={() => setShowRecommendations(!showRecommendations)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {showRecommendations ? 'Hide' : 'Show'} Detailed Analysis & Recommendations
            </button>
          </div>

          {/* Detailed Recommendations */}
          {showRecommendations && (
            <div className="space-y-4">
              {Object.entries(
                healthScore.factors.reduce((acc, factor) => {
                  if (!acc[factor.category]) acc[factor.category] = [];
                  acc[factor.category].push(factor);
                  return acc;
                }, {} as Record<string, HealthFactor[]>)
              ).map(([category, factors]) => (
                <div key={category} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">{category}</h3>
                  <div className="space-y-4">
                    {factors.map((factor) => (
                      <div key={factor.factor} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{factor.factor}</h4>
                          <span className={`px-2 py-1 rounded text-sm ${
                            (factor.score / factor.maxScore) >= 0.8 ? 'bg-green-100 text-green-800' :
                            (factor.score / factor.maxScore) >= 0.6 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {factor.score}/{factor.maxScore}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{factor.explanation}</p>
                        <div className="bg-gray-50 rounded p-3">
                          <div className="text-sm font-medium mb-2">💡 Recommendations:</div>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {factor.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Educational Information */}
      <div className="mt-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">📚 Understanding Your Financial Health Score</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Score Ranges:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>85-100: Excellent</span>
                <span className="text-green-600">🟢 Optimal financial health</span>
              </div>
              <div className="flex justify-between">
                <span>70-84: Good</span>
                <span className="text-blue-600">🔵 Strong foundation</span>
              </div>
              <div className="flex justify-between">
                <span>50-69: Fair</span>
                <span className="text-yellow-600">🟡 Room for improvement</span>
              </div>
              <div className="flex justify-between">
                <span>Below 50: Needs Work</span>
                <span className="text-red-600">🔴 Focus required</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Key Focus Areas:</h3>
            <ul className="text-sm space-y-1">
              <li>• <strong>Credit Health:</strong> Utilization, payment history, credit score</li>
              <li>• <strong>Debt Management:</strong> DTI ratio, payment strategy, interest rates</li>
              <li>• <strong>Cash Flow:</strong> Emergency fund, monthly margin, income stability</li>
              <li>• <strong>Financial Habits:</strong> Budgeting, goal setting, credit management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthCalculator;
