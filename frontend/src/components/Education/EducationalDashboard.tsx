import React, { useState, useMemo } from 'react';

interface LearningModule {
  id: string;
  title: string;
  category: 'basics' | 'advanced' | 'strategies' | 'mistakes';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  content: {
    overview: string;
    keyPoints: string[];
    examples: Array<{
      title: string;
      description: string;
      calculation?: string;
    }>;
    quiz?: Array<{
      question: string;
      options: string[];
      correct: number;
      explanation: string;
    }>;
  };
  completed?: boolean;
}

interface FinancialTip {
  id: string;
  category: 'credit_score' | 'payments' | 'rewards' | 'fees' | 'security';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: string;
}

const EducationalDashboard: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'overview' | 'modules' | 'tips' | 'calculator' | 'quiz'>('overview');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [userProgress, setUserProgress] = useState({
    level: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    totalPoints: 0,
    streakDays: 0,
  });

  const learningModules: LearningModule[] = [
    {
      id: 'credit-basics',
      title: 'Credit Card Basics',
      category: 'basics',
      difficulty: 'beginner',
      duration: 10,
      content: {
        overview: 'Learn the fundamental concepts of credit cards, including how they work, key terms, and basic responsibilities.',
        keyPoints: [
          'Credit cards are a form of revolving credit',
          'Interest is charged on unpaid balances',
          'Credit utilization affects your credit score',
          'Payment history is the most important factor',
          'Credit limits are set by the issuer',
        ],
        examples: [
          {
            title: 'Interest Calculation Example',
            description: 'If you have a $1,000 balance with 18% APR:',
            calculation: 'Daily rate: 18% ÷ 365 = 0.049%\nDaily interest: $1,000 × 0.049% = $0.49\nMonthly interest: $0.49 × 30 = $14.70',
          },
          {
            title: 'Credit Utilization Example',
            description: 'With a $5,000 credit limit and $1,500 balance:',
            calculation: 'Utilization: $1,500 ÷ $5,000 = 30%\nRecommended: Keep below 30% for good credit score',
          },
        ],
        quiz: [
          {
            question: 'What is the recommended credit utilization ratio?',
            options: ['Below 10%', 'Below 30%', 'Below 50%', 'Below 70%'],
            correct: 1,
            explanation: 'Keeping utilization below 30% is generally recommended for maintaining a good credit score.',
          },
        ],
      },
    },
    {
      id: 'interest-fees',
      title: 'Understanding Interest and Fees',
      category: 'basics',
      difficulty: 'beginner',
      duration: 15,
      content: {
        overview: 'Deep dive into how interest and fees work, including APR calculations, grace periods, and common fee types.',
        keyPoints: [
          'APR includes interest and certain fees',
          'Grace periods apply to new purchases when balance is paid in full',
          'Cash advances start accruing interest immediately',
          'Balance transfers often have promotional rates',
          'Late fees can be substantial and increase over time',
        ],
        examples: [
          {
            title: 'Grace Period Benefit',
            description: 'If you pay your full balance by the due date, new purchases during the next billing cycle won\'t accrue interest until after the next due date.',
          },
          {
            title: 'Cash Advance Cost',
            description: '$500 cash advance with 5% fee and 25% APR:',
            calculation: 'Immediate fee: $500 × 5% = $25\nDaily interest: $500 × (25% ÷ 365) = $0.34\nTotal cost after 30 days: $25 + ($0.34 × 30) = $35.20',
          },
        ],
      },
    },
    {
      id: 'payment-strategies',
      title: 'Smart Payment Strategies',
      category: 'strategies',
      difficulty: 'intermediate',
      duration: 20,
      content: {
        overview: 'Learn effective strategies for managing credit card payments to minimize interest and maximize benefits.',
        keyPoints: [
          'Pay more than the minimum to reduce interest',
          'Pay in full to avoid interest charges',
          'Consider payment timing for cash flow',
          'Use autopay to avoid late fees',
          'Pay high-interest cards first (avalanche method)',
        ],
        examples: [
          {
            title: 'Minimum vs. Full Payment',
            description: '$2,000 balance at 20% APR:',
            calculation: 'Minimum payment (2%): Takes 11+ years, costs $3,000+ in interest\nFull payment: Immediate payoff, $0 interest',
          },
          {
            title: 'Debt Avalanche vs. Snowball',
            description: 'Avalanche: Pay minimums on all cards, extra on highest APR\nSnowball: Pay minimums on all cards, extra on smallest balance',
          },
        ],
      },
    },
    {
      id: 'rewards-optimization',
      title: 'Maximizing Credit Card Rewards',
      category: 'strategies',
      difficulty: 'intermediate',
      duration: 25,
      content: {
        overview: 'Strategies for maximizing credit card rewards while avoiding common pitfalls.',
        keyPoints: [
          'Match spending to bonus categories',
          'Don\'t overspend just for rewards',
          'Consider annual fees vs. reward value',
          'Track bonus category calendars',
          'Redeem rewards strategically',
        ],
        examples: [
          {
            title: 'Bonus Category Strategy',
            description: 'Q1 5% cash back on gas stations:',
            calculation: 'Normal spending: $100/month × 1% = $12/year\nBonus period: $300 × 5% = $15 in Q1 alone',
          },
          {
            title: 'Annual Fee Break-Even',
            description: '$95 annual fee card with 2% cash back vs. 1% no-fee card:',
            calculation: 'Break-even spending: $95 ÷ (2% - 1%) = $9,500/year',
          },
        ],
      },
    },
    {
      id: 'credit-score-factors',
      title: 'Credit Score Optimization',
      category: 'advanced',
      difficulty: 'intermediate',
      duration: 30,
      content: {
        overview: 'Understanding credit scoring factors and strategies to improve your credit score.',
        keyPoints: [
          'Payment history: 35% of score',
          'Credit utilization: 30% of score',
          'Length of credit history: 15% of score',
          'Credit mix: 10% of score',
          'New credit inquiries: 10% of score',
        ],
        examples: [
          {
            title: 'Utilization Impact',
            description: 'Reducing utilization from 90% to 10% can increase score by 50-100 points',
          },
          {
            title: 'Payment History Impact',
            description: 'One 30-day late payment can reduce score by 60-110 points depending on your credit profile',
          },
        ],
      },
    },
    {
      id: 'common-mistakes',
      title: 'Avoiding Credit Card Mistakes',
      category: 'mistakes',
      difficulty: 'beginner',
      duration: 15,
      content: {
        overview: 'Common credit card mistakes and how to avoid them.',
        keyPoints: [
          'Making only minimum payments',
          'Closing old credit cards',
          'Applying for too many cards at once',
          'Using cash advances regularly',
          'Ignoring your credit report',
        ],
        examples: [
          {
            title: 'Closing Old Cards',
            description: 'Closing a 5-year-old card with $5,000 limit can hurt your score by reducing available credit and average account age.',
          },
          {
            title: 'Multiple Applications',
            description: 'Applying for 3 cards in one month can cause temporary 15-25 point score drop from hard inquiries.',
          },
        ],
      },
    },
  ];

  const financialTips: FinancialTip[] = [
    {
      id: 'autopay-setup',
      category: 'payments',
      title: 'Set Up Automatic Payments',
      description: 'Autopay ensures you never miss a payment and maintains your payment history.',
      impact: 'high',
      actionable: 'Set up autopay for at least the minimum payment amount, ideally the full balance.',
    },
    {
      id: 'utilization-monitoring',
      category: 'credit_score',
      title: 'Monitor Credit Utilization',
      description: 'Keep your credit utilization below 30% of your total available credit.',
      impact: 'high',
      actionable: 'Pay down balances or request credit limit increases to lower utilization.',
    },
    {
      id: 'statement-timing',
      category: 'payments',
      title: 'Understand Statement vs. Due Dates',
      description: 'Your statement date determines what balance is reported to credit bureaus.',
      impact: 'medium',
      actionable: 'Pay down balances before your statement date to report lower utilization.',
    },
    {
      id: 'reward-categories',
      category: 'rewards',
      title: 'Track Rotating Categories',
      description: 'Many cards offer 5% cash back on rotating quarterly categories.',
      impact: 'medium',
      actionable: 'Sign up for notifications and activate quarterly categories when they change.',
    },
    {
      id: 'fee-awareness',
      category: 'fees',
      title: 'Understand All Fees',
      description: 'Know your card\'s fee structure to avoid unnecessary charges.',
      impact: 'high',
      actionable: 'Review your card agreement and set up account alerts for potential fees.',
    },
    {
      id: 'fraud-monitoring',
      category: 'security',
      title: 'Monitor for Fraud',
      description: 'Regular monitoring helps catch unauthorized charges quickly.',
      impact: 'high',
      actionable: 'Check statements weekly and set up transaction alerts on your mobile app.',
    },
  ];

  const completeModule = (moduleId: string) => {
    setCompletedModules(prev => new Set([...prev, moduleId]));
    setUserProgress(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + 10,
    }));
  };

  const progressStats = useMemo(() => {
    const totalModules = learningModules.length;
    const completed = completedModules.size;
    const percentage = (completed / totalModules) * 100;
    
    return {
      totalModules,
      completed,
      percentage,
      remaining: totalModules - completed,
    };
  }, [completedModules, learningModules]);

  const modulesByCategory = useMemo(() => {
    return learningModules.reduce((acc, module) => {
      if (!acc[module.category]) {
        acc[module.category] = [];
      }
      acc[module.category].push(module);
      return acc;
    }, {} as Record<string, LearningModule[]>);
  }, [learningModules]);

  const tipsByCategory = useMemo(() => {
    return financialTips.reduce((acc, tip) => {
      if (!acc[tip.category]) {
        acc[tip.category] = [];
      }
      acc[tip.category].push(tip);
      return acc;
    }, {} as Record<string, FinancialTip[]>);
  }, [financialTips]);

  if (selectedModule) {
    const module = learningModules.find(m => m.id === selectedModule);
    if (!module) return null;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => setSelectedModule(null)}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Dashboard
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{module.title}</h1>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>📚 {module.category}</span>
                <span>⏱️ {module.duration} minutes</span>
                <span>📊 {module.difficulty}</span>
              </div>
            </div>
            {!completedModules.has(module.id) && (
              <button
                onClick={() => completeModule(module.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Mark Complete
              </button>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {/* Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <p className="text-gray-700">{module.content.overview}</p>
          </div>

          {/* Key Points */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Key Learning Points</h2>
            <ul className="space-y-3">
              {module.content.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Examples */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Practical Examples</h2>
            <div className="space-y-6">
              {module.content.examples.map((example, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-medium text-gray-900 mb-2">{example.title}</h3>
                  <p className="text-gray-700 mb-3">{example.description}</p>
                  {example.calculation && (
                    <div className="bg-gray-50 p-3 rounded font-mono text-sm whitespace-pre-line">
                      {example.calculation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quiz */}
          {module.content.quiz && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Knowledge Check</h2>
              <div className="space-y-6">
                {module.content.quiz.map((question, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="font-medium text-gray-900">{question.question}</h3>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            className="mr-2"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-green-800 text-sm">
                        <strong>Answer:</strong> {question.options[question.correct]}<br />
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🎓 Credit Card Education Center
        </h1>
        <p className="text-gray-600">
          Master credit card fundamentals, strategies, and best practices to make informed financial decisions.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex border-b mb-8">
        {[
          { key: 'overview', label: 'Overview', icon: '📊' },
          { key: 'modules', label: 'Learning Modules', icon: '📚' },
          { key: 'tips', label: 'Tips & Strategies', icon: '💡' },
          { key: 'calculator', label: 'Quick Calculator', icon: '🧮' },
          { key: 'quiz', label: 'Knowledge Quiz', icon: '🎯' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveCategory(tab.key as any)}
            className={`px-4 py-2 font-medium flex items-center gap-2 ${
              activeCategory === tab.key
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeCategory === 'overview' && (
        <div className="space-y-8">
          {/* Progress Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Learning Progress</h3>
                <span className="text-2xl">📈</span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Modules Completed</span>
                  <span>{progressStats.completed}/{progressStats.totalModules}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${progressStats.percentage}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {progressStats.percentage.toFixed(0)}% complete
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Knowledge Points</h3>
                <span className="text-2xl">🏆</span>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {userProgress.totalPoints}
              </div>
              <p className="text-sm text-gray-600">
                Earn 10 points per completed module
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Learning Level</h3>
                <span className="text-2xl">⭐</span>
              </div>
              <div className="text-xl font-medium text-green-600 mb-2 capitalize">
                {userProgress.level}
              </div>
              <p className="text-sm text-gray-600">
                Complete more modules to advance
              </p>
            </div>
          </div>

          {/* Quick Start Guide */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-indigo-900">🚀 Quick Start Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">New to Credit Cards?</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <strong>1. Start with Basics:</strong> Learn fundamental concepts
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <strong>2. Understand Interest:</strong> Know how costs are calculated
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <strong>3. Payment Strategies:</strong> Learn smart payment methods
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Want to Optimize?</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <strong>1. Rewards Maximization:</strong> Get more value from spending
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <strong>2. Credit Score Optimization:</strong> Improve your score
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <strong>3. Advanced Strategies:</strong> Master complex techniques
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Tips */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">💡 Featured Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {financialTips.slice(0, 4).map(tip => (
                <div key={tip.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{tip.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${
                      tip.impact === 'high' ? 'bg-red-100 text-red-800' :
                      tip.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {tip.impact} impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{tip.description}</p>
                  <p className="text-sm font-medium text-blue-600">{tip.actionable}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Learning Modules Tab */}
      {activeCategory === 'modules' && (
        <div className="space-y-8">
          {Object.entries(modulesByCategory).map(([category, modules]) => (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 capitalize">
                {category.replace('_', ' ')} Modules
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map(module => (
                  <div
                    key={module.id}
                    className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${
                      completedModules.has(module.id) ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedModule(module.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{module.title}</h4>
                      {completedModules.has(module.id) && (
                        <span className="text-green-600">✓</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      <div>⏱️ {module.duration} minutes</div>
                      <div>📊 {module.difficulty}</div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {module.content.overview}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips Tab */}
      {activeCategory === 'tips' && (
        <div className="space-y-8">
          {Object.entries(tipsByCategory).map(([category, tips]) => (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 capitalize">
                {category.replace('_', ' ')} Tips
              </h3>
              <div className="space-y-4">
                {tips.map(tip => (
                  <div key={tip.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{tip.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        tip.impact === 'high' ? 'bg-red-100 text-red-800' :
                        tip.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {tip.impact} impact
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{tip.description}</p>
                    <p className="text-sm font-medium text-blue-600 bg-blue-50 p-2 rounded">
                      💡 Action: {tip.actionable}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Calculator Tab */}
      {activeCategory === 'calculator' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">🧮 Quick Financial Calculator</h3>
          <p className="text-gray-600 mb-6">
            Use our interactive calculators to understand interest, payments, and rewards in real-time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">💳</div>
              <h4 className="font-medium mb-2">Interest Calculator</h4>
              <p className="text-sm text-gray-600 mb-4">
                Calculate interest charges on your balance
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Open Calculator
              </button>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">💰</div>
              <h4 className="font-medium mb-2">Payment Strategy</h4>
              <p className="text-sm text-gray-600 mb-4">
                Compare different payment strategies
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Open Calculator
              </button>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🎁</div>
              <h4 className="font-medium mb-2">Rewards Calculator</h4>
              <p className="text-sm text-gray-600 mb-4">
                Calculate potential rewards earnings
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Open Calculator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Knowledge Quiz Tab */}
      {activeCategory === 'quiz' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">🎯 Knowledge Quiz</h3>
          <p className="text-gray-600 mb-6">
            Test your credit card knowledge with our comprehensive quiz covering all topics.
          </p>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎯</div>
            <h4 className="text-xl font-medium mb-4">Quiz Coming Soon!</h4>
            <p className="text-gray-600 mb-6">
              We're preparing an interactive quiz to test your knowledge across all modules.
            </p>
            <button className="bg-gray-400 text-white px-6 py-3 rounded-lg cursor-not-allowed">
              Quiz Unavailable
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationalDashboard;
