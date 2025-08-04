import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useI18n } from "../../contexts/I18nContext";
import "./PaymentImpactVisualizer.css";

interface PaymentImpactVisualizerProps {
  initialBalance?: number;
  apr?: number;
  minimumPayment?: number;
}

interface PaymentImpactData {
  month: number;
  minimumPaymentBalance: number;
  doublePaymentBalance: number;
  triplePaymentBalance: number;
  minimumInterest: number;
  doubleInterest: number;
  tripleInterest: number;
  savingsVsMinimum: number;
}

interface PaymentScenario {
  name: string;
  monthlyPayment: number;
  totalMonths: number;
  totalInterest: number;
  color: string;
}

const PaymentImpactVisualizer: React.FC<PaymentImpactVisualizerProps> = ({
  initialBalance = 5000,
  apr = 24.99,
  minimumPayment = 150,
}) => {
  const { t } = useI18n();
  const [paymentData, setPaymentData] = useState<PaymentImpactData[]>([]);
  const [scenarios, setScenarios] = useState<PaymentScenario[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<number>(250);
  const [viewType, setViewType] = useState<
    "balance" | "interest" | "comparison" | "savings"
  >("balance");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    calculatePaymentImpact();
  }, [initialBalance, apr, minimumPayment, selectedPayment]);

  const calculatePaymentImpact = () => {
    setLoading(true);

    const monthlyRate = apr / 12 / 100;
    const data: PaymentImpactData[] = [];

    // Three scenarios: minimum, double, triple payments
    const payments = [
      minimumPayment,
      minimumPayment * 2,
      minimumPayment * 3,
      selectedPayment,
    ];

    const scenarioData = payments.map((payment) => {
      let balance = initialBalance;
      let totalInterest = 0;
      let months = 0;
      const monthlyData = [];

      while (balance > 0.01 && months < 360) {
        // Cap at 30 years
        const interestCharge = balance * monthlyRate;
        const principalPayment = Math.min(payment - interestCharge, balance);

        if (principalPayment <= 0) {
          // Payment doesn't cover interest
          balance += interestCharge;
          totalInterest += interestCharge;
        } else {
          balance -= principalPayment;
          totalInterest += interestCharge;
        }

        monthlyData.push({
          month: months + 1,
          balance: Math.round(balance * 100) / 100,
          interestPaid: Math.round(interestCharge * 100) / 100,
          cumulativeInterest: Math.round(totalInterest * 100) / 100,
        });

        months++;
      }

      return {
        payment,
        months,
        totalInterest: Math.round(totalInterest * 100) / 100,
        monthlyData,
      };
    });

    // Create combined monthly data for visualization
    const maxMonths = Math.max(...scenarioData.map((s) => s.months));
    for (let month = 1; month <= Math.min(maxMonths, 120); month++) {
      const monthData: PaymentImpactData = {
        month,
        minimumPaymentBalance:
          scenarioData[0].monthlyData[month - 1]?.balance || 0,
        doublePaymentBalance:
          scenarioData[1].monthlyData[month - 1]?.balance || 0,
        triplePaymentBalance:
          scenarioData[2].monthlyData[month - 1]?.balance || 0,
        minimumInterest:
          scenarioData[0].monthlyData[month - 1]?.cumulativeInterest ||
          scenarioData[0].totalInterest,
        doubleInterest:
          scenarioData[1].monthlyData[month - 1]?.cumulativeInterest ||
          scenarioData[1].totalInterest,
        tripleInterest:
          scenarioData[2].monthlyData[month - 1]?.cumulativeInterest ||
          scenarioData[2].totalInterest,
        savingsVsMinimum: Math.max(
          0,
          (scenarioData[0].monthlyData[month - 1]?.cumulativeInterest ||
            scenarioData[0].totalInterest) -
            (scenarioData[1].monthlyData[month - 1]?.cumulativeInterest ||
              scenarioData[1].totalInterest)
        ),
      };
      data.push(monthData);
    }

    // Create scenario summaries
    const scenarioSummaries: PaymentScenario[] = [
      {
        name: t.visualizations.paymentImpact.scenarios.minimumPayment,
        monthlyPayment: minimumPayment,
        totalMonths: scenarioData[0].months,
        totalInterest: scenarioData[0].totalInterest,
        color: "#ff6b6b",
      },
      {
        name: `2x ${t.visualizations.paymentImpact.scenarios.minimumPayment}`,
        monthlyPayment: minimumPayment * 2,
        totalMonths: scenarioData[1].months,
        totalInterest: scenarioData[1].totalInterest,
        color: "#4ecdc4",
      },
      {
        name: `3x ${t.visualizations.paymentImpact.scenarios.minimumPayment}`,
        monthlyPayment: minimumPayment * 3,
        totalMonths: scenarioData[2].months,
        totalInterest: scenarioData[2].totalInterest,
        color: "#45b7d1",
      },
    ];

    if (
      selectedPayment !== minimumPayment &&
      selectedPayment !== minimumPayment * 2 &&
      selectedPayment !== minimumPayment * 3
    ) {
      scenarioSummaries.push({
        name: `$${selectedPayment}/month`,
        monthlyPayment: selectedPayment,
        totalMonths: scenarioData[3].months,
        totalInterest: scenarioData[3].totalInterest,
        color: "#96ceb4",
      });
    }

    setPaymentData(data);
    setScenarios(scenarioSummaries);
    setLoading(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatMonth = (month: number) => {
    const years = Math.floor(month / 12);
    const months = month % 12;
    if (years === 0) return `${months}mo`;
    if (months === 0) return `${years}yr`;
    return `${years}yr ${months}mo`;
  };

  const renderBalanceChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={paymentData}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis
          dataKey="month"
          tickFormatter={formatMonth}
          label={{ value: "Time", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          tickFormatter={(value) => formatCurrency(value)}
          label={{
            value: "Remaining Balance ($)",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            formatCurrency(value),
            name,
          ]}
          labelFormatter={(month: number) =>
            `Month ${month} (${formatMonth(month)})`
          }
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="minimumPaymentBalance"
          stroke="#ff6b6b"
          strokeWidth={3}
          name={t.visualizations.paymentImpact.scenarios.minimumPayment}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="doublePaymentBalance"
          stroke="#4ecdc4"
          strokeWidth={3}
          name={`2x ${t.visualizations.paymentImpact.scenarios.minimumPayment}`}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="triplePaymentBalance"
          stroke="#45b7d1"
          strokeWidth={3}
          name={`3x ${t.visualizations.paymentImpact.scenarios.minimumPayment}`}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderInterestChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={paymentData}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis
          dataKey="month"
          tickFormatter={formatMonth}
          label={{ value: "Time", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          tickFormatter={(value) => formatCurrency(value)}
          label={{
            value: "Cumulative Interest ($)",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            formatCurrency(value),
            name,
          ]}
          labelFormatter={(month: number) =>
            `Month ${month} (${formatMonth(month)})`
          }
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="minimumInterest"
          stackId="1"
          stroke="#ff6b6b"
          fill="#ff6b6b"
          fillOpacity={0.6}
          name={`${t.visualizations.paymentImpact.scenarios.minimumPayment} ${t.visualizations.paymentImpact.savings.interestSavings}`}
        />
        <Area
          type="monotone"
          dataKey="doubleInterest"
          stackId="2"
          stroke="#4ecdc4"
          fill="#4ecdc4"
          fillOpacity={0.6}
          name={`2x ${t.visualizations.paymentImpact.scenarios.minimumPayment} ${t.visualizations.paymentImpact.savings.interestSavings}`}
        />
        <Area
          type="monotone"
          dataKey="tripleInterest"
          stackId="3"
          stroke="#45b7d1"
          fill="#45b7d1"
          fillOpacity={0.6}
          name={`3x ${t.visualizations.paymentImpact.scenarios.minimumPayment} ${t.visualizations.paymentImpact.savings.interestSavings}`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderComparisonChart = () => {
    const comparisonData = scenarios.map((scenario) => ({
      name: scenario.name,
      totalInterest: scenario.totalInterest,
      payoffTime: scenario.totalMonths,
      totalCost: initialBalance + scenario.totalInterest,
    }));

    return (
      <div className="comparison-charts">
        <div className="chart-container">
          <h4>
            {t.visualization.paymentImpact.charts.totalInterestComparison}
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="totalInterest" fill="#ff6b6b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h4>{t.visualization.paymentImpact.charts.payoffTimeComparison}</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatMonth} />
              <Tooltip labelFormatter={(value) => formatMonth(Number(value))} />
              <Bar dataKey="payoffTime" fill="#4ecdc4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderSavingsChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={paymentData}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis
          dataKey="month"
          tickFormatter={formatMonth}
          label={{ value: "Time", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          tickFormatter={(value) => formatCurrency(value)}
          label={{
            value: "Interest Savings ($)",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip
          formatter={(value: number) => [
            formatCurrency(value),
            t.visualizations.paymentImpact.charts.interestSavings,
          ]}
          labelFormatter={(month: number) =>
            `Month ${month} (${formatMonth(month)})`
          }
        />
        <Area
          type="monotone"
          dataKey="savingsVsMinimum"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.6}
          name={t.visualizations.paymentImpact.savings.interestSavings}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  if (loading) {
    return (
      <div className="loading">
        {t.visualizations.paymentImpact.calculating}
      </div>
    );
  }

  return (
    <div className="payment-impact-visualizer">
      <div className="visualizer-header">
        <h2>{t.visualization.paymentImpact.title}</h2>
        <p>
          See how different payment amounts dramatically affect your debt payoff
          journey
        </p>
      </div>

      <div className="controls">
        <div className="payment-input">
          <label>
            Custom Payment Amount:
            <input
              type="number"
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(Number(e.target.value))}
              min={minimumPayment}
              step="25"
            />
          </label>
        </div>

        <div className="view-controls">
          <label>{t.visualization.paymentImpact.labels.viewType}</label>
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value as any)}
          >
            <option value="balance">
              {t.visualization.paymentImpact.viewTypes.balance}
            </option>
            <option value="interest">
              {t.visualization.paymentImpact.viewTypes.interest}
            </option>
            <option value="comparison">
              {t.visualization.paymentImpact.viewTypes.comparison}
            </option>
            <option value="savings">
              {t.visualization.paymentImpact.viewTypes.savings}
            </option>
          </select>
        </div>
      </div>

      <div className="chart-display">
        {viewType === "balance" && renderBalanceChart()}
        {viewType === "interest" && renderInterestChart()}
        {viewType === "comparison" && renderComparisonChart()}
        {viewType === "savings" && renderSavingsChart()}
      </div>

      <div className="scenarios-summary">
        <h3>{t.visualization.paymentImpact.summary.title}</h3>
        <div className="scenarios-grid">
          {scenarios.map((scenario) => (
            <div key={scenario.name} className="scenario-card">
              <h4 style={{ color: scenario.color }}>{scenario.name}</h4>
              <div className="scenario-details">
                <p>
                  <strong>
                    {t.visualization.paymentImpact.labels.monthlyPayment}
                  </strong>{" "}
                  {formatCurrency(scenario.monthlyPayment)}
                </p>
                <p>
                  <strong>
                    {t.visualization.paymentImpact.labels.payoffTime}
                  </strong>{" "}
                  {formatMonth(scenario.totalMonths)}
                </p>
                <p>
                  <strong>
                    {t.visualization.paymentImpact.labels.totalInterest}
                  </strong>{" "}
                  {formatCurrency(scenario.totalInterest)}
                </p>
                <p>
                  <strong>
                    {t.visualization.paymentImpact.labels.totalCost}
                  </strong>{" "}
                  {formatCurrency(initialBalance + scenario.totalInterest)}
                </p>
                {scenario.name !== "Minimum Payment" && (
                  <div className="savings-highlight">
                    <p>
                      <strong>
                        {t.visualization.paymentImpact.labels.savingsVsMinimum}
                      </strong>
                    </p>
                    <p className="savings-amount">
                      {formatCurrency(
                        scenarios[0].totalInterest - scenario.totalInterest
                      )}
                    </p>
                    <p className="time-saved">
                      {formatMonth(
                        scenarios[0].totalMonths - scenario.totalMonths
                      )}{" "}
                      faster
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="insights">
        <h3>{t.visualization.paymentImpact.summary.keyInsights}</h3>
        <div className="insights-list">
          <div className="insight">
            <h4>🚀 Payment Power</h4>
            <p>
              Doubling your minimum payment can cut your payoff time in half and
              save thousands in interest charges.
            </p>
          </div>
          <div className="insight">
            <h4>⏰ Time Value</h4>
            <p>
              Early payments have exponential impact - every extra dollar today
              saves multiple dollars in future interest.
            </p>
          </div>
          <div className="insight">
            <h4>📈 Compound Effect</h4>
            <p>
              Small increases in payment amount create disproportionately large
              savings due to reduced interest compounding.
            </p>
          </div>
          <div className="insight">
            <h4>💡 Strategy Tip</h4>
            <p>
              Even paying an extra $25-50 per month can save hundreds or
              thousands in total interest over the life of the debt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentImpactVisualizer;
