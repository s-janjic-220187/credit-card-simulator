import React, { useState, useMemo } from 'react';

interface Scenario {
  id: string;
  title: string;
  category: 'payment_strategy' | 'debt_management' | 'credit_building' | 'fee_avoidance';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
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
      impact: 'positive' | 'negative' | 'neutral';
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
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [userDecisions, setUserDecisions] = useState<UserDecision[]>([]);
  const [currentDecision, setCurrentDecision] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const scenarios: Scenario[] = [
    {
      id: 'emergency-debt',
      title: 'Emergency Debt Management',
      category: 'debt_management',
      difficulty: 'intermediate',
      description: 'Navigate an unexpected financial emergency while managing existing credit card debt.',
      situation: `You have a $3,500 balance on your credit card (18% APR, $5,000 limit) and have been making $150 monthly payments. 
                 Your car suddenly needs $1,200 in repairs. You have $300 in savings and earn $3,200/month with $2,800 in expenses.`,
      initialData: {
        balance: 3500,
        apr: 18,
        creditLimit: 5000,
        monthlyIncome: 3200,
        expenses: 2800,
        creditScore: 680,
      },
      objectives: [
        'Handle the emergency repair without severely damaging your credit',
        'Minimize long-term interest costs',
        'Maintain a sustainable payment plan',
      ],
      decisions: [
        {
          id: 'emergency-funding',
          question: 'How should you fund the $1,200 car repair?',
          options: [
            {
              text: 'Use your credit card ($300 savings + $900 on card)',
              impact: 'negative',
              points: -10,
              explanation: 'This pushes your utilization to 88% and adds high-interest debt.',
            },
            {
              text: 'Use savings + personal loan for remaining amount',
              impact: 'positive',
              points: 15,
              explanation: 'Personal loan likely has lower interest than credit card.',
            },
            {
              text: 'Use savings + negotiate payment plan with mechanic',
              impact: 'positive',
              points: 20,
              explanation: 'Best option - avoids new debt and may be interest-free.',
            },
            {
              text: 'Use payday loan for quick cash',
              impact: 'negative',
              points: -25,
              explanation: 'Payday loans have extremely high interest rates (400%+ APR).',
            },
          ],
        },
        {
          id: 'payment-strategy',
          question: 'After handling the emergency, how should you adjust your credit card payments?',
          options: [
            {
              text: 'Reduce to minimum payments temporarily',
              impact: 'negative',
              points: -5,
              explanation: 'Will significantly increase interest costs over time.',
            },
            {
              text: 'Maintain $150/month but cut other expenses',
              impact: 'positive',
              points: 10,
              explanation: 'Good discipline, but may be challenging to sustain.',
            },
            {
              text: 'Increase payments to $200/month by reducing entertainment budget',
              impact: 'positive',
              points: 15,
              explanation: 'Excellent - pays off debt faster and saves interest.',
            },
            {
              text: 'Use debt avalanche method across all debts',
              impact: 'positive',
              points: 20,
              explanation: 'Mathematically optimal approach for multiple debts.',
            },
          ],
        },
        {
          id: 'credit-utilization',
          question: 'Your credit utilization is now high. What should be your immediate priority?',
          options: [
            {
              text: 'Request a credit limit increase',
              impact: 'neutral',
              points: 5,
              explanation: 'May help utilization but could tempt more spending.',
            },
            {
              text: 'Pay down the balance aggressively',
              impact: 'positive',
              points: 15,
              explanation: 'Best long-term strategy for credit score and finances.',
            },
            {
              text: 'Open a new credit card for more available credit',
              impact: 'negative',
              points: -10,
              explanation: 'Hard inquiry hurts score and adds temptation to spend.',
            },
            {
              text: 'Focus on making all payments on time',
              impact: 'positive',
              points: 10,
              explanation: 'Payment history is most important factor in credit score.',
            },
          ],
        },
      ],
      outcomes: {
        excellent: {
          title: 'Financial Crisis Averted!',
          description: 'You handled the emergency smartly, minimized debt growth, and created a sustainable recovery plan.',
          points: 45,
        },
        good: {
          title: 'Managed Well',
          description: 'You made mostly good decisions with minor room for improvement in debt management.',
          points: 25,
        },
        poor: {
          title: 'Learning Experience',
          description: 'This situation highlighted areas where different choices could lead to better financial outcomes.',
          points: 5,
        },
      },
    },
    {
      id: 'credit-building',
      title: 'Building Credit from Scratch',
      category: 'credit_building',
      difficulty: 'beginner',
      description: 'Learn how to responsibly build credit history with your first credit card.',
      situation: `You're 22 years old and just got your first credit card with a $1,000 limit and 24% APR. 
                 You have a steady income of $2,500/month and want to build excellent credit for future goals like buying a car or home.`,
      initialData: {
        balance: 0,
        apr: 24,
        creditLimit: 1000,
        monthlyIncome: 2500,
        expenses: 2000,
        creditScore: 650,
      },
      objectives: [
        'Establish positive payment history',
        'Keep utilization low for optimal credit score',
        'Build credit responsibly without accumulating debt',
      ],
      decisions: [
        {
          id: 'spending-strategy',
          question: 'How much should you spend on your credit card each month?',
          options: [
            {
              text: 'Use it for everything to build credit quickly ($800-900/month)',
              impact: 'negative',
              points: -10,
              explanation: 'High utilization (80-90%) significantly hurts your credit score.',
            },
            {
              text: 'Use it for small purchases only ($50-100/month)',
              impact: 'positive',
              points: 15,
              explanation: 'Perfect! 5-10% utilization is ideal for credit building.',
            },
            {
              text: 'Max it out and pay minimum payments',
              impact: 'negative',
              points: -25,
              explanation: 'Worst strategy - hurts credit score and creates expensive debt.',
            },
            {
              text: 'Only use it for emergencies',
              impact: 'neutral',
              points: 5,
              explanation: 'Safe but minimal credit building activity.',
            },
          ],
        },
        {
          id: 'payment-timing',
          question: 'When should you pay your credit card bill?',
          options: [
            {
              text: 'Pay the full balance every month before the due date',
              impact: 'positive',
              points: 20,
              explanation: 'Excellent! Avoids interest and builds perfect payment history.',
            },
            {
              text: 'Pay minimum amount to keep a small balance for credit building',
              impact: 'negative',
              points: -15,
              explanation: 'Myth! Carrying a balance doesn\'t help credit and costs interest.',
            },
            {
              text: 'Pay before the statement date to show $0 balance',
              impact: 'neutral',
              points: 10,
              explanation: 'Good for utilization but may not show account activity.',
            },
            {
              text: 'Pay a few days after the due date',
              impact: 'negative',
              points: -20,
              explanation: 'Late payments severely damage credit scores.',
            },
          ],
        },
        {
          id: 'credit-growth',
          question: 'After 6 months of responsible use, what should you do next?',
          options: [
            {
              text: 'Request a credit limit increase on your current card',
              impact: 'positive',
              points: 15,
              explanation: 'Good strategy to lower utilization ratio.',
            },
            {
              text: 'Apply for multiple new cards to increase available credit',
              impact: 'negative',
              points: -10,
              explanation: 'Multiple inquiries in short time can hurt your score.',
            },
            {
              text: 'Continue current strategy and gradually increase usage',
              impact: 'positive',
              points: 10,
              explanation: 'Steady approach - patience builds strong credit.',
            },
            {
              text: 'Apply for one additional card with better rewards',
              impact: 'positive',
              points: 12,
              explanation: 'Reasonable if you maintain low utilization across both cards.',
            },
          ],
        },
      ],
      outcomes: {
        excellent: {
          title: 'Credit Building Champion!',
          description: 'You\'ve established excellent habits that will serve you well throughout your financial journey.',
          points: 45,
        },
        good: {
          title: 'Strong Foundation',
          description: 'You\'re on the right track with minor adjustments needed for optimization.',
          points: 25,
        },
        poor: {
          title: 'Course Correction Needed',
          description: 'These insights will help you avoid common credit building mistakes.',
          points: 5,
        },
      },
    },
    {
      id: 'balance-transfer',
      title: 'Strategic Balance Transfer',
      category: 'payment_strategy',
      difficulty: 'advanced',
      description: 'Optimize your debt payoff strategy using balance transfer options.',
      situation: `You have $8,000 in credit card debt across 3 cards with different APRs (Card A: $3,000 at 22%, Card B: $3,500 at 19%, Card C: $1,500 at 25%). 
                 You receive a balance transfer offer: 0% APR for 15 months, 3% transfer fee, then 16.99% APR.`,
      initialData: {
        balance: 8000,
        apr: 22, // average
        creditLimit: 12000,
        monthlyIncome: 4500,
        expenses: 3800,
        creditScore: 720,
      },
      objectives: [
        'Minimize total interest paid',
        'Create sustainable payoff plan',
        'Avoid falling back into debt',
      ],
      decisions: [
        {
          id: 'transfer-decision',
          question: 'Which balances should you transfer to the 0% APR card?',
          options: [
            {
              text: 'Transfer all $8,000 to maximize 0% period',
              impact: 'positive',
              points: 15,
              explanation: 'Good strategy if you can pay it off within 15 months.',
            },
            {
              text: 'Transfer only the highest APR debt (Card C: $1,500 at 25%)',
              impact: 'neutral',
              points: 5,
              explanation: 'Conservative but may not maximize the benefit.',
            },
            {
              text: 'Transfer the two highest balances (Cards A & B: $6,500)',
              impact: 'positive',
              points: 20,
              explanation: 'Excellent balance of benefit and manageable payment plan.',
            },
            {
              text: 'Don\'t transfer - the 3% fee isn\'t worth it',
              impact: 'negative',
              points: -10,
              explanation: 'Missing a significant opportunity to save on interest.',
            },
          ],
        },
        {
          id: 'payoff-strategy',
          question: 'What monthly payment should you target for the transferred balance?',
          options: [
            {
              text: '$400/month (will pay off in ~16 months)',
              impact: 'negative',
              points: -5,
              explanation: 'Risky - you\'ll barely finish before the promotional rate ends.',
            },
            {
              text: '$500/month (will pay off in ~13 months)',
              impact: 'positive',
              points: 15,
              explanation: 'Good buffer - finished before promotional rate expires.',
            },
            {
              text: '$600/month (will pay off in ~11 months)',
              impact: 'positive',
              points: 20,
              explanation: 'Excellent - maximum benefit with comfortable margin.',
            },
            {
              text: 'Minimum payments to stretch it out',
              impact: 'negative',
              points: -15,
              explanation: 'Defeats the purpose of the 0% promotion.',
            },
          ],
        },
        {
          id: 'remaining-cards',
          question: 'How should you handle the cards you didn\'t transfer?',
          options: [
            {
              text: 'Close them to remove temptation',
              impact: 'negative',
              points: -10,
              explanation: 'Closing cards reduces available credit and hurts credit score.',
            },
            {
              text: 'Keep them open but cut up the physical cards',
              impact: 'positive',
              points: 15,
              explanation: 'Smart! Maintains credit history while removing temptation.',
            },
            {
              text: 'Use them for small purchases to keep them active',
              impact: 'positive',
              points: 10,
              explanation: 'Good if you can pay them off immediately.',
            },
            {
              text: 'Focus all payments on transfer card and pay minimums on others',
              impact: 'neutral',
              points: 5,
              explanation: 'Makes sense during the promotional period.',
            },
          ],
        },
      ],
      outcomes: {
        excellent: {
          title: 'Transfer Master!',
          description: 'You\'ve maximized the benefit of the balance transfer while avoiding common pitfalls.',
          points: 45,
        },
        good: {
          title: 'Strategic Thinking',
          description: 'Good use of the transfer option with room for minor optimization.',
          points: 25,
        },
        poor: {
          title: 'Missed Opportunity',
          description: 'Understanding these strategies better will help with future debt management.',
          points: 5,
        },
      },
    },
  ];

  const currentScenario = scenarios.find(s => s.id === activeScenario);
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

    setUserDecisions(prev => [...prev, newDecision]);

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
            🎯 Scenario-Based Learning
          </h1>
          <p className="text-gray-600">
            Practice real-world financial decision making through interactive scenarios. 
            Test your knowledge and learn from realistic situations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map(scenario => (
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
                  <h3 className="text-xl font-semibold text-gray-900">{scenario.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    scenario.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    scenario.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {scenario.difficulty}
                  </span>
                </div>

                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    scenario.category === 'debt_management' ? 'bg-blue-100 text-blue-800' :
                    scenario.category === 'credit_building' ? 'bg-green-100 text-green-800' :
                    scenario.category === 'payment_strategy' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {scenario.category.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {scenario.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Learning Objectives:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {scenario.objectives.slice(0, 2).map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {objective}
                      </li>
                    ))}
                    {scenario.objectives.length > 2 && (
                      <li className="text-gray-400">
                        +{scenario.objectives.length - 2} more objectives...
                      </li>
                    )}
                  </ul>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Start Scenario
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">How Scenario Learning Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="font-medium mb-2">1. Read the Situation</h3>
              <p className="text-sm text-gray-600">
                Each scenario presents a realistic financial situation with specific challenges.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-medium mb-2">2. Make Decisions</h3>
              <p className="text-sm text-gray-600">
                Choose from multiple options for each decision point in the scenario.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-medium mb-2">3. Learn from Results</h3>
              <p className="text-sm text-gray-600">
                Get immediate feedback and understand the consequences of your choices.
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
          ← Back to Scenarios
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentScenario?.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className={`px-2 py-1 rounded ${
            currentScenario?.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            currentScenario?.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {currentScenario?.difficulty}
          </span>
          <span>Progress: {currentDecision + (isCompleted ? 1 : 0)}/{currentScenario?.decisions.length}</span>
          <span>Score: {totalPoints} points</span>
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Scenario Context */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">Situation</h2>
            <p className="text-gray-700 mb-4">{currentScenario?.situation}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded p-3">
                <div className="font-medium">Current Balance</div>
                <div className="text-lg">${currentScenario?.initialData.balance.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-medium">APR</div>
                <div className="text-lg">{currentScenario?.initialData.apr}%</div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-medium">Credit Score</div>
                <div className="text-lg">{currentScenario?.initialData.creditScore}</div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-medium">Monthly Income</div>
                <div className="text-lg">${currentScenario?.initialData.monthlyIncome.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-medium">Monthly Expenses</div>
                <div className="text-lg">${currentScenario?.initialData.expenses.toLocaleString()}</div>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-medium">Available Income</div>
                <div className="text-lg text-green-600">
                  ${((currentScenario?.initialData.monthlyIncome || 0) - (currentScenario?.initialData.expenses || 0)).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Current Decision */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Decision {currentDecision + 1}: {currentScenario?.decisions[currentDecision]?.question}
            </h2>
            
            <div className="space-y-3">
              {currentScenario?.decisions[currentDecision]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => makeDecision(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors hover:border-blue-300 hover:bg-blue-50 ${
                    option.impact === 'positive' ? 'border-green-200' :
                    option.impact === 'negative' ? 'border-red-200' :
                    'border-gray-200'
                  }`}
                >
                  <div className="font-medium mb-2">{option.text}</div>
                  <div className="text-sm text-gray-600">
                    Click to select this option and see the outcome
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Previous Decisions Summary */}
          {userDecisions.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Your Previous Decisions</h3>
              <div className="space-y-3">
                {userDecisions.map((decision) => {
                  const scenarioDecision = currentScenario?.decisions.find(d => d.id === decision.decisionId);
                  const option = scenarioDecision?.options[decision.selectedOption];
                  return (
                    <div key={decision.decisionId} className="bg-white rounded-lg p-4">
                      <div className="font-medium mb-2">{scenarioDecision?.question}</div>
                      <div className="text-sm text-gray-700 mb-2">
                        <strong>Your choice:</strong> {option?.text}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className={`text-sm px-2 py-1 rounded ${
                          decision.impact === 'positive' ? 'bg-green-100 text-green-800' :
                          decision.impact === 'negative' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {decision.impact} impact
                        </div>
                        <div className={`font-medium ${
                          decision.points > 0 ? 'text-green-600' : 
                          decision.points < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {decision.points > 0 ? '+' : ''}{decision.points} points
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
            <h2 className="text-2xl font-bold mb-4">Scenario Complete!</h2>
            <div className="text-4xl font-bold mb-2 text-blue-600">{totalPoints} Points</div>
            
            {(() => {
              const outcome = getOutcome();
              return (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{outcome?.title}</h3>
                  <p className="text-gray-700">{outcome?.description}</p>
                </div>
              );
            })()}
          </div>

          {/* Detailed Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Decision Analysis</h3>
            <div className="space-y-4">
              {userDecisions.map((decision) => {
                const scenarioDecision = currentScenario?.decisions.find(d => d.id === decision.decisionId);
                const option = scenarioDecision?.options[decision.selectedOption];
                return (
                  <div key={decision.decisionId} className="border-l-4 border-blue-500 pl-4">
                    <div className="font-medium mb-1">{scenarioDecision?.question}</div>
                    <div className="text-sm text-gray-700 mb-2">
                      <strong>Your choice:</strong> {option?.text}
                    </div>
                    <div className="text-sm text-gray-600 italic mb-2">
                      {option?.explanation}
                    </div>
                    <div className={`text-sm font-medium ${
                      decision.points > 0 ? 'text-green-600' : 
                      decision.points < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      Points earned: {decision.points > 0 ? '+' : ''}{decision.points}
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
              Try Again
            </button>
            <button
              onClick={() => setActiveScenario(null)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg transition-colors"
            >
              Choose New Scenario
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioLearning;
