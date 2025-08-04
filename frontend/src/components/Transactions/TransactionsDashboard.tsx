import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useI18n } from "../../contexts/I18nContext";
import {
  Transaction,
  transactionService,
} from "../../services/transactionService";
import TransactionCard from "./TransactionCard";
import TransactionForm from "./TransactionForm";

interface TransactionsDashboardProps {
  creditCardId: string;
  creditCardName?: string;
  showAddButton?: boolean;
  maxDisplayed?: number;
}

const TransactionsDashboard: React.FC<TransactionsDashboardProps> = ({
  creditCardId,
  creditCardName = "Credit Card",
  showAddButton = true,
  maxDisplayed = 5,
}) => {
  const { t } = useI18n();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    loadTransactions();
  }, [creditCardId, refreshTrigger]);

  const loadTransactions = async () => {
    if (!creditCardId) return;

    setLoading(true);
    try {
      const data = await transactionService.getCardTransactions(
        creditCardId,
        maxDisplayed
      );
      setTransactions(data);
    } catch (error) {
      console.error("Error loading transactions:", error);
      toast.error(t.transactions.dashboard.loadFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionSuccess = () => {
    setShowForm(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    if (!window.confirm(t.transactions.dashboard.cancelConfirmation)) {
      return;
    }

    try {
      await transactionService.deleteTransaction(transactionId);
      toast.success(t.transactions.dashboard.transactionCancelled);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error(t.transactions.dashboard.cancelFailed);
    }
  };

  const calculateTotalSpent = () => {
    return transactions
      .filter(
        (t) =>
          ["PURCHASE", "FEE", "CASH_ADVANCE"].includes(t.type) &&
          t.status !== "CANCELLED"
      )
      .reduce((sum, t) => sum + t.totalAmount, 0);
  };

  const calculateTotalPayments = () => {
    return transactions
      .filter(
        (t) =>
          ["PAYMENT", "REFUND"].includes(t.type) && t.status !== "CANCELLED"
      )
      .reduce((sum, t) => sum + t.totalAmount, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (showForm) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <TransactionForm
          creditCardId={creditCardId}
          onSuccess={handleTransactionSuccess}
          onCancel={() => setShowForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {t.transactions.dashboard.recentTransactions} - {creditCardName}
          </h2>
          {showAddButton && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {t.transactions.addTransaction}
            </button>
          )}
        </div>

        {/* Transaction Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-sm text-red-600 font-medium">
              {t.transactions.dashboard.totalSpent}
            </div>
            <div className="text-lg font-semibold text-red-700">
              {formatCurrency(calculateTotalSpent())}
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-green-600 font-medium">
              {t.transactions.dashboard.totalPayments}
            </div>
            <div className="text-lg font-semibold text-green-700">
              {formatCurrency(calculateTotalPayments())}
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-blue-600 font-medium">
              {t.transactions.dashboard.netChange}
            </div>
            <div
              className={`text-lg font-semibold ${
                calculateTotalSpent() - calculateTotalPayments() > 0
                  ? "text-red-700"
                  : "text-green-700"
              }`}
            >
              {formatCurrency(calculateTotalSpent() - calculateTotalPayments())}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t.transactions.dashboard.noTransactionsYet}
            </h3>
            <p className="text-gray-500 mb-4">
              {t.transactions.dashboard.getStartedMessage}
            </p>
            {showAddButton && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                {t.transactions.dashboard.addFirstTransaction}
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onDelete={handleDeleteTransaction}
                showActions={true}
              />
            ))}

            {transactions.length >= maxDisplayed && (
              <div className="text-center pt-4">
                <p className="text-sm text-gray-500">
                  {t.transactions.dashboard.showingRecent.replace(
                    "{count}",
                    maxDisplayed.toString()
                  )}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsDashboard;
