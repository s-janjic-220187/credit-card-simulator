import React, { useState, useEffect } from 'react';

interface InterestCalculation {
  balance: number;
  apr: number;
  days: number;
  dailyRate: number;
  dailyInterest: number;
  monthlyInterest: number;
  yearlyInterest: number;
}

const InterestCalculator: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [apr, setApr] = useState<number>(24.99);
  const [days, setDays] = useState<number>(30);
  const [calculation, setCalculation] = useState<InterestCalculation | null>(null);

  const calculateInterest = () => {
    const dailyRate = apr / 365 / 100;
    const dailyInterest = balance * dailyRate;
    const monthlyInterest = dailyInterest * days;
    const yearlyInterest = balance * (apr / 100);

    setCalculation({
      balance,
      apr,
      days,
      dailyRate,
      dailyInterest,
      monthlyInterest,
      yearlyInterest,
    });
  };

  useEffect(() => {
    calculateInterest();
  }, [balance, apr, days]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (rate: number, decimals: number = 4) => {
    return `${(rate * 100).toFixed(decimals)}%`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🧮 Interest Calculator
        </h1>
        <p className="text-gray-600">
          Understand how credit card interest is calculated with real-time examples and educational breakdowns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Calculator Inputs</h2>
          
          <div className="space-y-6">
            {/* Balance Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Balance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="100"
                />
              </div>
              <div className="mt-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>$10,000</span>
                </div>
              </div>
            </div>

            {/* APR Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Percentage Rate (APR)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={apr}
                  onChange={(e) => setApr(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="35"
                  step="0.01"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
              <div className="mt-2">
                <input
                  type="range"
                  min="0"
                  max="35"
                  step="0.1"
                  value={apr}
                  onChange={(e) => setApr(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>35%</span>
                </div>
              </div>
            </div>

            {/* Days Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Days
              </label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="365"
              />
              <div className="mt-2">
                <input
                  type="range"
                  min="1"
                  max="365"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 day</span>
                  <span>365 days</span>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Presets
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setDays(30)}
                  className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  30 Days
                </button>
                <button
                  onClick={() => setDays(90)}
                  className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  90 Days
                </button>
                <button
                  onClick={() => setDays(365)}
                  className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  1 Year
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Results */}
        <div className="space-y-6">
          {/* Main Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Interest Breakdown</h2>
            
            {calculation && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {formatCurrency(calculation.dailyInterest)}
                    </div>
                    <div className="text-sm text-gray-600">Daily Interest</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {formatCurrency(calculation.monthlyInterest)}
                    </div>
                    <div className="text-sm text-gray-600">{days}-Day Interest</div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily Interest Rate:</span>
                      <span className="font-medium">{formatPercentage(calculation.dailyRate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Rate (30 days):</span>
                      <span className="font-medium">{formatPercentage(calculation.dailyRate * 30, 2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Rate:</span>
                      <span className="font-medium">{formatPercentage(calculation.apr / 100, 2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Educational Information */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-900">
              📚 How Interest Is Calculated
            </h3>
            <div className="space-y-4 text-sm">
              <div className="bg-white rounded-lg p-4">
                <strong>Step 1: Convert APR to Daily Rate</strong>
                <p className="mt-1 text-gray-700">
                  Daily Rate = APR ÷ 365 ÷ 100 = {calculation ? formatPercentage(calculation.dailyRate) : '0%'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <strong>Step 2: Calculate Daily Interest</strong>
                <p className="mt-1 text-gray-700">
                  Daily Interest = Balance × Daily Rate = {calculation ? formatCurrency(calculation.dailyInterest) : '$0.00'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <strong>Step 3: Calculate Period Interest</strong>
                <p className="mt-1 text-gray-700">
                  {days}-Day Interest = Daily Interest × {days} days = {calculation ? formatCurrency(calculation.monthlyInterest) : '$0.00'}
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Tool */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">APR Comparison</h3>
            <div className="space-y-3">
              {[15, 20, 25, 30].map((compareApr) => {
                const compareDailyRate = compareApr / 365 / 100;
                const compareInterest = balance * compareDailyRate * days;
                const isCurrentApr = Math.abs(apr - compareApr) < 0.1;
                
                return (
                  <div
                    key={compareApr}
                    className={`flex justify-between p-3 rounded-lg ${
                      isCurrentApr 
                        ? 'bg-blue-100 border-2 border-blue-300' 
                        : 'bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{compareApr}% APR</span>
                    <span className={isCurrentApr ? 'font-bold text-blue-700' : ''}>
                      {formatCurrency(compareInterest)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestCalculator;
