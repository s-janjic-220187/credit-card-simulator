import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useState } from 'react';
import CreditCardDetails from '../components/CreditCard/CreditCardDetails';
import type { CreditCard } from '../contexts/UserContext';
// import CreditCardList from '../components/CreditCards/CreditCardList';

const Dashboard = () => {
  const { state } = useUser();
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleCardClick = (card: CreditCard) => {
    setSelectedCard(card);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          💳 SJ Credit Card Management Suite
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master credit card fundamentals with this comprehensive educational platform. 
          Learn about billing cycles, interest calculations, payment strategies, and more through interactive tools and simulations.
        </p>
      </div>

      {/* User's Credit Cards Section */}
      {state.creditCards.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Credit Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.creditCards.map((card) => (
              <div
                key={card.id}
                className="relative rounded-lg p-6 text-white shadow-lg bg-gradient-to-br from-blue-600 to-purple-700 cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
                onClick={() => handleCardClick(card)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-sm font-medium opacity-90">
                    Credit Card
                  </div>
                  <div className="text-sm font-medium text-green-300">
                    {card.status}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-lg font-mono tracking-wider">
                    {card.cardNumber ? card.cardNumber.replace(/(.{4})/g, '$1 ').trim() : 'N/A'}
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs opacity-75 uppercase">Cardholder</div>
                    <div className="text-sm font-medium">
                      {card.cardholderName}
                    </div>
                  </div>
                  <div className="text-xs opacity-75">
                    Click for details →
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                  <div className="flex justify-between text-xs">
                    <div>
                      <div className="opacity-75">Available</div>
                      <div className="font-semibold">
                        ${(card.availableCredit || (card.creditLimit - card.currentBalance)).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="opacity-75">Limit</div>
                      <div className="font-semibold">
                        ${card.creditLimit.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="opacity-75">Balance</div>
                      <div className="font-semibold">
                        ${card.currentBalance.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage indicator */}
                <div className="mt-3">
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-1">
                    <div
                      className="bg-white h-1 rounded-full transition-all duration-300"
                      style={{
                        width: `${(card.currentBalance / card.creditLimit) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-lg transition-all duration-200 pointer-events-none"></div>
              </div>
            ))}
          </div>
          
          {/* Help text */}
          <div className="mt-4 text-center text-gray-500 text-sm">
            💡 Click on any card to view detailed information, transactions, and account details
          </div>
        </div>
      )}

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Billing Cycle Management */}
        <Link to="/billing-cycle" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-semibold mb-3">Billing Cycle Dashboard</h3>
          <p className="text-gray-600 mb-4">
            Visualize and manage complete billing cycles with detailed breakdowns of purchases, payments, interest, and fees.
          </p>
          <div className="text-blue-600 font-medium">Explore Billing Cycles →</div>
        </Link>

        {/* Interest Calculator */}
        <Link to="/calculators/interest" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-xl font-semibold mb-3">Interest Calculator</h3>
          <p className="text-gray-600 mb-4">
            Interactive calculator for APR, daily, and monthly interest rates with educational breakdowns and comparisons.
          </p>
          <div className="text-green-600 font-medium">Calculate Interest →</div>
        </Link>

        {/* Payment Strategy Analyzer */}
        <Link to="/calculators/payment-strategy" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-500">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-3">Payment Strategy Analyzer</h3>
          <p className="text-gray-600 mb-4">
            Compare minimum, custom, and aggressive payment strategies to optimize payoff time and minimize interest costs.
          </p>
          <div className="text-purple-600 font-medium">Analyze Strategies →</div>
        </Link>

        {/* Fee Structure Simulator */}
        <Link to="/calculators/fee-simulator" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-red-500">
          <div className="text-4xl mb-4">💸</div>
          <h3 className="text-xl font-semibold mb-3">Fee Structure Simulator</h3>
          <p className="text-gray-600 mb-4">
            Analyze and compare credit card fee structures across different usage scenarios and spending patterns.
          </p>
          <div className="text-red-600 font-medium">Simulate Fees →</div>
        </Link>

        {/* Credit Card Profile Builder */}
        <Link to="/card-builder" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-indigo-500">
          <div className="text-4xl mb-4">🏦</div>
          <h3 className="text-xl font-semibold mb-3">Credit Card Profile Builder</h3>
          <p className="text-gray-600 mb-4">
            Create detailed credit card profiles with custom terms, rewards, and features for comprehensive comparisons.
          </p>
          <div className="text-indigo-600 font-medium">Build Profiles →</div>
        </Link>

        {/* Statement Generator */}
        <Link to="/statement-generator" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-yellow-500">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-xl font-semibold mb-3">Statement Generator</h3>
          <p className="text-gray-600 mb-4">
            Generate realistic credit card statements and understand all components including interest calculations and fees.
          </p>
          <div className="text-yellow-600 font-medium">Generate Statements →</div>
        </Link>

        {/* Educational Dashboard */}
        <Link to="/education" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-teal-500">
          <div className="text-4xl mb-4">🎓</div>
          <h3 className="text-xl font-semibold mb-3">Education Center</h3>
          <p className="text-gray-600 mb-4">
            Comprehensive learning modules, tips, and strategies to master credit card management and financial literacy.
          </p>
          <div className="text-teal-600 font-medium">Start Learning →</div>
        </Link>

        {/* Financial Health Calculator */}
        <Link to="/calculators/financial-health" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-orange-500">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-3">Financial Health Score</h3>
          <p className="text-gray-600 mb-4">
            Comprehensive assessment of your financial health across credit, debt, cash flow, and financial habits.
          </p>
          <div className="text-orange-600 font-medium">Calculate Score →</div>
        </Link>

        {/* Scenario Learning */}
        <Link to="/learning/scenarios" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-pink-500">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold mb-3">Scenario-Based Learning</h3>
          <p className="text-gray-600 mb-4">
            Practice financial decision-making through interactive scenarios with real-world challenges and outcomes.
          </p>
          <div className="text-pink-600 font-medium">Practice Scenarios →</div>
        </Link>
      </div>

      {/* Key Features Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 mt-12">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
          🌟 Key Learning Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="font-semibold text-indigo-900 mb-2">Interactive Simulations</h3>
            <p className="text-indigo-700 text-sm">
              Real-time calculations and scenario modeling
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">�</div>
            <h3 className="font-semibold text-indigo-900 mb-2">Educational Content</h3>
            <p className="text-indigo-700 text-sm">
              Comprehensive learning modules and guides
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="font-semibold text-indigo-900 mb-2">Data Visualization</h3>
            <p className="text-indigo-700 text-sm">
              Charts and graphs for better understanding
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-indigo-900 mb-2">Practical Application</h3>
            <p className="text-indigo-700 text-sm">
              Real-world scenarios and case studies
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🚀 Quick Start Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">1</span>
            </div>
            <h3 className="font-semibold mb-2">Start with Education</h3>
            <p className="text-gray-600 text-sm">
              Begin with the Education Center to learn credit card fundamentals and best practices.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-xl">2</span>
            </div>
            <h3 className="font-semibold mb-2">Use Calculators</h3>
            <p className="text-gray-600 text-sm">
              Experiment with interactive calculators to understand interest, payments, and fees.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold mb-2">Build & Compare</h3>
            <p className="text-gray-600 text-sm">
              Create credit card profiles and generate statements to compare different scenarios.
            </p>
          </div>
        </div>
      </div>

      {/* Visualization Tools Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          📈 Advanced Data Visualizations
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Explore interactive charts and visualizations to better understand credit card behavior and payment strategies.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold text-lg mb-3">Interest Growth Charts</h3>
              <p className="text-gray-600 text-sm mb-4">
                Visualize how interest compounds over time with different payment strategies and see the dramatic impact of payment amounts.
              </p>
              <Link 
                to="/visualizations/interest-growth"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Explore Charts
              </Link>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-semibold text-lg mb-3">Payment Impact Visualizer</h3>
              <p className="text-gray-600 text-sm mb-4">
                See the powerful effect of increasing your payments with side-by-side comparisons and savings calculations.
              </p>
              <Link 
                to="/visualizations/payment-impact"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Visualize Impact
              </Link>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="font-semibold text-lg mb-3">Fee Analysis Dashboard</h3>
              <p className="text-gray-600 text-sm mb-4">
                Comprehensive analysis of fee structures with interactive charts to understand where your money goes.
              </p>
              <Link 
                to="/visualizations/fee-analysis"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Analyze Fees
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">12+</div>
          <div className="text-gray-600">Interactive Tools</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">6</div>
          <div className="text-gray-600">Data Visualizations</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">20+</div>
          <div className="text-gray-600">Learning Modules</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">∞</div>
          <div className="text-gray-600">Scenarios to Explore</div>
        </div>
      </div>

      {/* Footer with Author Information */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p className="mb-2">
            <span className="font-semibold">Created by:</span> Srdjan Janjic
          </p>
          <p className="mb-2">
            <span className="font-semibold">Contact:</span> srdjan.janjic22@gmail.com
          </p>
          <p className="text-sm">
            <span className="font-semibold">Version:</span> v1.0.0 | 
            <span className="ml-2">Educational Credit Card Billing Simulator</span>
          </p>
        </div>
      </div>

      {/* Credit Card Details Modal */}
      {selectedCard && (
        <CreditCardDetails
          card={selectedCard}
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default Dashboard;
