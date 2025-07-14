import React, { useState, useEffect } from 'react';

interface PaymentScenario {
  scenarioName: string;
  monthlyPayment: number;
  totalMonths: number;
  totalInterest: number;
  totalPaid: number;
  timeSaved?: number;
  interestSaved?: number;
}

interface PaymentAnalysisInputs {
  balance: number;
  apr: number;
  minimumPaymentPercent: number;
  customPayment: number;
}

const PaymentStrategyAnalyzer: React.FC = () => {
  const [inputs, setInputs] = useState<PaymentAnalysisInputs>({
    balance: 5000,
    apr: 24.99,
    minimumPaymentPercent: 2,
    customPayment: 200,
  });

  const [scenarios, setScenarios] = useState<PaymentScenario[]>([]);

  const calculatePayoffScenario = (
    balance: number,
    apr: number,
    monthlyPayment: number,
    scenarioName: string
  ): PaymentScenario => {
    const monthlyRate = apr / 12 / 100;
    let currentBalance = balance;
    let months = 0;
    let totalInterest = 0;

    // Cap at 600 months (50 years) to prevent infinite loops
    while (currentBalance > 0.01 && months < 600) {
      const interestCharge = currentBalance * monthlyRate;
      const principalPayment = Math.min(monthlyPayment - interestCharge, currentBalance);
      
      if (principalPayment <= 0) {
        // Payment doesn't cover interest - debt will grow
        return {
          scenarioName,
          monthlyPayment,
          totalMonths: Infinity,
          totalInterest: Infinity,
          totalPaid: Infinity,
        };
      }

      currentBalance -= principalPayment;
      totalInterest += interestCharge;
      months++;
    }

    return {
      scenarioName,
      monthlyPayment,
      totalMonths: months,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPaid: Math.round((balance + totalInterest) * 100) / 100,
    };
  };

  const calculateScenarios = () => {
    const { balance, apr, minimumPaymentPercent, customPayment } = inputs;
    
    // Calculate minimum payment (typically 2-3% of balance or $35, whichever is higher)
    const percentageAmount = balance * (minimumPaymentPercent / 100);
    const minimumPayment = Math.max(percentageAmount, 35);

    const newScenarios: PaymentScenario[] = [];

    // Minimum payment scenario
    const minScenario = calculatePayoffScenario(balance, apr, minimumPayment, 'Minimum Payment');
    newScenarios.push(minScenario);

    // Custom payment scenario
    if (customPayment > minimumPayment) {
      const customScenario = calculatePayoffScenario(balance, apr, customPayment, 'Custom Payment');
      customScenario.timeSaved = minScenario.totalMonths - customScenario.totalMonths;
      customScenario.interestSaved = minScenario.totalInterest - customScenario.totalInterest;
      newScenarios.push(customScenario);
    }

    // Aggressive payment scenarios
    const aggressivePayments = [
      { percent: 5, name: '5% of Balance' },
      { percent: 10, name: '10% of Balance' },
      { percent: 15, name: '15% of Balance' },
    ];

    aggressivePayments.forEach(({ percent, name }) => {
      const payment = balance * (percent / 100);
      if (payment > minimumPayment) {
        const scenario = calculatePayoffScenario(balance, apr, payment, name);
        scenario.timeSaved = minScenario.totalMonths - scenario.totalMonths;
        scenario.interestSaved = minScenario.totalInterest - scenario.totalInterest;
        newScenarios.push(scenario);
      }
    });

    // Fixed payment scenarios
    const fixedPayments = [100, 150, 200, 300, 500];
    fixedPayments.forEach(payment => {
      if (payment > minimumPayment && payment !== customPayment) {
        const scenario = calculatePayoffScenario(balance, apr, payment, `$${payment}/month`);
        scenario.timeSaved = minScenario.totalMonths - scenario.totalMonths;
        scenario.interestSaved = minScenario.totalInterest - scenario.totalInterest;
        newScenarios.push(scenario);
      }
    });

    setScenarios(newScenarios.slice(0, 6)); // Limit to 6 scenarios for display
  };

  useEffect(() => {
    calculateScenarios();
  }, [inputs]);

  const formatCurrency = (amount: number) => {
    if (amount === Infinity) return '∞';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatMonths = (months: number) => {
    if (months === Infinity) return '∞';
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years > 0) {
      return `${years}y ${remainingMonths}m`;
    }
    return `${months}m`;
  };

  const getScenarioColor = (index: number) => {
    const colors = [
      'border-red-300 bg-red-50',
      'border-blue-300 bg-blue-50',
      'border-green-300 bg-green-50',
      'border-purple-300 bg-purple-50',
      'border-yellow-300 bg-yellow-50',
      'border-indigo-300 bg-indigo-50',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📊 Payment Strategy Analyzer
        </h1>
        <p className="text-gray-600">
          Compare different payment strategies to see how much time and money you can save by paying more than the minimum.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Input Controls */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Scenario Inputs</h2>
            
            <div className="space-y-4">
              {/* Current Balance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Balance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.balance}
                    onChange={(e) => setInputs(prev => ({ ...prev, balance: Number(e.target.value) }))}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="100"
                  />
                </div>
              </div>

              {/* APR */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  APR (%)
                </label>
                <input
                  type="number"
                  value={inputs.apr}
                  onChange={(e) => setInputs(prev => ({ ...prev, apr: Number(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="35"
                  step="0.01"
                />
              </div>

              {/* Minimum Payment Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Payment (% of balance)
                </label>
                <input
                  type="number"
                  value={inputs.minimumPaymentPercent}
                  onChange={(e) => setInputs(prev => ({ ...prev, minimumPaymentPercent: Number(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="10"
                  step="0.1"
                />
              </div>

              {/* Custom Payment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Monthly Payment
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={inputs.customPayment}
                    onChange={(e) => setInputs(prev => ({ ...prev, customPayment: Number(e.target.value) }))}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    step="10"
                  />
                </div>
              </div>

              {/* Quick Presets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Scenarios
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setInputs({ balance: 2500, apr: 18.99, minimumPaymentPercent: 2, customPayment: 100 })}
                    className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-left"
                  >
                    Low Balance Scenario
                  </button>
                  <button
                    onClick={() => setInputs({ balance: 8000, apr: 24.99, minimumPaymentPercent: 2, customPayment: 300 })}
                    className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-left"
                  >
                    High Balance Scenario
                  </button>
                  <button
                    onClick={() => setInputs({ balance: 15000, apr: 29.99, minimumPaymentPercent: 2, customPayment: 500 })}
                    className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-left"
                  >
                    High Interest Scenario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Comparisons */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario, index) => (
              <div
                key={scenario.scenarioName}
                className={`rounded-lg border-2 p-6 ${getScenarioColor(index)}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{scenario.scenarioName}</h3>
                  {index === 0 && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      Baseline
                    </span>
                  )}
                  {scenario.interestSaved && scenario.interestSaved > 0 && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Savings!
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Payment:</span>
                    <span className="font-medium">{formatCurrency(scenario.monthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payoff Time:</span>
                    <span className="font-medium">{formatMonths(scenario.totalMonths)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-medium text-red-600">{formatCurrency(scenario.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Paid:</span>
                    <span className="font-medium">{formatCurrency(scenario.totalPaid)}</span>
                  </div>

                  {scenario.timeSaved !== undefined && scenario.timeSaved > 0 && (
                    <div className="border-t pt-3 mt-3">
                      <div className="text-green-700 font-medium text-sm">Savings vs Minimum:</div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Time Saved:</span>
                        <span className="text-green-600 font-medium">{formatMonths(scenario.timeSaved)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Interest Saved:</span>
                        <span className="text-green-600 font-medium">{formatCurrency(scenario.interestSaved || 0)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Educational Information */}
          <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-900">
              📚 Payment Strategy Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4">
                <strong>Minimum Payment Impact:</strong>
                <p className="mt-1 text-gray-700">
                  Paying only the minimum keeps you in debt longer and costs significantly more in interest over time.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <strong>The Power of Extra Payments:</strong>
                <p className="mt-1 text-gray-700">
                  Even small additional payments can dramatically reduce payoff time and total interest paid.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <strong>Debt Avalanche Strategy:</strong>
                <p className="mt-1 text-gray-700">
                  Focus extra payments on highest-interest debt first to minimize total interest paid.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <strong>Consistency Matters:</strong>
                <p className="mt-1 text-gray-700">
                  Regular higher payments are more effective than occasional large payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStrategyAnalyzer;
