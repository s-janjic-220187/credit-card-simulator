import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useI18n } from "../../contexts/I18nContext";
import { useUser } from "../../contexts/UserContext";
import { creditCardService } from "../../services/creditCardService";
import { CreditCard } from "../../types";
import BudgetPlanner from "./BudgetPlanner";
import SpendingAnalyticsDashboard from "./SpendingAnalyticsDashboard";
import TransactionForm from "./TransactionForm";
import TransactionSearch from "./TransactionSearch";
import TransactionsDashboard from "./TransactionsDashboard";

type TabType = "overview" | "search" | "analytics" | "budget" | "create";

const TransactionManagementHub: React.FC = () => {
  const { t } = useI18n();
  const { state } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    loadCreditCards();
  }, [state.user?.id]);

  const loadCreditCards = async () => {
    if (!state.user?.id) return;

    setLoading(true);
    try {
      const cards = await creditCardService.getCreditCards(state.user.id);
      setCreditCards(cards);
      if (cards.length > 0 && !selectedCardId) {
        setSelectedCardId(cards[0].id);
      }
    } catch (error) {
      console.error("Error loading credit cards:", error);
      toast.error(t.errors.generic);
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
    loadCreditCards(); // Refresh card balances
  };

  const selectedCard = creditCards.find((card) => card.id === selectedCardId);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const tabs = [
    {
      key: "overview" as TabType,
      label: t.transactions.hub.tabs.overview,
      icon: "📊",
      description: t.transactions.hub.tabs.overviewDesc,
    },
    {
      key: "search" as TabType,
      label: t.transactions.hub.tabs.search,
      icon: "🔍",
      description: t.transactions.hub.tabs.searchDesc,
    },
    {
      key: "analytics" as TabType,
      label: t.transactions.hub.tabs.analytics,
      icon: "📈",
      description: t.transactions.hub.tabs.analyticsDesc,
    },
    {
      key: "budget" as TabType,
      label: t.transactions.hub.tabs.budget,
      icon: "💰",
      description: t.transactions.hub.tabs.budgetDesc,
    },
    {
      key: "create" as TabType,
      label: t.transactions.hub.tabs.create,
      icon: "➕",
      description: t.transactions.hub.tabs.createDesc,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">{t.common.loading}</div>
      </div>
    );
  }

  if (creditCards.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💳</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t.transactions.hub.noCards}
          </h2>
          <p className="text-gray-600 mb-6">{t.transactions.hub.noCardsDesc}</p>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {t.transactions.hub.goToDashboard}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                💳 {t.transactions.hub.title}
              </h1>
              <p className="text-gray-600 mt-1">
                {t.transactions.hub.subtitle}
              </p>
            </div>

            {/* Card Selector */}
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.transactions.selectCard}
                </label>
                <select
                  value={selectedCardId}
                  onChange={(e) => setSelectedCardId(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {creditCards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.cardholderName} (••••{card.cardNumber.slice(-4)})
                    </option>
                  ))}
                </select>
              </div>

              {selectedCard && (
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {t.common.balance}
                  </div>
                  <div
                    className={`text-lg font-semibold ${
                      selectedCard.currentBalance > 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {formatCurrency(selectedCard.currentBalance)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {t.transactions.hub.availableCredit}:{" "}
                    {formatCurrency(
                      selectedCard.creditLimit - selectedCard.currentBalance
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2 text-lg">{tab.icon}</span>
                <div className="text-left">
                  <div>{tab.label}</div>
                  <div className="text-xs text-gray-400 hidden lg:block">
                    {tab.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "overview" && selectedCardId && (
          <div className="space-y-8">
            <TransactionsDashboard
              creditCardId={selectedCardId}
              creditCardName={selectedCard?.cardholderName}
              showAddButton={true}
              maxDisplayed={10}
              key={`overview-${refreshTrigger}`}
            />

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                {t.transactions.hub.quickActions}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab("create")}
                  className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <div className="text-2xl mr-3">➕</div>
                  <div className="text-left">
                    <div className="font-medium text-blue-900">
                      {t.transactions.hub.addTransaction}
                    </div>
                    <div className="text-sm text-blue-700">
                      {t.transactions.hub.addTransactionDesc}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("search")}
                  className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <div className="text-2xl mr-3">🔍</div>
                  <div className="text-left">
                    <div className="font-medium text-green-900">
                      {t.transactions.hub.searchTransactions}
                    </div>
                    <div className="text-sm text-green-700">
                      {t.transactions.hub.searchTransactionsDesc}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("analytics")}
                  className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <div className="text-2xl mr-3">📈</div>
                  <div className="text-left">
                    <div className="font-medium text-purple-900">
                      {t.transactions.hub.viewAnalytics}
                    </div>
                    <div className="text-sm text-purple-700">
                      {t.transactions.hub.viewAnalyticsDesc}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("budget")}
                  className="flex items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                >
                  <div className="text-2xl mr-3">💰</div>
                  <div className="text-left">
                    <div className="font-medium text-orange-900">
                      {t.transactions.hub.manageBudget}
                    </div>
                    <div className="text-sm text-orange-700">
                      {t.transactions.hub.manageBudgetDesc}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "search" && selectedCardId && (
          <TransactionSearch creditCardId={selectedCardId} maxResults={100} />
        )}

        {activeTab === "analytics" && selectedCardId && (
          <SpendingAnalyticsDashboard
            creditCardId={selectedCardId}
            timeRange={90}
          />
        )}

        {activeTab === "budget" && selectedCardId && (
          <BudgetPlanner creditCardId={selectedCardId} />
        )}

        {activeTab === "create" && selectedCardId && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  ➕ {t.transactions.hub.createTransaction}
                </h2>
                <p className="text-gray-600">
                  {t.transactions.hub.createTransactionDesc}
                </p>
              </div>

              <TransactionForm
                creditCardId={selectedCardId}
                onSuccess={() => {
                  handleTransactionSuccess();
                  setActiveTab("overview");
                  toast.success(t.transactions.hub.transactionCreated);
                }}
                onCancel={() => setActiveTab("overview")}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              {t.transactions.hub.managingCard}:{" "}
              <strong>
                {selectedCard?.cardholderName || "No card selected"}
              </strong>
            </div>
            <div className="flex gap-6">
              <span>
                {t.transactions.hub.currentBalance}:{" "}
                <strong
                  className={
                    selectedCard && selectedCard.currentBalance > 0
                      ? "text-red-600"
                      : "text-green-600"
                  }
                >
                  {selectedCard
                    ? formatCurrency(selectedCard.currentBalance)
                    : "$0.00"}
                </strong>
              </span>
              <span>
                {t.transactions.hub.creditLimit}:{" "}
                <strong>
                  {selectedCard
                    ? formatCurrency(selectedCard.creditLimit)
                    : "$0.00"}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionManagementHub;
