import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TransactionForm from "../components/Transactions/TransactionForm";
import TransactionsList from "../components/Transactions/TransactionsList";
import { useI18n } from "../contexts/I18nContext";
import { useUser } from "../contexts/UserContext";
import { creditCardService } from "../services/creditCardService";
import { CreditCard } from "../types";

const TransactionsPage: React.FC = () => {
  const { state } = useUser();
  const { t } = useI18n();
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loading, setLoading] = useState(true);

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
    setShowForm(false);
    setRefreshTrigger((prev) => prev + 1);
    // Reload credit cards to update balances
    loadCreditCards();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (creditCards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 mb-4">
            <svg
              className="mx-auto h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Credit Cards Found
          </h2>
          <p className="text-gray-600 mb-6">
            You need to create a credit card first before managing transactions.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Transaction Management
          </h1>
          <p className="text-gray-600">
            Manage your credit card transactions and track spending
          </p>
        </div>

        {/* Credit Card Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {t.transactions.selectCard}
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`px-4 py-2 rounded-md transition-colors ${
                showForm
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {showForm ? t.common.cancel : t.transactions.addTransaction}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {creditCards.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedCardId(card.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedCardId === card.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">
                    {card.cardholderName}
                  </h3>
                  <span className="text-sm text-gray-500">
                    ****{card.cardNumber.slice(-4)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {card.cardType}
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Balance:</span>
                  <span
                    className={
                      card.currentBalance > 0
                        ? "text-red-600 font-medium"
                        : "text-green-600"
                    }
                  >
                    {formatCurrency(card.currentBalance)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Limit:</span>
                  <span className="text-gray-900">
                    {formatCurrency(card.creditLimit)}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        card.currentBalance / card.creditLimit > 0.8
                          ? "bg-red-500"
                          : card.currentBalance / card.creditLimit > 0.6
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          (card.currentBalance / card.creditLimit) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {((card.currentBalance / card.creditLimit) * 100).toFixed(
                      1
                    )}
                    % utilized
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Form */}
        {showForm && selectedCardId && (
          <div className="mb-6">
            <TransactionForm
              creditCardId={selectedCardId}
              onSuccess={handleTransactionSuccess}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Transaction List */}
        {selectedCardId && (
          <TransactionsList
            creditCardId={selectedCardId}
            refreshTrigger={refreshTrigger}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
