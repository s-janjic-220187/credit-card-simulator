import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useI18n } from "../../contexts/I18nContext";
import {
  Transaction,
  transactionService,
} from "../../services/transactionService";
import TransactionCard from "./TransactionCard";

interface TransactionSearchProps {
  creditCardId: string;
  maxResults?: number;
}

interface SearchFilters {
  searchTerm: string;
  type: string;
  category: string;
  amountMin: number | null;
  amountMax: number | null;
  dateFrom: string;
  dateTo: string;
  sortBy: "date" | "amount" | "merchant";
  sortOrder: "asc" | "desc";
}

const TransactionSearch: React.FC<TransactionSearchProps> = ({
  creditCardId,
  maxResults = 50,
}) => {
  const { t } = useI18n();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: "",
    type: "",
    category: "",
    amountMin: null,
    amountMax: null,
    dateFrom: "",
    dateTo: "",
    sortBy: "date",
    sortOrder: "desc",
  });

  const transactionTypes = [
    { value: "", label: t.transactions.searchFilters.allTypes },
    { value: "PURCHASE", label: t.transactions.types.PURCHASE },
    { value: "PAYMENT", label: t.transactions.types.PAYMENT },
    { value: "REFUND", label: t.transactions.types.REFUND },
    { value: "FEE", label: t.transactions.types.FEE },
    { value: "CASH_ADVANCE", label: t.transactions.types.CASH_ADVANCE },
  ];

  const transactionCategories = [
    { value: "", label: t.transactions.searchFilters.allCategories },
    { value: "GROCERIES", label: t.transactions.categories.GROCERIES },
    { value: "DINING", label: t.transactions.categories.DINING },
    { value: "GAS", label: t.transactions.categories.GAS },
    { value: "UTILITIES", label: t.transactions.categories.UTILITIES },
    { value: "ENTERTAINMENT", label: t.transactions.categories.ENTERTAINMENT },
    { value: "SHOPPING", label: t.transactions.categories.SHOPPING },
    { value: "TRAVEL", label: t.transactions.categories.TRAVEL },
    { value: "HEALTHCARE", label: t.transactions.categories.HEALTHCARE },
    { value: "EDUCATION", label: t.transactions.categories.EDUCATION },
    { value: "OTHER", label: t.transactions.categories.OTHER },
  ];

  const sortOptions = [
    { value: "date", label: t.transactions.searchFilters.sortByDate },
    { value: "amount", label: t.transactions.searchFilters.sortByAmount },
    { value: "merchant", label: t.transactions.searchFilters.sortByMerchant },
  ];

  useEffect(() => {
    loadTransactions();
  }, [creditCardId]);

  const loadTransactions = async () => {
    if (!creditCardId) return;

    setLoading(true);
    try {
      const data = await transactionService.getCardTransactions(
        creditCardId,
        maxResults
      );
      setTransactions(data);
    } catch (error) {
      console.error("Error loading transactions:", error);
      toast.error(t.transactions.searchFilters.loadFailed);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter((transaction) => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch =
          transaction.merchantName?.toLowerCase().includes(searchLower) ||
          transaction.description?.toLowerCase().includes(searchLower) ||
          transaction.location?.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Type filter
      if (filters.type && transaction.type !== filters.type) {
        return false;
      }

      // Category filter
      if (filters.category && transaction.category !== filters.category) {
        return false;
      }

      // Amount range filter
      if (
        filters.amountMin !== null &&
        transaction.amount < filters.amountMin
      ) {
        return false;
      }
      if (
        filters.amountMax !== null &&
        transaction.amount > filters.amountMax
      ) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom) {
        const transactionDate = new Date(transaction.date);
        const filterDate = new Date(filters.dateFrom);
        if (transactionDate < filterDate) return false;
      }
      if (filters.dateTo) {
        const transactionDate = new Date(transaction.date);
        const filterDate = new Date(filters.dateTo);
        if (transactionDate > filterDate) return false;
      }

      return true;
    });

    // Sort transactions
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (filters.sortBy) {
        case "date":
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case "amount":
          aValue = a.amount;
          bValue = b.amount;
          break;
        case "merchant":
          aValue = a.merchantName || "";
          bValue = b.merchantName || "";
          break;
        default:
          return 0;
      }

      if (filters.sortOrder === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return filtered;
  }, [transactions, filters]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      type: "",
      category: "",
      amountMin: null,
      amountMax: null,
      dateFrom: "",
      dateTo: "",
      sortBy: "date",
      sortOrder: "desc",
    });
  };

  const exportTransactions = () => {
    const csvContent = [
      // CSV Header
      [
        "Date",
        "Type",
        "Category",
        "Merchant",
        "Description",
        "Amount",
        "Fees",
        "Total",
        "Status",
      ].join(","),
      // CSV Data
      ...filteredAndSortedTransactions.map((t) =>
        [
          new Date(t.date).toLocaleDateString(),
          t.type,
          t.category,
          t.merchantName || "",
          t.description || "",
          t.amount.toFixed(2),
          (t.fees || 0).toFixed(2),
          t.totalAmount.toFixed(2),
          t.status,
        ].join(",")
      ),
    ].join("\\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success(t.transactions.searchFilters.exportSuccess);
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    if (!window.confirm(t.transactions.dashboard.cancelConfirmation)) {
      return;
    }

    try {
      await transactionService.deleteTransaction(transactionId);
      toast.success(t.transactions.dashboard.transactionCancelled);
      loadTransactions(); // Reload transactions
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error(t.transactions.dashboard.cancelFailed);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🔍 {t.transactions.searchFilters.title}
        </h1>
        <p className="text-gray-600 mb-6">
          {t.transactions.searchFilters.subtitle}
        </p>

        {/* Search Bar */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={t.transactions.searchFilters.searchPlaceholder}
              value={filters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg border ${
              showFilters
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300"
            } hover:bg-blue-700 hover:text-white transition-colors`}
          >
            🔧 {t.transactions.searchFilters.filters}
          </button>
          <button
            onClick={exportTransactions}
            disabled={filteredAndSortedTransactions.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            📥 {t.transactions.searchFilters.export}
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {t.transactions.searchFilters.advancedFilters}
              </h3>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {t.transactions.searchFilters.clearFilters}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.transactions.searchFilters.type}
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => updateFilter("type", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {transactionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.transactions.searchFilters.category}
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter("category", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {transactionCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.transactions.searchFilters.sortBy}
                </label>
                <div className="flex gap-2">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter("sortBy", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() =>
                      updateFilter(
                        "sortOrder",
                        filters.sortOrder === "asc" ? "desc" : "asc"
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    title={
                      filters.sortOrder === "asc"
                        ? t.transactions.searchFilters.ascending
                        : t.transactions.searchFilters.descending
                    }
                  >
                    {filters.sortOrder === "asc" ? "↑" : "↓"}
                  </button>
                </div>
              </div>

              {/* Amount Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.transactions.searchFilters.amountRange}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder={t.transactions.searchFilters.minAmount}
                    value={filters.amountMin || ""}
                    onChange={(e) =>
                      updateFilter(
                        "amountMin",
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder={t.transactions.searchFilters.maxAmount}
                    value={filters.amountMax || ""}
                    onChange={(e) =>
                      updateFilter(
                        "amountMax",
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.transactions.searchFilters.dateFrom}
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => updateFilter("dateFrom", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.transactions.searchFilters.dateTo}
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => updateFilter("dateTo", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            {t.transactions.searchFilters.resultsFound}:{" "}
            <strong>{filteredAndSortedTransactions.length}</strong>
            {filteredAndSortedTransactions.length !== transactions.length && (
              <span>
                {" "}
                {t.transactions.searchFilters.of} {transactions.length}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600">
            {t.transactions.searchFilters.totalValue}:{" "}
            <strong>
              {formatCurrency(
                filteredAndSortedTransactions
                  .filter((t) =>
                    ["PURCHASE", "FEE", "CASH_ADVANCE"].includes(t.type)
                  )
                  .reduce((sum, t) => sum + t.totalAmount, 0)
              )}
            </strong>
          </div>
        </div>
      </div>

      {/* Transaction Results */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-lg text-gray-600">
              {t.transactions.searchFilters.loading}
            </div>
          </div>
        ) : filteredAndSortedTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t.transactions.searchFilters.noResults}
            </h3>
            <p className="text-gray-600 mb-4">
              {t.transactions.searchFilters.tryDifferentFilters}
            </p>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800"
            >
              {t.transactions.searchFilters.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredAndSortedTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onDelete={() => handleDeleteTransaction(transaction.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionSearch;
