import React, { useState } from "react";
import toast from "react-hot-toast";
import { useI18n } from "../../contexts/I18nContext";
import { transactionService } from "../../services/transactionService";

interface TransactionFormProps {
  creditCardId: string;
  onSuccess: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

type TransactionType =
  | "PURCHASE"
  | "PAYMENT"
  | "REFUND"
  | "FEE"
  | "CASH_ADVANCE";
type TransactionCategory =
  | "GROCERIES"
  | "DINING"
  | "GAS"
  | "UTILITIES"
  | "ENTERTAINMENT"
  | "SHOPPING"
  | "TRAVEL"
  | "HEALTHCARE"
  | "EDUCATION"
  | "OTHER";

interface CreateTransactionData {
  amount: number;
  type: TransactionType;
  description: string;
  category: TransactionCategory;
  merchantName: string;
  location?: string;
  fees?: number;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  creditCardId,
  onSuccess,
  onCancel,
  isLoading = false,
}) => {
  const { t } = useI18n();
  const [formData, setFormData] = useState<CreateTransactionData>({
    amount: 0,
    type: "PURCHASE",
    description: "",
    category: "OTHER",
    merchantName: "",
    location: "",
    fees: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const transactionTypes: {
    value: TransactionType;
    label: string;
    description: string;
  }[] = [
    {
      value: "PURCHASE",
      label: t.transactions.types.PURCHASE,
      description: t.transactions.typeDescriptions.PURCHASE,
    },
    {
      value: "PAYMENT",
      label: t.transactions.types.PAYMENT,
      description: t.transactions.typeDescriptions.PAYMENT,
    },
    {
      value: "REFUND",
      label: t.transactions.types.REFUND,
      description: t.transactions.typeDescriptions.REFUND,
    },
    {
      value: "FEE",
      label: t.transactions.types.FEE,
      description: t.transactions.typeDescriptions.FEE,
    },
    {
      value: "CASH_ADVANCE",
      label: t.transactions.types.CASH_ADVANCE,
      description: t.transactions.typeDescriptions.CASH_ADVANCE,
    },
  ];

  const categories: { value: TransactionCategory; label: string }[] = [
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "amount" || name === "fees" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    setIsSubmitting(true);
    try {
      await transactionService.createManualTransaction(creditCardId, formData);
      toast.success(t.success.created);
      onSuccess();
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error(error instanceof Error ? error.message : t.errors.generic);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCredit = ["PAYMENT", "REFUND"].includes(formData.type);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {t.transactions.form.title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t.transactions.form.typeRequired}
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {transactionTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {
              transactionTypes.find((t) => t.value === formData.type)
                ?.description
            }
          </p>
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t.transactions.form.amountRequired}
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isCredit
                ? "bg-green-50 border-green-300"
                : "bg-red-50 border-red-300"
            }`}
          />
          <p className="text-xs mt-1">
            {isCredit ? (
              <span className="text-green-600">
                {t.transactions.form.balanceDecrease}
              </span>
            ) : (
              <span className="text-red-600">
                {t.transactions.form.balanceIncrease}
              </span>
            )}
          </p>
        </div>

        {["PURCHASE", "CASH_ADVANCE", "FEE"].includes(formData.type) && (
          <div>
            <label
              htmlFor="fees"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t.transactions.form.additionalFees}
            </label>
            <input
              type="number"
              id="fees"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="merchantName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t.transactions.form.merchantNameRequired}
          </label>
          <input
            type="text"
            id="merchantName"
            name="merchantName"
            value={formData.merchantName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t.transactions.form.merchantPlaceholder}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t.transactions.form.categoryRequired}
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t.transactions.form.descriptionRequired}
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t.transactions.form.descriptionPlaceholder}
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t.transactions.form.location}
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t.transactions.form.locationPlaceholder}
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
          >
            {t.common.cancel}
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting
              ? t.transactions.form.creating
              : t.transactions.form.createTransaction}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
