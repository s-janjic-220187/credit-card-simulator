import React, { useEffect, useState } from "react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useI18n } from "../../contexts/I18nContext";
import "./FeeAnalysisDashboard.css";

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
  const { t } = useI18n();
  const [feeStructure, setFeeStructure] = useState<FeeStructure>({
    annualFee,
    foreignTransactionFee,
    balanceTransferFee,
    cashAdvanceFee,
    lateFee,
    overlimitFee,
    returnedPaymentFee: 40,
  });

  const [selectedScenario, setSelectedScenario] = useState<string>("light");
  const [feeBreakdown, setFeeBreakdown] = useState<FeeBreakdown[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [timeframe, setTimeframe] = useState<"monthly" | "annual">("annual");

  const usageScenarios: Record<string, UsageScenario> = {
    light: {
      name: t.visualizations.feeAnalysis.usageScenarios.lightUsage,
      description: "Minimal usage with good payment habits",
      transactions: {
        foreignPurchases: 500, // $500 in foreign purchases annually
        balanceTransfers: 0,
        cashAdvances: 0,
        latePayments: 0,
        overlimitOccurrences: 0,
        returnedPayments: 0,
      },
    },
    moderate: {
      name: t.visualizations.feeAnalysis.usageScenarios.moderateUsage,
      description: "Regular usage with occasional late payments",
      transactions: {
        foreignPurchases: 1200,
        balanceTransfers: 3000, // One-time $3000 balance transfer
        cashAdvances: 0,
        latePayments: 1, // One late payment per year
        overlimitOccurrences: 0,
        returnedPayments: 0,
      },
    },
    heavy: {
      name: t.visualizations.feeAnalysis.usageScenarios.heavyUsage,
      description: "Frequent usage with multiple fee-generating activities",
      transactions: {
        foreignPurchases: 2500,
        balanceTransfers: 5000,
        cashAdvances: 1000, // $1000 in cash advances
        latePayments: 3, // Three late payments per year
        overlimitOccurrences: 2, // Two overlimit occurrences
        returnedPayments: 1, // One returned payment
      },
    },
  };

  useEffect(() => {
    calculateFeeBreakdown();
    generateComparisonData();
  }, [feeStructure, selectedScenario, timeframe]);

  const calculateFeeBreakdown = () => {
    const scenario = usageScenarios[selectedScenario];
    const multiplier = timeframe === "monthly" ? 1 / 12 : 1;

    const fees = {
      annualFee: feeStructure.annualFee * multiplier,
      foreignTransactionFees:
        ((scenario.transactions.foreignPurchases *
          feeStructure.foreignTransactionFee) /
          100) *
        multiplier,
      balanceTransferFees:
        Math.max(
          (scenario.transactions.balanceTransfers *
            feeStructure.balanceTransferFee) /
            100,
          scenario.transactions.balanceTransfers > 0 ? 5 : 0
        ) * multiplier,
      cashAdvanceFees:
        Math.max(
          (scenario.transactions.cashAdvances * feeStructure.cashAdvanceFee) /
            100,
          scenario.transactions.cashAdvances > 0 ? 10 : 0
        ) * multiplier,
      lateFees:
        scenario.transactions.latePayments * feeStructure.lateFee * multiplier,
      overlimitFees:
        scenario.transactions.overlimitOccurrences *
        feeStructure.overlimitFee *
        multiplier,
      returnedPaymentFees:
        scenario.transactions.returnedPayments *
        feeStructure.returnedPaymentFee *
        multiplier,
    };

    const totalFees = Object.values(fees).reduce((sum, fee) => sum + fee, 0);

    const breakdown: FeeBreakdown[] = [
      {
        category: t.visualizations.feeAnalysis.feeTypes.annualFee,
        amount: fees.annualFee,
        percentage: (fees.annualFee / totalFees) * 100,
        color: "#ff6b6b",
      },
      {
        category: t.visualizations.feeAnalysis.feeTypes.foreignTransactionFees,
        amount: fees.foreignTransactionFees,
        percentage: (fees.foreignTransactionFees / totalFees) * 100,
        color: "#4ecdc4",
      },
      {
        category: t.visualizations.feeAnalysis.feeTypes.balanceTransferFees,
        amount: fees.balanceTransferFees,
        percentage: (fees.balanceTransferFees / totalFees) * 100,
        color: "#45b7d1",
      },
      {
        category: t.visualizations.feeAnalysis.feeTypes.cashAdvanceFees,
        amount: fees.cashAdvanceFees,
        percentage: (fees.cashAdvanceFees / totalFees) * 100,
        color: "#96ceb4",
      },
      {
        category: t.visualizations.feeAnalysis.feeTypes.latePaymentFees,
        amount: fees.lateFees,
        percentage: (fees.lateFees / totalFees) * 100,
        color: "#feca57",
      },
      {
        category: t.visualizations.feeAnalysis.feeTypes.overlimitFees,
        amount: fees.overlimitFees,
        percentage: (fees.overlimitFees / totalFees) * 100,
        color: "#ff9ff3",
      },
      {
        category: "Returned Payment Fees",
        amount: fees.returnedPaymentFees,
        percentage: (fees.returnedPaymentFees / totalFees) * 100,
        color: "#48dbfb",
      },
    ].filter((item) => item.amount > 0);

    setFeeBreakdown(breakdown);
  };

  const generateComparisonData = () => {
    const data: ComparisonData[] = Object.entries(usageScenarios).map(
      ([, scenario]) => {
        const multiplier = timeframe === "monthly" ? 1 / 12 : 1;

        const annualFees = feeStructure.annualFee * multiplier;

        const transactionFees =
          ((scenario.transactions.foreignPurchases *
            feeStructure.foreignTransactionFee) /
            100 +
            Math.max(
              (scenario.transactions.balanceTransfers *
                feeStructure.balanceTransferFee) /
                100,
              scenario.transactions.balanceTransfers > 0 ? 5 : 0
            ) +
            Math.max(
              (scenario.transactions.cashAdvances *
                feeStructure.cashAdvanceFee) /
                100,
              scenario.transactions.cashAdvances > 0 ? 10 : 0
            )) *
          multiplier;

        const penaltyFees =
          (scenario.transactions.latePayments * feeStructure.lateFee +
            scenario.transactions.overlimitOccurrences *
              feeStructure.overlimitFee +
            scenario.transactions.returnedPayments *
              feeStructure.returnedPaymentFee) *
          multiplier;

        return {
          scenario: scenario.name,
          totalFees: annualFees + transactionFees + penaltyFees,
          annualFees,
          transactionFees,
          penaltyFees,
        };
      }
    );

    setComparisonData(data);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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
            percentage > 5 ? `${category}: ${percentage.toFixed(1)}%` : ""
          }
        >
          {feeBreakdown.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [formatCurrency(value), "Amount"]}
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
        <Tooltip
          formatter={(value: number, name: string) => [
            formatCurrency(value),
            name,
          ]}
        />
        <Legend />
        <Bar
          dataKey="annualFees"
          stackId="a"
          fill="#ff6b6b"
          name={t.components.feeAnalysisDashboard.chartLabels.annualFees}
        />
        <Bar
          dataKey="transactionFees"
          stackId="a"
          fill="#4ecdc4"
          name={t.components.feeAnalysisDashboard.chartLabels.transactionFees}
        />
        <Bar
          dataKey="penaltyFees"
          stackId="a"
          fill="#feca57"
          name={t.components.feeAnalysisDashboard.chartLabels.penaltyFees}
        />
        <Line
          type="monotone"
          dataKey="totalFees"
          stroke="#8884d8"
          strokeWidth={3}
          name={t.components.feeAnalysisDashboard.chartLabels.totalFees}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );

  const renderFeeBreakdown = () => (
    <div className="fee-breakdown-list">
      {feeBreakdown.map((fee, index) => (
        <div key={index} className="fee-item">
          <div className="fee-info">
            <div
              className="fee-color"
              style={{ backgroundColor: fee.color }}
            ></div>
            <span className="fee-category">{fee.category}</span>
          </div>
          <div className="fee-amounts">
            <span className="fee-amount">{formatCurrency(fee.amount)}</span>
            <span className="fee-percentage">
              ({fee.percentage.toFixed(1)}%)
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const totalFees = feeBreakdown.reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="fee-analysis-dashboard">
      <div className="dashboard-header">
        <h2>{t.visualization.feeAnalysis.title}</h2>
        <p>
          Comprehensive analysis of credit card fee structures and their impact
        </p>
      </div>

      <div className="controls">
        <div className="scenario-controls">
          <label>{t.visualization.feeAnalysis.labels.usageScenario}</label>
          <select
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(e.target.value)}
          >
            {Object.entries(usageScenarios).map(([key, scenario]) => (
              <option key={key} value={key}>
                {scenario.name}
              </option>
            ))}
          </select>
        </div>

        <div className="timeframe-controls">
          <label>{t.visualization.feeAnalysis.labels.timeframe}</label>
          <select
            value={timeframe}
            onChange={(e) =>
              setTimeframe(e.target.value as "monthly" | "annual")
            }
          >
            <option value="monthly">
              {t.components.visualizations.feeAnalysis.monthly}
            </option>
            <option value="annual">
              {t.components.visualizations.feeAnalysis.annual}
            </option>
          </select>
        </div>

        <div className="total-fees">
          <span className="label">
            Total {timeframe === "monthly" ? "Monthly" : "Annual"} Fees:
          </span>
          <span className="amount">{formatCurrency(totalFees)}</span>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="fee-visualization">
          <div className="chart-section">
            <h3>{t.visualization.feeAnalysis.charts.feeDistribution}</h3>
            <div className="chart-container">{renderPieChart()}</div>
          </div>

          <div className="breakdown-section">
            <h3>{t.visualization.feeAnalysis.charts.detailedBreakdown}</h3>
            {renderFeeBreakdown()}
          </div>
        </div>

        <div className="scenario-comparison">
          <h3>{t.visualization.feeAnalysis.charts.usageScenarioComparison}</h3>
          <div className="chart-container">{renderComparisonChart()}</div>
        </div>

        <div className="fee-insights">
          <h3>{t.visualization.feeAnalysis.charts.feeAnalysisInsights}</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>{t.components.visualizations.feeAnalysis.annualFeeImpact}</h4>
              <p>
                {t.components.visualizations.feeAnalysis.annualFeeImpactDesc}
              </p>
            </div>
            <div className="insight">
              <h4>
                {t.components.visualizations.feeAnalysis.foreignTransactionFees}
              </h4>
              <p>
                {
                  t.components.visualizations.feeAnalysis
                    .foreignTransactionFeesDesc
                }
              </p>
            </div>
            <div className="insight">
              <h4>
                {
                  t.components.visualizations.feeAnalysis
                    .balanceTransferStrategy
                }
              </h4>
              <p>
                {
                  t.components.visualizations.feeAnalysis
                    .balanceTransferStrategyDesc
                }
              </p>
            </div>
            <div className="insight">
              <h4>
                {t.components.visualizations.feeAnalysis.cashAdvanceCosts}
              </h4>
              <p>
                {t.components.visualizations.feeAnalysis.cashAdvanceCostsDesc}
              </p>
            </div>
            <div className="insight">
              <h4>
                {t.components.visualizations.feeAnalysis.penaltyFeeAvoidance}
              </h4>
              <p>
                {
                  t.components.visualizations.feeAnalysis
                    .penaltyFeeAvoidanceDesc
                }
              </p>
            </div>
            <div className="insight">
              <h4>
                {t.components.visualizations.feeAnalysis.totalCostAnalysis}
              </h4>
              <p>
                {t.components.visualizations.feeAnalysis.totalCostAnalysisDesc}
              </p>
            </div>
          </div>
        </div>

        <div className="fee-structure-editor">
          <h3>{t.visualization.feeAnalysis.charts.customizeFeeStructure}</h3>
          <div className="editor-grid">
            <div className="fee-input">
              <label>{t.components.visualizations.feeAnalysis.annualFee}</label>
              <input
                type="number"
                value={feeStructure.annualFee}
                onChange={(e) =>
                  setFeeStructure((prev) => ({
                    ...prev,
                    annualFee: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className="fee-input">
              <label>
                {t.components.visualizations.feeAnalysis.foreignTransactionFee}
              </label>
              <input
                type="number"
                step="0.1"
                value={feeStructure.foreignTransactionFee}
                onChange={(e) =>
                  setFeeStructure((prev) => ({
                    ...prev,
                    foreignTransactionFee: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className="fee-input">
              <label>
                {t.components.visualizations.feeAnalysis.balanceTransferFee}
              </label>
              <input
                type="number"
                step="0.1"
                value={feeStructure.balanceTransferFee}
                onChange={(e) =>
                  setFeeStructure((prev) => ({
                    ...prev,
                    balanceTransferFee: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className="fee-input">
              <label>
                {t.components.visualizations.feeAnalysis.cashAdvanceFee}
              </label>
              <input
                type="number"
                step="0.1"
                value={feeStructure.cashAdvanceFee}
                onChange={(e) =>
                  setFeeStructure((prev) => ({
                    ...prev,
                    cashAdvanceFee: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className="fee-input">
              <label>
                {t.components.visualizations.feeAnalysis.latePaymentFee}
              </label>
              <input
                type="number"
                value={feeStructure.lateFee}
                onChange={(e) =>
                  setFeeStructure((prev) => ({
                    ...prev,
                    lateFee: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className="fee-input">
              <label>
                {t.components.visualizations.feeAnalysis.overlimitFee}
              </label>
              <input
                type="number"
                value={feeStructure.overlimitFee}
                onChange={(e) =>
                  setFeeStructure((prev) => ({
                    ...prev,
                    overlimitFee: Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeAnalysisDashboard;
