import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import { Transaction } from "../../services/transactionService";

interface TransactionCardProps {
  transaction: Transaction;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transactionId: string) => void;
  showActions?: boolean;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  const { t } = useI18n();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "PURCHASE":
        return "🛒";
      case "PAYMENT":
        return "💳";
      case "REFUND":
        return "↩️";
      case "FEE":
        return "💰";
      case "CASH_ADVANCE":
        return "💵";
      default:
        return "📄";
    }
  };

  const getAmountColor = (type: string) => {
    return ["PAYMENT", "REFUND"].includes(type)
      ? "text-green-600"
      : "text-red-600";
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PURCHASE":
        return "bg-blue-100 text-blue-800";
      case "PAYMENT":
        return "bg-green-100 text-green-800";
      case "REFUND":
        return "bg-purple-100 text-purple-800";
      case "FEE":
        return "bg-yellow-100 text-yellow-800";
      case "CASH_ADVANCE":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "GROCERIES":
        return "bg-green-50 text-green-700";
      case "DINING":
        return "bg-red-50 text-red-700";
      case "GAS":
        return "bg-yellow-50 text-yellow-700";
      case "ENTERTAINMENT":
        return "bg-purple-50 text-purple-700";
      case "SHOPPING":
        return "bg-pink-50 text-pink-700";
      case "TRAVEL":
        return "bg-blue-50 text-blue-700";
      case "HEALTHCARE":
        return "bg-indigo-50 text-indigo-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="text-2xl mt-1">
            {getTransactionIcon(transaction.type)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-medium text-gray-900 truncate">
                {transaction.merchantName || t.transactions.unknownMerchant}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                  transaction.type
                )}`}
              >
                {t.transactions.types[
                  transaction.type as keyof typeof t.transactions.types
                ] || transaction.type}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {transaction.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full font-medium ${getCategoryColor(
                  transaction.category
                )}`}
              >
                {t.transactions.categories[
                  transaction.category as keyof typeof t.transactions.categories
                ] || transaction.category}
              </span>

              <span className="text-gray-500">
                {formatDate(transaction.timestamp)}
              </span>

              {transaction.location && (
                <span className="text-gray-500 flex items-center">
                  📍 {transaction.location}
                </span>
              )}

              {transaction.status === "CANCELLED" && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {t.transactions.statuses.CANCELLED}
                </span>
              )}

              {transaction.referenceId && (
                <span className="text-gray-400 font-mono">
                  {transaction.referenceId}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="text-right ml-4">
          <div
            className={`text-lg font-semibold ${getAmountColor(
              transaction.type
            )}`}
          >
            {["PAYMENT", "REFUND"].includes(transaction.type) ? "-" : "+"}
            {formatCurrency(transaction.totalAmount)}
          </div>

          {transaction.fees > 0 && (
            <div className="text-xs text-gray-500">
              + {formatCurrency(transaction.fees)} fees
            </div>
          )}

          {showActions &&
            transaction.status !== "CANCELLED" &&
            (onEdit || onDelete) && (
              <div className="flex space-x-2 mt-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(transaction)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="text-xs text-red-600 hover:text-red-800 font-medium"
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
