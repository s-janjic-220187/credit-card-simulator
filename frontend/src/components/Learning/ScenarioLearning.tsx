import React, { useMemo, useState } from "react";
import { useI18n } from "../../contexts/I18nContext";

interface Scenario {
  id: string;
  title: string;
  category:
    | "payment_strategy"
    | "debt_management"
    | "credit_building"
    | "fee_avoidance";
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  situation: string;
  initialData: {
    balance: number;
    apr: number;
    creditLimit: number;
    monthlyIncome: number;
    expenses: number;
    creditScore: number;
  };
  objectives: string[];
  decisions: Array<{
    id: string;
    question: string;
    options: Array<{
      text: string;
      impact: "positive" | "negative" | "neutral";
      points: number;
      explanation: string;
    }>;
  }>;
  outcomes: {
    excellent: { title: string; description: string; points: number };
    good: { title: string; description: string; points: number };
    poor: { title: string; description: string; points: number };
  };
}

interface UserDecision {
  decisionId: string;
  selectedOption: number;
  points: number;
  impact: string;
}

const ScenarioLearning: React.FC = () => {
  const { t } = useI18n();
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [userDecisions, setUserDecisions] = useState<UserDecision[]>([]);
  const [currentDecision, setCurrentDecision] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const getTranslatedScenarios = (): Scenario[] => {
    return [
      {
        id: "emergency-debt",
        title: t.components.scenarioLearning.scenarios.emergencyDebt.title,
        category: "debt_management",
        difficulty: "intermediate",
        description:
          t.components.scenarioLearning.scenarios.emergencyDebt.description,
        situation:
          t.components.scenarioLearning.scenarios.emergencyDebt.situation,
        initialData: {
          balance: 3500,
          apr: 18,
          creditLimit: 5000,
          monthlyIncome: 3200,
          expenses: 2800,
          creditScore: 680,
        },
        objectives:
          t.components.scenarioLearning.scenarios.emergencyDebt.objectives,
        decisions: [
          {
            id: "emergency-funding",
            question:
              t.components.scenarioLearning.scenarios.emergencyDebt.decisions
                .emergencyFunding.question,
            options:
              t.components.scenarioLearning.scenarios.emergencyDebt.decisions.emergencyFunding.options.map(
                (option, index) => ({
                  text: option.text,
                  impact: (
                    ["negative", "positive", "positive", "negative"] as const
                  )[index],
                  points: [-10, 15, 20, -25][index],
                  explanation: option.explanation,
                })
              ),
          },
          {
            id: "payment-strategy",
            question:
              t.components.scenarioLearning.scenarios.emergencyDebt.decisions
                .paymentStrategy.question,
            options:
              t.components.scenarioLearning.scenarios.emergencyDebt.decisions.paymentStrategy.options.map(
                (option, index) => ({
                  text: option.text,
                  impact: (
                    ["negative", "positive", "positive", "positive"] as const
                  )[index],
                  points: [-5, 10, 15, 20][index],
                  explanation: option.explanation,
                })
              ),
          },
          {
            id: "credit-utilization",
            question:
              t.components.scenarioLearning.scenarios.emergencyDebt.decisions
                .creditUtilization.question,
            options:
              t.components.scenarioLearning.scenarios.emergencyDebt.decisions.creditUtilization.options.map(
                (option, index) => ({
                  text: option.text,
                  impact: (
                    ["neutral", "positive", "negative", "positive"] as const
                  )[index],
                  points: [5, 15, -10, 10][index],
                  explanation: option.explanation,
                })
              ),
          },
        ],
        outcomes: {
          excellent: {
            title:
              t.components.scenarioLearning.scenarios.emergencyDebt.outcomes
                .excellent.title,
            description:
              t.components.scenarioLearning.scenarios.emergencyDebt.outcomes
                .excellent.description,
            points: 45,
          },
          good: {
            title:
              t.components.scenarioLearning.scenarios.emergencyDebt.outcomes
                .good.title,
            description:
              t.components.scenarioLearning.scenarios.emergencyDebt.outcomes
                .good.description,
            points: 25,
          },
          poor: {
            title:
              t.components.scenarioLearning.scenarios.emergencyDebt.outcomes
                .poor.title,
            description:
              t.components.scenarioLearning.scenarios.emergencyDebt.outcomes
                .poor.description,
            points: 5,
          },
        },
      },
      {
        id: "credit-building",
        title: t.components.scenarioLearning.scenarios.creditBuilding.title,
        category: "credit_building",
        difficulty: "beginner",
        description:
          t.components.scenarioLearning.scenarios.creditBuilding.description,
        situation:
          t.components.scenarioLearning.scenarios.creditBuilding.situation,
        initialData: {
          balance: 0,
          apr: 24,
          creditLimit: 1000,
          monthlyIncome: 2500,
          expenses: 2000,
          creditScore: 650,
        },
        objectives:
          t.components.scenarioLearning.scenarios.creditBuilding.objectives,
        decisions: [
          {
            id: "spending-strategy",
            question:
              t.components.scenarioLearning.scenarios.creditBuilding.decisions
                .spendingStrategy.question,
            options:
              t.components.scenarioLearning.scenarios.creditBuilding.decisions.spendingStrategy.options.map(
                (option, index) => ({
                  text: option.text,
                  impact: (
                    ["negative", "positive", "negative", "neutral"] as const
                  )[index],
                  points: [-10, 15, -25, 5][index],
                  explanation: option.explanation,
                })
              ),
          },
          {
            id: "payment-timing",
            question:
              t.components.scenarioLearning.scenarios.creditBuilding.decisions
                .paymentTiming.question,
            options:
              t.components.scenarioLearning.scenarios.creditBuilding.decisions.paymentTiming.options.map(
                (option, index) => ({
                  text: option.text,
                  impact: (
                    ["positive", "negative", "neutral", "negative"] as const
                  )[index],
                  points: [20, -15, 10, -20][index],
                  explanation: option.explanation,
                })
              ),
          },
          {
            id: "credit-growth",
            question:
              t.components.scenarioLearning.scenarios.creditBuilding.decisions
                .creditGrowth.question,
            options:
              t.components.scenarioLearning.scenarios.creditBuilding.decisions.creditGrowth.options.map(
                (option, index) => ({
                  text: option.text,
                  impact: (
                    ["positive", "negative", "positive", "positive"] as const
                  )[index],
                  points: [15, -10, 10, 12][index],
                  explanation: option.explanation,
                })
              ),
          },
        ],
        outcomes: {
          excellent: {
            title:
              t.components.scenarioLearning.scenarios.creditBuilding.outcomes
                .excellent.title,
            description:
              t.components.scenarioLearning.scenarios.creditBuilding.outcomes
                .excellent.description,
            points: 45,
          },
          good: {
            title:
              t.components.scenarioLearning.scenarios.creditBuilding.outcomes
                .good.title,
            description:
              t.components.scenarioLearning.scenarios.creditBuilding.outcomes
                .good.description,
            points: 25,
          },
          poor: {
            title:
              t.components.scenarioLearning.scenarios.creditBuilding.outcomes
                .poor.title,
            description:
              t.components.scenarioLearning.scenarios.creditBuilding.outcomes
                .poor.description,
            points: 5,
          },
        },
      },
      {
        id: "balance-transfer",
        title: t.components.scenarioLearning.scenarios.balanceTransfer.title,
        category: "payment_strategy",
        difficulty: "advanced",
        description:
          t.components.scenarioLearning.scenarios.balanceTransfer.description,
        situation:
          t.components.scenarioLearning.scenarios.balanceTransfer.situation,
        initialData: {
          balance: 8000,
          apr: 22, // average
          creditLimit: 12000,
          monthlyIncome: 4500,
          expenses: 3800,
          creditScore: 720,
        },
        objectives:
          t.components.scenarioLearning.scenarios.balanceTransfer.objectives,
        decisions: [
          {
            id: "transfer-decision",
            question:
              t.components.scenarioLearning.scenarios.balanceTransfer.decisions
                .transferDecision.question,
            options:
              t.components.scenarioLearning.scenarios.balanceTransfer.decisions.transferDecision.options.map(
                (option, index) => ({
                  text: option.text,
                  impact: (
                    ["positive", "neutral", "positive", "negative"] as const
                  )[index],
                  points: [15, 5, 20, -10][index],
                  explanation: option.explanation,
                })
              ),
          },
          {
            id: "payoff-strategy",
            question:
              t.components.scenarioLearning.scenarios.balanceTransfer.decisions
                .payoffStrategy.question,
            options:
              t.components.scenarioLearning.scenarios.balanceTransfer.decisions.payoffStrategy.options.map(
                (option, index) => ({
                  text: option.text,
                  impact: (
                    ["negative", "positive", "positive", "negative"] as const
                  )[index],
                  points: [-5, 15, 20, -15][index],
                  explanation: option.explanation,
                })
              ),
          },
          {
            id: "remaining-cards",
            question:
              t.components.scenarioLearning.scenarios.balanceTransfer.decisions
                .remainingCards.question,
            options:
              t.components.scenarioLearning.scenarios.balanceTransfer.decisions.remainingCards.options.map(
                (option, index) => ({
                  text: option.text,
                  impact: (
                    ["negative", "positive", "positive", "neutral"] as const
                  )[index],
                  points: [-10, 15, 10, 5][index],
                  explanation: option.explanation,
                })
              ),
          },
        ],
        outcomes: {
          excellent: {
            title:
              t.components.scenarioLearning.scenarios.balanceTransfer.outcomes
                .excellent.title,
            description:
              t.components.scenarioLearning.scenarios.balanceTransfer.outcomes
                .excellent.description,
            points: 45,
          },
          good: {
            title:
              t.components.scenarioLearning.scenarios.balanceTransfer.outcomes
                .good.title,
            description:
              t.components.scenarioLearning.scenarios.balanceTransfer.outcomes
                .good.description,
            points: 25,
          },
          poor: {
            title:
              t.components.scenarioLearning.scenarios.balanceTransfer.outcomes
                .poor.title,
            description:
              t.components.scenarioLearning.scenarios.balanceTransfer.outcomes
                .poor.description,
            points: 5,
          },
        },
      },
    ];
  };

  const scenarios = getTranslatedScenarios();

  const currentScenario = scenarios.find((s) => s.id === activeScenario);
  const totalPoints = useMemo(() => {
    return userDecisions.reduce((sum, decision) => sum + decision.points, 0);
  }, [userDecisions]);

  const makeDecision = (optionIndex: number) => {
    if (!currentScenario) return;

    const decision = currentScenario.decisions[currentDecision];
    const selectedOption = decision.options[optionIndex];

    const newDecision: UserDecision = {
      decisionId: decision.id,
      selectedOption: optionIndex,
      points: selectedOption.points,
      impact: selectedOption.impact,
    };

    setUserDecisions((prev) => [...prev, newDecision]);

    if (currentDecision < currentScenario.decisions.length - 1) {
      setCurrentDecision(currentDecision + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const resetScenario = () => {
    setUserDecisions([]);
    setCurrentDecision(0);
    setIsCompleted(false);
  };

  const getOutcome = () => {
    if (!currentScenario) return null;

    if (totalPoints >= 40) return currentScenario.outcomes.excellent;
    if (totalPoints >= 20) return currentScenario.outcomes.good;
    return currentScenario.outcomes.poor;
  };

  if (!activeScenario) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t.components.scenarioLearning.title}
          </h1>
          <p className="text-gray-600">
            {t.components.scenarioLearning.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                setActiveScenario(scenario.id);
                resetScenario();
              }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {scenario.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      scenario.difficulty === "beginner"
                        ? "bg-green-100 text-green-800"
                        : scenario.difficulty === "intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {
                      t.components.scenarioLearning.difficulties[
                        scenario.difficulty
                      ]
                    }
                  </span>
                </div>

                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      scenario.category === "debt_management"
                        ? "bg-blue-100 text-blue-800"
                        : scenario.category === "credit_building"
                        ? "bg-green-100 text-green-800"
                        : scenario.category === "payment_strategy"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {
                      t.components.scenarioLearning.categories[
                        scenario.category
                      ]
                    }
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {scenario.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {t.components.scenarioLearning.learningObjectives}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {scenario.objectives.slice(0, 2).map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {objective}
                      </li>
                    ))}
                    {scenario.objectives.length > 2 && (
                      <li className="text-gray-400">
                        +{scenario.objectives.length - 2}{" "}
                        {t.components.scenarioLearning.moreObjectives}
                      </li>
                    )}
                  </ul>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  {t.components.scenarioLearning.startScenario}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {t.components.scenarioLearning.howItWorks.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="font-medium mb-2">
                {t.components.scenarioLearning.howItWorks.step1.title}
              </h3>
              <p className="text-sm text-gray-600">
                {t.components.scenarioLearning.howItWorks.step1.description}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-medium mb-2">
                {t.components.scenarioLearning.howItWorks.step2.title}
              </h3>
              <p className="text-sm text-gray-600">
                {t.components.scenarioLearning.howItWorks.step2.description}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-medium mb-2">
                {t.components.scenarioLearning.howItWorks.step3.title}
              </h3>
              <p className="text-sm text-gray-600">
                {t.components.scenarioLearning.howItWorks.step3.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => setActiveScenario(null)}
          className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
        >
          {t.components.scenarioLearning.backToScenarios}
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {currentScenario?.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span
            className={`px-2 py-1 rounded ${
              currentScenario?.difficulty === "beginner"
                ? "bg-green-100 text-green-800"
                : currentScenario?.difficulty === "intermediate"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {currentScenario?.difficulty &&
              t.components.scenarioLearning.difficulties[
                currentScenario.difficulty
              ]}
          </span>
          <span>
            {t.components.scenarioLearning.progress}:{" "}
            {currentDecision + (isCompleted ? 1 : 0)}/
            {currentScenario?.decisions.length}
          </span>
          <span>
            {t.components.scenarioLearning.score}: {totalPoints}{" "}
            {t.components.scenarioLearning.points}
          </span>
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Scenario Context */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">
              {t.components.scenarioLearning.situation}
            </h2>
            <p className="text-gray-700 mb-4">{currentScenario?.situation}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded p-3">
                <div className="font-medium">
                  {t.components.scenarioLearning.currentBalance}
                </div>
                <div className="text-lg">
                  ${currentScenario?.initialData.balance.toLocaleString()}
                </div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-medium">
                  {t.components.scenarioLearning.apr}
                </div>
                <div className="text-lg">
                  {currentScenario?.initialData.apr}%
                </div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-medium">
                  {t.components.scenarioLearning.creditScore}
                </div>
                <div className="text-lg">
                  {currentScenario?.initialData.creditScore}
                </div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-medium">
                  {t.components.scenarioLearning.monthlyIncome}
                </div>
                <div className="text-lg">
                  ${currentScenario?.initialData.monthlyIncome.toLocaleString()}
                </div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-medium">
                  {t.components.scenarioLearning.monthlyExpenses}
                </div>
                <div className="text-lg">
                  ${currentScenario?.initialData.expenses.toLocaleString()}
                </div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-medium">
                  {t.components.scenarioLearning.availableIncome}
                </div>
                <div className="text-lg text-green-600">
                  $
                  {(
                    (currentScenario?.initialData.monthlyIncome || 0) -
                    (currentScenario?.initialData.expenses || 0)
                  ).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Current Decision */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t.components.scenarioLearning.decision} {currentDecision + 1}:{" "}
              {currentScenario?.decisions[currentDecision]?.question}
            </h2>

            <div className="space-y-3">
              {currentScenario?.decisions[currentDecision]?.options.map(
                (option, index) => (
                  <button
                    key={index}
                    onClick={() => makeDecision(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors hover:border-blue-300 hover:bg-blue-50 ${
                      option.impact === "positive"
                        ? "border-green-200"
                        : option.impact === "negative"
                        ? "border-red-200"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="font-medium mb-2">{option.text}</div>
                    <div className="text-sm text-gray-600">
                      {t.components.scenarioLearning.clickToSelect}
                    </div>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Previous Decisions Summary */}
          {userDecisions.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                {t.components.scenarioLearning.yourPreviousDecisions}
              </h3>
              <div className="space-y-3">
                {userDecisions.map((decision) => {
                  const scenarioDecision = currentScenario?.decisions.find(
                    (d) => d.id === decision.decisionId
                  );
                  const option =
                    scenarioDecision?.options[decision.selectedOption];
                  return (
                    <div
                      key={decision.decisionId}
                      className="bg-white rounded-lg p-4"
                    >
                      <div className="font-medium mb-2">
                        {scenarioDecision?.question}
                      </div>
                      <div className="text-sm text-gray-700 mb-2">
                        <strong>
                          {t.components.scenarioLearning.yourChoice}
                        </strong>{" "}
                        {option?.text}
                      </div>
                      <div className="flex justify-between items-center">
                        <div
                          className={`text-sm px-2 py-1 rounded ${
                            decision.impact === "positive"
                              ? "bg-green-100 text-green-800"
                              : decision.impact === "negative"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {decision.impact === "positive"
                            ? t.components.scenarioLearning.positiveImpact
                            : decision.impact === "negative"
                            ? t.components.scenarioLearning.negativeImpact
                            : t.components.scenarioLearning.neutralImpact}{" "}
                          {t.components.scenarioLearning.impact}
                        </div>
                        <div
                          className={`font-medium ${
                            decision.points > 0
                              ? "text-green-600"
                              : decision.points < 0
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {decision.points > 0 ? "+" : ""}
                          {decision.points} points
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mt-2 italic">
                        {option?.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results */
        <div className="space-y-6">
          <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">
              {t.components.scenarioLearning.scenarioComplete}
            </h2>
            <div className="text-4xl font-bold mb-2 text-blue-600">
              {totalPoints} {t.components.scenarioLearning.points}
            </div>

            {(() => {
              const outcome = getOutcome();
              return (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {outcome?.title}
                  </h3>
                  <p className="text-gray-700">{outcome?.description}</p>
                </div>
              );
            })()}
          </div>

          {/* Detailed Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              {t.components.scenarioLearning.decisionAnalysis}
            </h3>
            <div className="space-y-4">
              {userDecisions.map((decision) => {
                const scenarioDecision = currentScenario?.decisions.find(
                  (d) => d.id === decision.decisionId
                );
                const option =
                  scenarioDecision?.options[decision.selectedOption];
                return (
                  <div
                    key={decision.decisionId}
                    className="border-l-4 border-blue-500 pl-4"
                  >
                    <div className="font-medium mb-1">
                      {scenarioDecision?.question}
                    </div>
                    <div className="text-sm text-gray-700 mb-2">
                      <strong>
                        {t.components.scenarioLearning.yourChoice}
                      </strong>{" "}
                      {option?.text}
                    </div>
                    <div className="text-sm text-gray-600 italic mb-2">
                      {option?.explanation}
                    </div>
                    <div
                      className={`text-sm font-medium ${
                        decision.points > 0
                          ? "text-green-600"
                          : decision.points < 0
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {t.components.scenarioLearning.pointsEarned}{" "}
                      {decision.points > 0 ? "+" : ""}
                      {decision.points}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={resetScenario}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors"
            >
              {t.components.scenarioLearning.tryAgain}
            </button>
            <button
              onClick={() => setActiveScenario(null)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
            >
              {t.components.scenarioLearning.chooseNewScenario}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioLearning;
