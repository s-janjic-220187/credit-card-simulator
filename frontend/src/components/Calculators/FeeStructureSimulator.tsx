import React, { useMemo, useState } from "react";
import { useI18n } from "../../contexts/I18nContext";

interface FeeStructure {
  annualFee: number;
  foreignTransactionFee: number; // percentage
  balanceTransferFee: number; // percentage
  cashAdvanceFee: number; // percentage
  lateFee: number;
  overdraftFee: number;
  returnedPaymentFee: number;
  overlimitFee: number;
}

interface Transaction {
  id: string;
  type: "purchase" | "balance_transfer" | "cash_advance" | "foreign_purchase";
  amount: number;
  description: string;
}

interface Scenario {
  name: string;
  description: string;
  transactions: Transaction[];
  latePayments: number;
  returnedPayments: number;
  overlimitOccurrences: number;
}

const FeeStructureSimulator: React.FC = () => {
  const { t } = useI18n();
  const [feeStructure, setFeeStructure] = useState<FeeStructure>({
    annualFee: 95,
    foreignTransactionFee: 3.0,
    balanceTransferFee: 3.0,
    cashAdvanceFee: 5.0,
    lateFee: 39,
    overdraftFee: 35,
    returnedPaymentFee: 39,
    overlimitFee: 25,
  });

  const [selectedScenario, setSelectedScenario] = useState<string>("light");
  const [customTransactions, setCustomTransactions] = useState<Transaction[]>(
    []
  );
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);

  const predefinedScenarios: Record<string, Scenario> = {
    light: {
      name: "Light Usage",
      description:
        "Minimal credit card usage with occasional foreign purchases",
      transactions: [
        {
          id: "1",
          type: "purchase",
          amount: 500,
          description: "Monthly groceries",
        },
        {
          id: "2",
          type: "foreign_purchase",
          amount: 200,
          description: "Online shopping from UK",
        },
      ],
      latePayments: 0,
      returnedPayments: 0,
      overlimitOccurrences: 0,
    },
    moderate: {
      name: "Moderate Usage",
      description:
        "Regular usage with some balance transfers and occasional late payments",
      transactions: [
        {
          id: "1",
          type: "purchase",
          amount: 1200,
          description: "Monthly expenses",
        },
        {
          id: "2",
          type: "balance_transfer",
          amount: 3000,
          description: "Transfer from high-APR card",
        },
        {
          id: "3",
          type: "foreign_purchase",
          amount: 400,
          description: "Travel expenses",
        },
      ],
      latePayments: 1,
      returnedPayments: 0,
      overlimitOccurrences: 0,
    },
    heavy: {
      name: "Heavy Usage",
      description: "High usage with multiple fee-generating activities",
      transactions: [
        {
          id: "1",
          type: "purchase",
          amount: 2000,
          description: "Monthly expenses",
        },
        {
          id: "2",
          type: "balance_transfer",
          amount: 5000,
          description: "Debt consolidation",
        },
        {
          id: "3",
          type: "cash_advance",
          amount: 1000,
          description: "Emergency cash",
        },
        {
          id: "4",
          type: "foreign_purchase",
          amount: 800,
          description: "International travel",
        },
      ],
      latePayments: 2,
      returnedPayments: 1,
      overlimitOccurrences: 1,
    },
  };

  const calculateFees = useMemo(() => {
    const scenario = predefinedScenarios[selectedScenario];
    const transactions = showCustomBuilder
      ? customTransactions
      : scenario.transactions;

    let totalFees = 0;
    const feeBreakdown: Record<string, number> = {};

    // Annual fee
    feeBreakdown["Annual Fee"] = feeStructure.annualFee;
    totalFees += feeStructure.annualFee;

    // Transaction fees
    transactions.forEach((transaction) => {
      switch (transaction.type) {
        case "foreign_purchase":
          const foreignFee =
            transaction.amount * (feeStructure.foreignTransactionFee / 100);
          feeBreakdown["Foreign Transaction Fees"] =
            (feeBreakdown["Foreign Transaction Fees"] || 0) + foreignFee;
          totalFees += foreignFee;
          break;
        case "balance_transfer":
          const btFee = Math.max(
            transaction.amount * (feeStructure.balanceTransferFee / 100),
            5
          );
          feeBreakdown["Balance Transfer Fees"] =
            (feeBreakdown["Balance Transfer Fees"] || 0) + btFee;
          totalFees += btFee;
          break;
        case "cash_advance":
          const caFee = Math.max(
            transaction.amount * (feeStructure.cashAdvanceFee / 100),
            10
          );
          feeBreakdown["Cash Advance Fees"] =
            (feeBreakdown["Cash Advance Fees"] || 0) + caFee;
          totalFees += caFee;
          break;
      }
    });

    // Penalty fees
    const latePayments = showCustomBuilder ? 0 : scenario.latePayments;
    const returnedPayments = showCustomBuilder ? 0 : scenario.returnedPayments;
    const overlimitOccurrences = showCustomBuilder
      ? 0
      : scenario.overlimitOccurrences;

    if (latePayments > 0) {
      feeBreakdown["Late Payment Fees"] = latePayments * feeStructure.lateFee;
      totalFees += feeBreakdown["Late Payment Fees"];
    }

    if (returnedPayments > 0) {
      feeBreakdown["Returned Payment Fees"] =
        returnedPayments * feeStructure.returnedPaymentFee;
      totalFees += feeBreakdown["Returned Payment Fees"];
    }

    if (overlimitOccurrences > 0) {
      feeBreakdown["Over-limit Fees"] =
        overlimitOccurrences * feeStructure.overlimitFee;
      totalFees += feeBreakdown["Over-limit Fees"];
    }

    return { totalFees, feeBreakdown };
  }, [feeStructure, selectedScenario, customTransactions, showCustomBuilder]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const addCustomTransaction = () => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "purchase",
      amount: 0,
      description: "",
    };
    setCustomTransactions([...customTransactions, newTransaction]);
  };

  const updateCustomTransaction = (
    id: string,
    field: keyof Transaction,
    value: any
  ) => {
    setCustomTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const removeCustomTransaction = (id: string) => {
    setCustomTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          💸 Fee Structure Simulator
        </h1>
        <p className="text-gray-600">
          Analyze and compare credit card fee structures across different usage
          scenarios. Understand how various fees impact your total cost of
          credit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fee Structure Configuration */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Fee Structure</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Fee ($)
                </label>
                <input
                  type="number"
                  value={feeStructure.annualFee}
                  onChange={(e) =>
                    setFeeStructure((prev) => ({
                      ...prev,
                      annualFee: Number(e.target.value),
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Foreign Transaction Fee (%)
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Balance Transfer Fee (%)
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cash Advance Fee (%)
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Late Payment Fee ($)
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Returned Payment Fee ($)
                  </label>
                  <input
                    type="number"
                    value={feeStructure.returnedPaymentFee}
                    onChange={(e) =>
                      setFeeStructure((prev) => ({
                        ...prev,
                        returnedPaymentFee: Number(e.target.value),
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Over-limit Fee ($)
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scenario Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Usage Scenario</h2>
            <div className="space-y-3">
              {Object.entries(predefinedScenarios).map(([key, scenario]) => (
                <div
                  key={key}
                  onClick={() => {
                    setSelectedScenario(key);
                    setShowCustomBuilder(false);
                  }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedScenario === key && !showCustomBuilder
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium">{scenario.name}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {scenario.description}
                  </div>
                </div>
              ))}

              <div
                onClick={() => setShowCustomBuilder(true)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  showCustomBuilder
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium">Custom Scenario</div>
                <div className="text-sm text-gray-600 mt-1">
                  Build your own transaction scenario
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results and Analysis */}
        <div className="space-y-6">
          {/* Fee Calculation Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Fee Analysis</h2>

            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-red-600">
                {formatCurrency(calculateFees.totalFees)}
              </div>
              <div className="text-sm text-gray-600">Total Annual Fees</div>
            </div>

            <div className="space-y-3">
              {Object.entries(calculateFees.feeBreakdown).map(
                ([feeType, amount]) => (
                  <div
                    key={feeType}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700">{feeType}:</span>
                    <span className="font-medium text-red-600">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Fee Comparison Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Fee Breakdown</h3>
            <div className="space-y-2">
              {Object.entries(calculateFees.feeBreakdown).map(
                ([feeType, amount]) => {
                  const percentage = (amount / calculateFees.totalFees) * 100;
                  return (
                    <div key={feeType}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{feeType}</span>
                        <span>{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Educational Tips */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-orange-900">
              💡 Fee Avoidance Tips
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white rounded-lg p-3">
                <strong>Avoid Foreign Transaction Fees:</strong>
                <p className="mt-1 text-gray-700">
                  Use cards with no foreign transaction fees for international
                  purchases.
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <strong>Balance Transfer Strategy:</strong>
                <p className="mt-1 text-gray-700">
                  Calculate if the fee is worth the interest savings over time.
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <strong>Cash Advance Alternatives:</strong>
                <p className="mt-1 text-gray-700">
                  Consider personal loans or bank overdraft protection instead.
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <strong>Payment Timing:</strong>
                <p className="mt-1 text-gray-700">
                  Set up autopay to avoid late and returned payment fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Transaction Builder */}
      {showCustomBuilder && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Custom Transaction Builder
            </h3>
            <button
              onClick={addCustomTransaction}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Add Transaction
            </button>
          </div>

          <div className="space-y-4">
            {customTransactions.map((transaction) => (
              <div key={transaction.id} className="flex gap-4 items-center">
                <select
                  value={transaction.type}
                  onChange={(e) =>
                    updateCustomTransaction(
                      transaction.id,
                      "type",
                      e.target.value
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="purchase">Purchase</option>
                  <option value="foreign_purchase">Foreign Purchase</option>
                  <option value="balance_transfer">Balance Transfer</option>
                  <option value="cash_advance">Cash Advance</option>
                </select>

                <input
                  type="number"
                  placeholder={t.feeStructureSimulator.placeholders.amount}
                  value={transaction.amount || ""}
                  onChange={(e) =>
                    updateCustomTransaction(
                      transaction.id,
                      "amount",
                      Number(e.target.value)
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="text"
                  placeholder={t.feeStructureSimulator.placeholders.description}
                  value={transaction.description}
                  onChange={(e) =>
                    updateCustomTransaction(
                      transaction.id,
                      "description",
                      e.target.value
                    )
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={() => removeCustomTransaction(transaction.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeStructureSimulator;
