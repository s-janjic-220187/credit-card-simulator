import React, { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts';
import './FeeAnalysisDashboard.css';

interface FeeAnalysisDashboardProps {
  cardId?: string;
  annualFee?: number;
  foreignTransactionFee?: number;
  balanceTransferFee?: number;
  cashAdvanceFee?: number;
  lateFee?: number;
  overlimitFee?: number;
}

interface FeeStructure {
  annualFee: number;
  foreignTransactionFee: number;
  balanceTransferFee: number;
  cashAdvanceFee: number;
  lateFee: number;
  overlimitFee: number;
  returnedPaymentFee: number;
}

interface UsageScenario {
  name: string;
  description: string;
  transactions: {
    foreignPurchases: number;
    balanceTransfers: number;
    cashAdvances: number;
    latePayments: number;
    overlimitOccurrences: number;
    returnedPayments: number;
  };
}

interface FeeBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

interface ComparisonData {
  scenario: string;
  totalFees: number;
  annualFees: number;
  transactionFees: number;
  penaltyFees: number;
}

const FeeAnalysisDashboard: React.FC<FeeAnalysisDashboardProps> = ({
  cardId: _cardId,
  annualFee = 95,
  foreignTransactionFee = 2.7,
  balanceTransferFee = 3.0,
  cashAdvanceFee = 5.0,
  lateFee = 40,
  overlimitFee = 35,
}) => {
  const [feeStructure, setFeeStructure] = useState<FeeStructure>({
    annualFee,
    foreignTransactionFee,
    balanceTransferFee,
    cashAdvanceFee,
    lateFee,
    overlimitFee,
    returnedPaymentFee: 40,
  });

  const [selectedScenario, setSelectedScenario] = useState<string>('light');
  const [feeBreakdown, setFeeBreakdown] = useState<FeeBreakdown[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [timeframe, setTimeframe] = useState<'monthly' | 'annual'>('annual');

  const usageScenarios: Record<string, UsageScenario> = {
    light: {
      name: 'Light Usage',
      description: 'Minimal usage with good payment habits',
      transactions: {
        foreignPurchases: 500,   // $500 in foreign purchases annually
        balanceTransfers: 0,
        cashAdvances: 0,
        latePayments: 0,
        overlimitOccurrences: 0,
        returnedPayments: 0,
      },
    },
    moderate: {
      name: 'Moderate Usage',
      description: 'Regular usage with occasional late payments',
      transactions: {
        foreignPurchases: 1200,
        balanceTransfers: 3000,  // One-time $3000 balance transfer
        cashAdvances: 0,
        latePayments: 1,         // One late payment per year
        overlimitOccurrences: 0,
        returnedPayments: 0,
      },
    },
    heavy: {
      name: 'Heavy Usage',
      description: 'Frequent usage with multiple fee-generating activities',
      transactions: {
        foreignPurchases: 2500,
        balanceTransfers: 5000,
        cashAdvances: 1000,      // $1000 in cash advances
        latePayments: 3,         // Three late payments per year
        overlimitOccurrences: 2, // Two overlimit occurrences
        returnedPayments: 1,     // One returned payment
      },
    },
  };

  useEffect(() => {
    calculateFeeBreakdown();
    generateComparisonData();
  }, [feeStructure, selectedScenario, timeframe]);

  const calculateFeeBreakdown = () => {
    const scenario = usageScenarios[selectedScenario];
    const multiplier = timeframe === 'monthly' ? 1/12 : 1;

    const fees = {
      annualFee: feeStructure.annualFee * multiplier,
      foreignTransactionFees: (scenario.transactions.foreignPurchases * feeStructure.foreignTransactionFee / 100) * multiplier,
      balanceTransferFees: Math.max((scenario.transactions.balanceTransfers * feeStructure.balanceTransferFee / 100), scenario.transactions.balanceTransfers > 0 ? 5 : 0) * multiplier,
      cashAdvanceFees: Math.max((scenario.transactions.cashAdvances * feeStructure.cashAdvanceFee / 100), scenario.transactions.cashAdvances > 0 ? 10 : 0) * multiplier,
      lateFees: scenario.transactions.latePayments * feeStructure.lateFee * multiplier,
      overlimitFees: scenario.transactions.overlimitOccurrences * feeStructure.overlimitFee * multiplier,
      returnedPaymentFees: scenario.transactions.returnedPayments * feeStructure.returnedPaymentFee * multiplier,
    };

    const totalFees = Object.values(fees).reduce((sum, fee) => sum + fee, 0);

    const breakdown: FeeBreakdown[] = [
      {
        category: 'Annual Fee',
        amount: fees.annualFee,
        percentage: (fees.annualFee / totalFees) * 100,
        color: '#ff6b6b',
      },
      {
        category: 'Foreign Transaction Fees',
        amount: fees.foreignTransactionFees,
        percentage: (fees.foreignTransactionFees / totalFees) * 100,
        color: '#4ecdc4',
      },
      {
        category: 'Balance Transfer Fees',
        amount: fees.balanceTransferFees,
        percentage: (fees.balanceTransferFees / totalFees) * 100,
        color: '#45b7d1',
      },
      {
        category: 'Cash Advance Fees',
        amount: fees.cashAdvanceFees,
        percentage: (fees.cashAdvanceFees / totalFees) * 100,
        color: '#96ceb4',
      },
      {
        category: 'Late Payment Fees',
        amount: fees.lateFees,
        percentage: (fees.lateFees / totalFees) * 100,
        color: '#feca57',
      },
      {
        category: 'Overlimit Fees',
        amount: fees.overlimitFees,
        percentage: (fees.overlimitFees / totalFees) * 100,
        color: '#ff9ff3',
      },
      {
        category: 'Returned Payment Fees',
        amount: fees.returnedPaymentFees,
        percentage: (fees.returnedPaymentFees / totalFees) * 100,
        color: '#48dbfb',
      },
    ].filter(item => item.amount > 0);

    setFeeBreakdown(breakdown);
  };

  const generateComparisonData = () => {
    const data: ComparisonData[] = Object.entries(usageScenarios).map(([, scenario]) => {
      const multiplier = timeframe === 'monthly' ? 1/12 : 1;

      const annualFees = feeStructure.annualFee * multiplier;
      
      const transactionFees = (
        (scenario.transactions.foreignPurchases * feeStructure.foreignTransactionFee / 100) +
        Math.max((scenario.transactions.balanceTransfers * feeStructure.balanceTransferFee / 100), scenario.transactions.balanceTransfers > 0 ? 5 : 0) +
        Math.max((scenario.transactions.cashAdvances * feeStructure.cashAdvanceFee / 100), scenario.transactions.cashAdvances > 0 ? 10 : 0)
      ) * multiplier;

      const penaltyFees = (
        (scenario.transactions.latePayments * feeStructure.lateFee) +
        (scenario.transactions.overlimitOccurrences * feeStructure.overlimitFee) +
        (scenario.transactions.returnedPayments * feeStructure.returnedPaymentFee)
      ) * multiplier;

      return {
        scenario: scenario.name,
        totalFees: annualFees + transactionFees + penaltyFees,
        annualFees,
        transactionFees,
        penaltyFees,
      };
    });

    setComparisonData(data);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={feeBreakdown}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          dataKey="amount"
          label={({ category, percentage }) => 
            percentage > 5 ? `${category}: ${percentage.toFixed(1)}%` : ''
          }
        >
          {feeBreakdown.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [formatCurrency(value), 'Amount']}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderComparisonChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={comparisonData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="scenario" />
        <YAxis tickFormatter={(value) => formatCurrency(value)} />
        <Tooltip formatter={(value: number, name: string) => [formatCurrency(value), name]} />
        <Legend />
        <Bar dataKey="annualFees" stackId="a" fill="#ff6b6b" name="Annual Fees" />
        <Bar dataKey="transactionFees" stackId="a" fill="#4ecdc4" name="Transaction Fees" />
        <Bar dataKey="penaltyFees" stackId="a" fill="#feca57" name="Penalty Fees" />
        <Line type="monotone" dataKey="totalFees" stroke="#8884d8" strokeWidth={3} name="Total Fees" />
      </ComposedChart>
    </ResponsiveContainer>
  );

  const renderFeeBreakdown = () => (
    <div className="fee-breakdown-list">
      {feeBreakdown.map((fee, index) => (
        <div key={index} className="fee-item">
          <div className="fee-info">
            <div className="fee-color" style={{ backgroundColor: fee.color }}></div>
            <span className="fee-category">{fee.category}</span>
          </div>
          <div className="fee-amounts">
            <span className="fee-amount">{formatCurrency(fee.amount)}</span>
            <span className="fee-percentage">({fee.percentage.toFixed(1)}%)</span>
          </div>
        </div>
      ))}
    </div>
  );

  const totalFees = feeBreakdown.reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="fee-analysis-dashboard">
      <div className="dashboard-header">
        <h2>Fee Analysis Dashboard</h2>
        <p>Comprehensive analysis of credit card fee structures and their impact</p>
      </div>

      <div className="controls">
        <div className="scenario-controls">
          <label>Usage Scenario:</label>
          <select 
            value={selectedScenario} 
            onChange={(e) => setSelectedScenario(e.target.value)}
          >
            {Object.entries(usageScenarios).map(([key, scenario]) => (
              <option key={key} value={key}>{scenario.name}</option>
            ))}
          </select>
        </div>

        <div className="timeframe-controls">
          <label>Timeframe:</label>
          <select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value as 'monthly' | 'annual')}
          >
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </select>
        </div>

        <div className="total-fees">
          <span className="label">Total {timeframe === 'monthly' ? 'Monthly' : 'Annual'} Fees:</span>
          <span className="amount">{formatCurrency(totalFees)}</span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="fee-visualization">
          <div className="chart-section">
            <h3>Fee Distribution</h3>
            <div className="chart-container">
              {renderPieChart()}
            </div>
          </div>

          <div className="breakdown-section">
            <h3>Detailed Breakdown</h3>
            {renderFeeBreakdown()}
          </div>
        </div>

        <div className="scenario-comparison">
          <h3>Usage Scenario Comparison</h3>
          <div className="chart-container">
            {renderComparisonChart()}
          </div>
        </div>

        <div className="fee-insights">
          <h3>Fee Analysis Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>💳 Annual Fee Impact</h4>
              <p>
                Annual fees are fixed costs that apply regardless of usage. 
                Consider if the card's benefits outweigh this guaranteed expense.
              </p>
            </div>
            <div className="insight-card">
              <h4>🌍 Foreign Transaction Fees</h4>
              <p>
                These fees add up quickly for international purchases. 
                Look for cards with no foreign transaction fees if you travel frequently.
              </p>
            </div>
            <div className="insight-card">
              <h4>🔄 Balance Transfer Strategy</h4>
              <p>
                Calculate if the transfer fee is worth the interest savings. 
                Typically worthwhile if you can pay off the balance during a promotional period.
              </p>
            </div>
            <div className="insight-card">
              <h4>💰 Cash Advance Costs</h4>
              <p>
                Cash advances have both upfront fees and higher APRs. 
                They should be used only in true emergencies.
              </p>
            </div>
            <div className="insight-card">
              <h4>⚠️ Penalty Fee Avoidance</h4>
              <p>
                Late and overlimit fees are easily avoidable with proper account management 
                and automated payments.
              </p>
            </div>
            <div className="insight-card">
              <h4>📊 Total Cost Analysis</h4>
              <p>
                Consider all potential fees when comparing credit cards. 
                Your usage patterns determine which fees will impact you most.
              </p>
            </div>
          </div>
        </div>

        <div className="fee-structure-editor">
          <h3>Customize Fee Structure</h3>
          <div className="editor-grid">
            <div className="fee-input">
              <label>Annual Fee ($)</label>
              <input
                type="number"
                value={feeStructure.annualFee}
                onChange={(e) => setFeeStructure(prev => ({ ...prev, annualFee: Number(e.target.value) }))}
              />
            </div>
            <div className="fee-input">
              <label>Foreign Transaction Fee (%)</label>
              <input
                type="number"
                step="0.1"
                value={feeStructure.foreignTransactionFee}
                onChange={(e) => setFeeStructure(prev => ({ ...prev, foreignTransactionFee: Number(e.target.value) }))}
              />
            </div>
            <div className="fee-input">
              <label>Balance Transfer Fee (%)</label>
              <input
                type="number"
                step="0.1"
                value={feeStructure.balanceTransferFee}
                onChange={(e) => setFeeStructure(prev => ({ ...prev, balanceTransferFee: Number(e.target.value) }))}
              />
            </div>
            <div className="fee-input">
              <label>Cash Advance Fee (%)</label>
              <input
                type="number"
                step="0.1"
                value={feeStructure.cashAdvanceFee}
                onChange={(e) => setFeeStructure(prev => ({ ...prev, cashAdvanceFee: Number(e.target.value) }))}
              />
            </div>
            <div className="fee-input">
              <label>Late Payment Fee ($)</label>
              <input
                type="number"
                value={feeStructure.lateFee}
                onChange={(e) => setFeeStructure(prev => ({ ...prev, lateFee: Number(e.target.value) }))}
              />
            </div>
            <div className="fee-input">
              <label>Overlimit Fee ($)</label>
              <input
                type="number"
                value={feeStructure.overlimitFee}
                onChange={(e) => setFeeStructure(prev => ({ ...prev, overlimitFee: Number(e.target.value) }))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeAnalysisDashboard;
