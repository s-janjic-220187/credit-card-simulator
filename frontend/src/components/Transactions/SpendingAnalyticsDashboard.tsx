import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useI18n } from "../../contexts/I18nContext";
import { transactionService } from "../../services/transactionService";

interface SpendingAnalyticsProps {
  creditCardId: string;
  timeRange?: number; // days
}

interface CategorySpending {
  category: string;
  amount: number;
  count: number;
  percentage: number;
  color: string;
}

interface MonthlySpending {
  month: string;
  spending: number;
  payments: number;
  netChange: number;
}

interface SpendingTrends {
  totalSpent: number;
  totalPayments: number;
  netChange: number;
  averageTransaction: number;
  categoryBreakdown: CategorySpending[];
  monthlyTrends: MonthlySpending[];
  topMerchants: Array<{ merchant: string; amount: number; count: number }>;
  spendingGoals: {
    monthlyBudget: number;
    currentSpending: number;
    remainingBudget: number;
    daysLeft: number;
  };
}

const SpendingAnalyticsDashboard: React.FC<SpendingAnalyticsProps> = ({
  creditCardId,
  timeRange = 90,
}) => {
  const { t } = useI18n();
  const [analytics, setAnalytics] = useState<SpendingTrends | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<
    "overview" | "categories" | "trends" | "goals"
  >("overview");

  const categoryColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E9",
  ];

  useEffect(() => {
    loadSpendingAnalytics();
  }, [creditCardId, timeRange]);

  const loadSpendingAnalytics = async () => {
    setLoading(true);
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - timeRange);

      const data = await transactionService.getTransactionAnalytics(
        creditCardId,
        startDate.toISOString(),
        new Date().toISOString()
      );

      // Process and structure the analytics data
      const processedAnalytics = processAnalyticsData(data);
      setAnalytics(processedAnalytics);
    } catch (error) {
      console.error("Error loading spending analytics:", error);
      toast.error(t.transactions.analytics.loadFailed);
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsData = (rawData: any): SpendingTrends => {
    // Process category breakdown
    const categoryBreakdown: CategorySpending[] = Object.entries(
      rawData.byCategory || {}
    )
      .map(([category, data]: [string, any], index) => ({
        category,
        amount: data.totalAmount,
        count: data.count,
        percentage: (data.totalAmount / rawData.summary.totalAmount) * 100,
        color: categoryColors[index % categoryColors.length],
      }))
      .sort((a, b) => b.amount - a.amount);

    // Process monthly trends
    const monthlyTrends: MonthlySpending[] = Object.entries(
      rawData.byMonth || {}
    )
      .map(([month, data]: [string, any]) => ({
        month: new Date(month + "-01").toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        }),
        spending: data.totalSpent || 0,
        payments: data.totalPayments || 0,
        netChange: (data.totalSpent || 0) - (data.totalPayments || 0),
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    // Mock spending goals (this would come from user preferences)
    const monthlyBudget = 2000;
    const currentDate = new Date();
    const currentMonthSpending =
      monthlyTrends.find(
        (trend) =>
          trend.month ===
          currentDate.toLocaleDateString("en-US", {
            month: "short",
            year: "2-digit",
          })
      )?.spending || 0;

    return {
      totalSpent: rawData.summary.totalAmount || 0,
      totalPayments: rawData.summary.totalPayments || 0,
      netChange:
        (rawData.summary.totalAmount || 0) -
        (rawData.summary.totalPayments || 0),
      averageTransaction: rawData.summary.averageTransaction || 0,
      categoryBreakdown,
      monthlyTrends,
      topMerchants: rawData.topMerchants || [],
      spendingGoals: {
        monthlyBudget,
        currentSpending: currentMonthSpending,
        remainingBudget: monthlyBudget - currentMonthSpending,
        daysLeft:
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
          ).getDate() - currentDate.getDate(),
      },
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm">
              {t.transactions.analytics.totalSpent}
            </p>
            <p className="text-2xl font-bold">
              {formatCurrency(analytics?.totalSpent || 0)}
            </p>
          </div>
          <div className="text-3xl opacity-75">💳</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">
              {t.transactions.analytics.totalPayments}
            </p>
            <p className="text-2xl font-bold">
              {formatCurrency(analytics?.totalPayments || 0)}
            </p>
          </div>
          <div className="text-3xl opacity-75">💰</div>
        </div>
      </div>

      <div
        className={`bg-gradient-to-r ${
          (analytics?.netChange || 0) > 0
            ? "from-orange-500 to-red-600"
            : "from-blue-500 to-green-600"
        } text-white p-6 rounded-lg shadow-md`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-opacity-75 text-sm">
              {t.transactions.analytics.netChange}
            </p>
            <p className="text-2xl font-bold">
              {formatCurrency(analytics?.netChange || 0)}
            </p>
          </div>
          <div className="text-3xl opacity-75">
            {(analytics?.netChange || 0) > 0 ? "📈" : "📉"}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">
              {t.transactions.analytics.averageTransaction}
            </p>
            <p className="text-2xl font-bold">
              {formatCurrency(analytics?.averageTransaction || 0)}
            </p>
          </div>
          <div className="text-3xl opacity-75">📊</div>
        </div>
      </div>
    </div>
  );

  const renderCategoryBreakdown = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">
          {t.transactions.analytics.spendingByCategory}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={analytics?.categoryBreakdown || []}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ category, percentage }) =>
                `${category}: ${percentage.toFixed(1)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
            >
              {analytics?.categoryBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">
          {t.transactions.analytics.categoryDetails}
        </h3>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {analytics?.categoryBreakdown.map((category) => (
            <div
              key={category.category}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: category.color }}
                ></div>
                <div>
                  <p className="font-medium">{category.category}</p>
                  <p className="text-sm text-gray-600">
                    {category.count} transactions
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {formatCurrency(category.amount)}
                </p>
                <p className="text-sm text-gray-600">
                  {category.percentage.toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrends = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">
        {t.transactions.analytics.monthlyTrends}
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={analytics?.monthlyTrends || []}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => formatCurrency(value)} />
          <Tooltip
            formatter={(value: number, name: string) => [
              formatCurrency(value),
              name,
            ]}
          />
          <Line
            type="monotone"
            dataKey="spending"
            stroke="#FF6B6B"
            strokeWidth={3}
            name={t.transactions.analytics.spending}
          />
          <Line
            type="monotone"
            dataKey="payments"
            stroke="#4ECDC4"
            strokeWidth={3}
            name={t.transactions.analytics.payments}
          />
          <Line
            type="monotone"
            dataKey="netChange"
            stroke="#45B7D1"
            strokeWidth={3}
            name={t.transactions.analytics.netChange}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderSpendingGoals = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">
          {t.transactions.analytics.monthlyBudget}
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {t.transactions.analytics.budgetLimit}
            </span>
            <span className="font-semibold">
              {formatCurrency(analytics?.spendingGoals.monthlyBudget || 0)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {t.transactions.analytics.currentSpending}
            </span>
            <span className="font-semibold text-red-600">
              {formatCurrency(analytics?.spendingGoals.currentSpending || 0)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              {t.transactions.analytics.remainingBudget}
            </span>
            <span
              className={`font-semibold ${
                (analytics?.spendingGoals.remainingBudget || 0) > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formatCurrency(analytics?.spendingGoals.remainingBudget || 0)}
            </span>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{t.transactions.analytics.progress}</span>
              <span>
                {(
                  ((analytics?.spendingGoals.currentSpending || 0) /
                    (analytics?.spendingGoals.monthlyBudget || 1)) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  (analytics?.spendingGoals.currentSpending || 0) >
                  (analytics?.spendingGoals.monthlyBudget || 0)
                    ? "bg-red-500"
                    : (analytics?.spendingGoals.currentSpending || 0) >
                      (analytics?.spendingGoals.monthlyBudget || 0) * 0.8
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{
                  width: `${Math.min(
                    100,
                    ((analytics?.spendingGoals.currentSpending || 0) /
                      (analytics?.spendingGoals.monthlyBudget || 1)) *
                      100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">
          {t.transactions.analytics.topMerchants}
        </h3>
        <div className="space-y-3">
          {analytics?.topMerchants.slice(0, 6).map((merchant, index) => (
            <div
              key={merchant.merchant}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{merchant.merchant}</p>
                  <p className="text-sm text-gray-600">
                    {merchant.count} transactions
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {formatCurrency(merchant.amount)}
                </p>
              </div>
            </div>
          )) || (
            <p className="text-gray-500 text-center py-4">
              {t.transactions.analytics.noMerchantsData}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">
          {t.transactions.analytics.loading}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📊 {t.transactions.analytics.title}
        </h1>
        <p className="text-gray-600 mb-6">
          {t.transactions.analytics.subtitle}
        </p>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            {
              key: "overview",
              label: t.transactions.analytics.tabs.overview,
              icon: "🔍",
            },
            {
              key: "categories",
              label: t.transactions.analytics.tabs.categories,
              icon: "📊",
            },
            {
              key: "trends",
              label: t.transactions.analytics.tabs.trends,
              icon: "📈",
            },
            {
              key: "goals",
              label: t.transactions.analytics.tabs.goals,
              icon: "🎯",
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setViewMode(tab.key as any)}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                viewMode === tab.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {viewMode === "overview" && renderOverview()}
        {viewMode === "categories" && renderCategoryBreakdown()}
        {viewMode === "trends" && renderTrends()}
        {viewMode === "goals" && renderSpendingGoals()}
      </div>

      {/* Insights Panel */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-indigo-900">
          💡 {t.transactions.analytics.insights.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white rounded-lg p-4">
            <strong>{t.transactions.analytics.insights.spendingPattern}</strong>
            <p className="mt-1 text-gray-700">
              {t.transactions.analytics.insights.spendingPatternDesc}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <strong>{t.transactions.analytics.insights.budgetTracking}</strong>
            <p className="mt-1 text-gray-700">
              {t.transactions.analytics.insights.budgetTrackingDesc}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <strong>
              {t.transactions.analytics.insights.categoryOptimization}
            </strong>
            <p className="mt-1 text-gray-700">
              {t.transactions.analytics.insights.categoryOptimizationDesc}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <strong>{t.transactions.analytics.insights.trendAnalysis}</strong>
            <p className="mt-1 text-gray-700">
              {t.transactions.analytics.insights.trendAnalysisDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingAnalyticsDashboard;
