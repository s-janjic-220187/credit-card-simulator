import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useI18n } from "../../contexts/I18nContext";

interface BudgetCategory {
  id: string;
  name: string;
  budgetAmount: number;
  spentAmount: number;
  color: string;
  isDefault: boolean;
}

interface SpendingGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  type: "reduce" | "limit" | "save";
  priority: "high" | "medium" | "low";
  isActive: boolean;
}

interface BudgetPlannerProps {
  creditCardId: string;
  onBudgetUpdate?: (budget: BudgetCategory[]) => void;
}

const BudgetPlanner: React.FC<BudgetPlannerProps> = ({
  creditCardId,
  onBudgetUpdate,
}) => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"budget" | "goals" | "alerts">(
    "budget"
  );
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>(
    []
  );
  const [spendingGoals, setSpendingGoals] = useState<SpendingGoal[]>([]);
  const [isEditingBudget, setIsEditingBudget] = useState(false);

  const defaultCategories = [
    { name: "Groceries", color: "#FF6B6B" },
    { name: "Dining", color: "#4ECDC4" },
    { name: "Gas", color: "#45B7D1" },
    { name: "Shopping", color: "#96CEB4" },
    { name: "Entertainment", color: "#FFEAA7" },
    { name: "Utilities", color: "#DDA0DD" },
    { name: "Travel", color: "#98D8C8" },
    { name: "Healthcare", color: "#F7DC6F" },
    { name: "Other", color: "#BB8FCE" },
  ];

  useEffect(() => {
    initializeBudget();
    loadSpendingGoals();
  }, [creditCardId]);

  const initializeBudget = () => {
    const savedBudget = localStorage.getItem(`budget_${creditCardId}`);
    if (savedBudget) {
      setBudgetCategories(JSON.parse(savedBudget));
    } else {
      // Initialize with default categories
      const initialBudget = defaultCategories.map((cat, index) => ({
        id: `cat_${index}`,
        name: cat.name,
        budgetAmount: 200,
        spentAmount: 0,
        color: cat.color,
        isDefault: true,
      }));
      setBudgetCategories(initialBudget);
    }
  };

  const loadSpendingGoals = () => {
    const savedGoals = localStorage.getItem(`goals_${creditCardId}`);
    if (savedGoals) {
      setSpendingGoals(JSON.parse(savedGoals));
    } else {
      // Initialize with sample goals
      const sampleGoals: SpendingGoal[] = [
        {
          id: "goal_1",
          title: "Reduce Dining Out",
          targetAmount: 300,
          currentAmount: 450,
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          category: "Dining",
          type: "reduce",
          priority: "high",
          isActive: true,
        },
        {
          id: "goal_2",
          title: "Monthly Grocery Budget",
          targetAmount: 400,
          currentAmount: 320,
          deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          category: "Groceries",
          type: "limit",
          priority: "medium",
          isActive: true,
        },
      ];
      setSpendingGoals(sampleGoals);
    }
  };

  const saveBudget = () => {
    localStorage.setItem(
      `budget_${creditCardId}`,
      JSON.stringify(budgetCategories)
    );
    onBudgetUpdate?.(budgetCategories);
    setIsEditingBudget(false);
    toast.success(t.budget.budgetSaved);
  };

  const saveGoals = () => {
    localStorage.setItem(
      `goals_${creditCardId}`,
      JSON.stringify(spendingGoals)
    );
    toast.success(t.budget.goalsSaved);
  };

  const updateBudgetCategory = (
    id: string,
    field: keyof BudgetCategory,
    value: any
  ) => {
    setBudgetCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat))
    );
  };

  const addBudgetCategory = () => {
    const newCategory: BudgetCategory = {
      id: `cat_${Date.now()}`,
      name: t.components.budgetPlanner.newCategory,
      budgetAmount: 100,
      spentAmount: 0,
      color: "#95A5A6",
      isDefault: false,
    };
    setBudgetCategories((prev) => [...prev, newCategory]);
  };

  const removeBudgetCategory = (id: string) => {
    setBudgetCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const addSpendingGoal = () => {
    const newGoal: SpendingGoal = {
      id: `goal_${Date.now()}`,
      title: t.components.budgetPlanner.newGoal,
      targetAmount: 0,
      currentAmount: 0,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      category: "Other",
      type: "limit",
      priority: "medium",
      isActive: true,
    };
    setSpendingGoals((prev) => [...prev, newGoal]);
  };

  const updateSpendingGoal = (
    id: string,
    field: keyof SpendingGoal,
    value: any
  ) => {
    setSpendingGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, [field]: value } : goal))
    );
  };

  const removeSpendingGoal = (id: string) => {
    setSpendingGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(100, (current / target) * 100);
  };

  const getProgressColor = (progress: number, type: SpendingGoal["type"]) => {
    if (type === "reduce") {
      return progress > 100
        ? "bg-red-500"
        : progress > 80
        ? "bg-yellow-500"
        : "bg-green-500";
    }
    return progress > 90
      ? "bg-red-500"
      : progress > 75
      ? "bg-yellow-500"
      : "bg-green-500";
  };

  const renderBudgetTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{t.budget.monthlyBudget}</h3>
          <p className="text-gray-600">{t.budget.setBudgetLimits}</p>
        </div>
        <div className="flex gap-2">
          {isEditingBudget ? (
            <>
              <button
                onClick={saveBudget}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                {t.common.save}
              </button>
              <button
                onClick={() => setIsEditingBudget(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                {t.common.cancel}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditingBudget(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              {t.budget.editBudget}
            </button>
          )}
        </div>
      </div>

      {/* Budget Summary */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-blue-100 text-sm">{t.budget.totalBudget}</p>
            <p className="text-2xl font-bold">
              {formatCurrency(
                budgetCategories.reduce((sum, cat) => sum + cat.budgetAmount, 0)
              )}
            </p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">{t.budget.totalSpent}</p>
            <p className="text-2xl font-bold">
              {formatCurrency(
                budgetCategories.reduce((sum, cat) => sum + cat.spentAmount, 0)
              )}
            </p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">{t.budget.remaining}</p>
            <p className="text-2xl font-bold">
              {formatCurrency(
                budgetCategories.reduce(
                  (sum, cat) => sum + cat.budgetAmount,
                  0
                ) -
                  budgetCategories.reduce(
                    (sum, cat) => sum + cat.spentAmount,
                    0
                  )
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-medium">{t.budget.budgetCategories}</h4>
          {isEditingBudget && (
            <button
              onClick={addBudgetCategory}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
            >
              {t.budget.addCategory}
            </button>
          )}
        </div>

        <div className="space-y-4">
          {budgetCategories.map((category) => {
            const progress = calculateProgress(
              category.spentAmount,
              category.budgetAmount
            );
            return (
              <div key={category.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    {isEditingBudget ? (
                      <input
                        type="text"
                        value={category.name}
                        onChange={(e) =>
                          updateBudgetCategory(
                            category.id,
                            "name",
                            e.target.value
                          )
                        }
                        className="font-medium border-b border-gray-300 focus:border-blue-500 outline-none"
                      />
                    ) : (
                      <span className="font-medium">{category.name}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {isEditingBudget ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">$</span>
                        <input
                          type="number"
                          value={category.budgetAmount}
                          onChange={(e) =>
                            updateBudgetCategory(
                              category.id,
                              "budgetAmount",
                              Number(e.target.value)
                            )
                          }
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        {!category.isDefault && (
                          <button
                            onClick={() => removeBudgetCategory(category.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="text-right">
                        <div className="font-semibold">
                          {formatCurrency(category.spentAmount)} /{" "}
                          {formatCurrency(category.budgetAmount)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {progress.toFixed(1)}% {t.budget.used}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {!isEditingBudget && (
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        progress > 100
                          ? "bg-red-500"
                          : progress > 80
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(100, progress)}%` }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderGoalsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{t.budget.spendingGoals}</h3>
          <p className="text-gray-600">{t.budget.setFinancialGoals}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addSpendingGoal}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            {t.budget.addGoal}
          </button>
          <button
            onClick={saveGoals}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {t.budget.saveGoals}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {spendingGoals.map((goal) => {
          const progress = calculateProgress(
            goal.currentAmount,
            goal.targetAmount
          );
          const daysUntilDeadline = Math.ceil(
            (new Date(goal.deadline).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          );

          return (
            <div key={goal.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={goal.title}
                    onChange={(e) =>
                      updateSpendingGoal(goal.id, "title", e.target.value)
                    }
                    className="font-semibold text-lg border-b border-gray-300 focus:border-blue-500 outline-none w-full"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        goal.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : goal.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {goal.priority}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        goal.type === "reduce"
                          ? "bg-orange-100 text-orange-800"
                          : goal.type === "limit"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {goal.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeSpendingGoal(goal.id)}
                  className="text-red-600 hover:text-red-800 text-sm ml-2"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      {t.budget.targetAmount}
                    </label>
                    <input
                      type="number"
                      value={goal.targetAmount}
                      onChange={(e) =>
                        updateSpendingGoal(
                          goal.id,
                          "targetAmount",
                          Number(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      {t.budget.currentAmount}
                    </label>
                    <input
                      type="number"
                      value={goal.currentAmount}
                      onChange={(e) =>
                        updateSpendingGoal(
                          goal.id,
                          "currentAmount",
                          Number(e.target.value)
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      {t.budget.deadline}
                    </label>
                    <input
                      type="date"
                      value={goal.deadline}
                      onChange={(e) =>
                        updateSpendingGoal(goal.id, "deadline", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      {t.budget.category}
                    </label>
                    <select
                      value={goal.category}
                      onChange={(e) =>
                        updateSpendingGoal(goal.id, "category", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      {defaultCategories.map((cat) => (
                        <option key={cat.name} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{t.budget.progress}</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(
                        progress,
                        goal.type
                      )}`}
                      style={{ width: `${Math.min(100, progress)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>
                      {formatCurrency(goal.currentAmount)} /{" "}
                      {formatCurrency(goal.targetAmount)}
                    </span>
                    <span>
                      {daysUntilDeadline > 0
                        ? `${daysUntilDeadline} days left`
                        : "Overdue"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAlertsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">{t.budget.smartAlerts}</h3>
        <p className="text-gray-600 mb-4">{t.budget.budgetNotifications}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h4 className="font-medium mb-4">{t.budget.currentAlerts}</h4>
        <div className="space-y-3">
          {budgetCategories
            .filter((cat) => cat.spentAmount / cat.budgetAmount > 0.8)
            .map((cat) => (
              <div
                key={cat.id}
                className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <div className="text-yellow-600 mr-3">⚠️</div>
                <div className="flex-1">
                  <p className="font-medium text-yellow-800">
                    {cat.name} {t.budget.budgetWarning}
                  </p>
                  <p className="text-sm text-yellow-700">
                    {formatCurrency(cat.spentAmount)} /{" "}
                    {formatCurrency(cat.budgetAmount)} (
                    {((cat.spentAmount / cat.budgetAmount) * 100).toFixed(1)}%)
                  </p>
                </div>
              </div>
            ))}

          {spendingGoals
            .filter((goal) => {
              const daysLeft = Math.ceil(
                (new Date(goal.deadline).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              return daysLeft <= 7 && daysLeft > 0;
            })
            .map((goal) => (
              <div
                key={goal.id}
                className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <div className="text-blue-600 mr-3">🎯</div>
                <div className="flex-1">
                  <p className="font-medium text-blue-800">
                    {goal.title} {t.budget.goalDeadlineApproaching}
                  </p>
                  <p className="text-sm text-blue-700">
                    {Math.ceil(
                      (new Date(goal.deadline).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days remaining
                  </p>
                </div>
              </div>
            ))}
        </div>

        {budgetCategories.filter(
          (cat) => cat.spentAmount / cat.budgetAmount > 0.8
        ).length === 0 &&
          spendingGoals.filter((goal) => {
            const daysLeft = Math.ceil(
              (new Date(goal.deadline).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            );
            return daysLeft <= 7 && daysLeft > 0;
          }).length === 0 && (
            <p className="text-gray-500 text-center py-4">
              {t.budget.noActiveAlerts}
            </p>
          )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          💰 {t.budget.title}
        </h1>
        <p className="text-gray-600 mb-6">{t.budget.subtitle}</p>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          {[
            { key: "budget", label: t.budget.tabs.budget, icon: "💳" },
            { key: "goals", label: t.budget.tabs.goals, icon: "🎯" },
            { key: "alerts", label: t.budget.tabs.alerts, icon: "🔔" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.key
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
        {activeTab === "budget" && renderBudgetTab()}
        {activeTab === "goals" && renderGoalsTab()}
        {activeTab === "alerts" && renderAlertsTab()}
      </div>
    </div>
  );
};

export default BudgetPlanner;
