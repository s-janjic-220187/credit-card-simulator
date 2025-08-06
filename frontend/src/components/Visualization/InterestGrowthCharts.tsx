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
import "./InterestGrowthCharts.css";

interface InterestGrowthChartsProps {
  cardId?: string;
  initialBalance?: number;
  apr?: number;
  minimumPayment?: number;
}

interface ChartData {
  month: number;
  balance: number;
  totalInterestPaid: number;
  cumulativeInterest: number;
  principalPaid: number;
  monthlyInterest: number;
}

interface PayoffScenario {
  name: string;
  monthlyPayment: number;
  data: ChartData[];
  totalInterest: number;
  payoffTime: number;
  color: string;
}

const InterestGrowthCharts: React.FC<InterestGrowthChartsProps> = ({
  cardId: _cardId,
  initialBalance = 5000,
  apr = 24.99,
  minimumPayment = 150,
}) => {
  const { t } = useI18n();
  const [scenarios, setScenarios] = useState<PayoffScenario[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<string>("minimum");
  const [customPayment, setCustomPayment] = useState<number>(200);
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState<
    "balance" | "interest" | "comparison"
  >("balance");

  useEffect(() => {
    calculateScenarios();
  }, [initialBalance, apr, minimumPayment, customPayment]);

  const calculateScenarios = () => {
    setLoading(true);

    const monthlyRate = apr / 12 / 100;
    const scenarioConfigs = [
      {
        name: t.visualizations.interestGrowth.minimumPayment,
        payment: minimumPayment,
        color: "#ff6b6b",
      },
      {
        name: t.visualizations.interestGrowth.customPayment,
        payment: customPayment,
        color: "#4ecdc4",
      },
      {
        name: `2x ${t.visualizations.interestGrowth.minimumPayment}`,
        payment: minimumPayment * 2,
        color: "#45b7d1",
      },
      {
        name: `3x ${t.visualizations.interestGrowth.minimumPayment}`,
        payment: minimumPayment * 3,
        color: "#96ceb4",
      },
    ];

    const calculatedScenarios: PayoffScenario[] = scenarioConfigs.map(
      (config) => {
        const data = calculatePayoffData(
          initialBalance,
          config.payment,
          monthlyRate
        );
        return {
          name: config.name,
          monthlyPayment: config.payment,
          color: config.color,
          data,
          totalInterest: data[data.length - 1]?.cumulativeInterest || 0,
          payoffTime: data.length,
        };
      }
    );

    setScenarios(calculatedScenarios);
    setLoading(false);
  };

  const calculatePayoffData = (
    balance: number,
    payment: number,
    monthlyRate: number
  ): ChartData[] => {
    const data: ChartData[] = [];
    let currentBalance = balance;
    let cumulativeInterest = 0;
    let month = 0;

    // Cap at 600 months to prevent infinite loops
    while (currentBalance > 0.01 && month < 600) {
      const monthlyInterest = currentBalance * monthlyRate;
      const principalPayment = Math.min(
        payment - monthlyInterest,
        currentBalance
      );

      if (principalPayment <= 0) {
        // Payment doesn't cover interest - balance will grow
        currentBalance += monthlyInterest;
        cumulativeInterest += monthlyInterest;

        data.push({
          month: month + 1,
          balance: Math.round(currentBalance * 100) / 100,
          totalInterestPaid: Math.round(monthlyInterest * 100) / 100,
          cumulativeInterest: Math.round(cumulativeInterest * 100) / 100,
          principalPaid: 0,
          monthlyInterest: Math.round(monthlyInterest * 100) / 100,
        });

        month++;
        if (month > 120) break; // Stop at 10 years for growing balances
        continue;
      }

      currentBalance -= principalPayment;
      cumulativeInterest += monthlyInterest;

      data.push({
        month: month + 1,
        balance: Math.round(currentBalance * 100) / 100,
        totalInterestPaid: Math.round(monthlyInterest * 100) / 100,
        cumulativeInterest: Math.round(cumulativeInterest * 100) / 100,
        principalPaid: Math.round(principalPayment * 100) / 100,
        monthlyInterest: Math.round(monthlyInterest * 100) / 100,
      });

      month++;
    }

    return data;
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

  const getSelectedScenarioData = () => {
    const scenario = scenarios.find((s) =>
      s.name.toLowerCase().includes(selectedScenario)
    );
    return scenario?.data || [];
  };

  const renderBalanceChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={getSelectedScenarioData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickFormatter={formatMonth}
          label={{ value: t.common.time, position: "insideBottom", offset: -5 }}
        />
        <YAxis
          tickFormatter={(value) => formatCurrency(value)}
          label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }}
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
          dataKey="balance"
          stackId="1"
          stroke="#ff6b6b"
          fill="#ff6b6b"
          fillOpacity={0.6}
          name={t.visualizations.interestGrowth.remainingBalance}
        />
        <Area
          type="monotone"
          dataKey="cumulativeInterest"
          stackId="2"
          stroke="#ffa726"
          fill="#ffa726"
          fillOpacity={0.6}
          name={t.visualizations.interestGrowth.cumulativeInterest}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderInterestChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={getSelectedScenarioData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickFormatter={formatMonth}
          label={{ value: t.common.time, position: "insideBottom", offset: -5 }}
        />
        <YAxis
          tickFormatter={(value) => formatCurrency(value)}
          label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }}
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
          dataKey="monthlyInterest"
          stroke="#ff6b6b"
          strokeWidth={2}
          name={t.visualizations.interestGrowth.monthlyInterest}
        />
        <Line
          type="monotone"
          dataKey="cumulativeInterest"
          stroke="#4ecdc4"
          strokeWidth={2}
          name={t.visualizations.interestGrowth.cumulativeInterest}
        />
        <Line
          type="monotone"
          dataKey="principalPaid"
          stroke="#45b7d1"
          strokeWidth={2}
          name={t.visualizations.interestGrowth.monthlyPrincipal}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderComparisonChart = () => {
    // Prepare data for comparison - take data up to the shortest payoff time
    const maxLength = Math.min(...scenarios.map((s) => s.data.length));
    const comparisonData = [];

    for (let month = 1; month <= maxLength; month++) {
      const dataPoint: any = { month };
      scenarios.forEach((scenario) => {
        const monthData = scenario.data.find((d) => d.month === month);
        if (monthData) {
          dataPoint[`${scenario.name}_balance`] = monthData.balance;
          dataPoint[`${scenario.name}_interest`] = monthData.cumulativeInterest;
        }
      });
      comparisonData.push(dataPoint);
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={comparisonData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickFormatter={formatMonth}
            label={{
              value: t.common.time,
              position: "insideBottom",
              offset: -5,
            }}
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
          {scenarios.map((scenario) => (
            <Line
              key={scenario.name}
              type="monotone"
              dataKey={`${scenario.name}_balance`}
              stroke={scenario.color}
              strokeWidth={2}
              name={`${scenario.name} Balance`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderSummaryChart = () => {
    const summaryData = scenarios.map((scenario) => ({
      name: scenario.name,
      totalInterest: scenario.totalInterest,
      payoffTime: scenario.payoffTime,
      monthlyPayment: scenario.monthlyPayment,
    }));

    return (
      <div className="summary-charts">
        <div className="chart-container">
          <h4>
            {t.visualization.interestGrowth.charts.totalInterestComparison}
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Bar dataKey="totalInterest" fill="#ff6b6b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h4>{t.visualization.interestGrowth.charts.payoffTimeComparison}</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summaryData}>
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

  if (loading) {
    return (
      <div className="loading">{t.visualization.interestGrowth.loading}</div>
    );
  }

  return (
    <div className="interest-growth-charts">
      <div className="charts-header">
        <h2>{t.visualization.interestGrowth.title}</h2>
        <p>
          Visualize how different payment strategies affect your debt payoff
          journey
        </p>
      </div>

      <div className="controls">
        <div className="payment-controls">
          <label>
            Custom Payment Amount:
            <input
              type="number"
              value={customPayment}
              onChange={(e) => setCustomPayment(Number(e.target.value))}
              min={minimumPayment}
              step="25"
            />
          </label>
        </div>

        <div className="chart-type-controls">
          <label>{t.visualization.interestGrowth.labels.chartType}</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as any)}
          >
            <option value="balance">
              {t.visualization.interestGrowth.chartTypes.balance}
            </option>
            <option value="interest">
              {t.visualization.interestGrowth.chartTypes.interest}
            </option>
            <option value="comparison">
              {t.visualization.interestGrowth.chartTypes.comparison}
            </option>
          </select>
        </div>

        {(chartType === "balance" || chartType === "interest") && (
          <div className="scenario-controls">
            <label>{t.visualization.interestGrowth.labels.scenario}</label>
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
            >
              <option value="minimum">
                {t.visualization.interestGrowth.scenarios.minimum}
              </option>
              <option value="custom">
                {t.visualization.interestGrowth.scenarios.custom}
              </option>
              <option value="2x">
                {t.components.visualizations.interestGrowth.doubleMinimum}
              </option>
              <option value="3x">
                {t.components.visualizations.interestGrowth.tripleMinimum}
              </option>
            </select>
          </div>
        )}
      </div>

      <div className="chart-display">
        {chartType === "balance" && renderBalanceChart()}
        {chartType === "interest" && renderInterestChart()}
        {chartType === "comparison" && renderComparisonChart()}
      </div>

      <div className="scenarios-summary">
        <h3>{t.visualization.interestGrowth.summary.title}</h3>
        <div className="scenarios-grid">
          {scenarios.map((scenario) => (
            <div key={scenario.name} className="scenario-card">
              <h4 style={{ color: scenario.color }}>{scenario.name}</h4>
              <div className="scenario-details">
                <p>
                  <strong>
                    {t.visualization.interestGrowth.labels.monthlyPayment}
                  </strong>{" "}
                  {formatCurrency(scenario.monthlyPayment)}
                </p>
                <p>
                  <strong>
                    {t.visualization.interestGrowth.labels.payoffTime}
                  </strong>{" "}
                  {formatMonth(scenario.payoffTime)}
                </p>
                <p>
                  <strong>
                    {t.visualization.interestGrowth.labels.totalInterest}
                  </strong>{" "}
                  {formatCurrency(scenario.totalInterest)}
                </p>
                <p>
                  <strong>
                    {t.visualization.interestGrowth.labels.totalCost}
                  </strong>{" "}
                  {formatCurrency(initialBalance + scenario.totalInterest)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {renderSummaryChart()}

      <div className="insights">
        <h3>{t.visualization.interestGrowth.summary.keyInsights}</h3>
        <div className="insights-list">
          <div className="insight">
            <h4>{t.components.visualizations.interestGrowth.paymentImpact}</h4>
            <p>
              {t.components.visualizations.interestGrowth.paymentImpactDesc}
            </p>
          </div>
          <div className="insight">
            <h4>
              {t.components.visualizations.interestGrowth.interestCompounds}
            </h4>
            <p>
              {t.components.visualizations.interestGrowth.interestCompoundsDesc}
            </p>
          </div>
          <div className="insight">
            <h4>{t.components.visualizations.interestGrowth.timeValue}</h4>
            <p>{t.components.visualizations.interestGrowth.timeValueDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestGrowthCharts;
