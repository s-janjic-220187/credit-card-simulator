import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useI18n } from '../contexts/I18nContext';
import { useState } from 'react';
import CreditCardDetails from '../components/CreditCard/CreditCardDetails';
import TransactionsDashboard from '../components/Transactions/TransactionsDashboard';
import type { CreditCard } from '../contexts/UserContext';
// import CreditCardList from '../components/CreditCards/CreditCardList';

const Dashboard = () => {
  const { state } = useUser();
  const { t } = useI18n();
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
          💳 {t.dashboard.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t.dashboard.subtitle}
        </p>
      </div>

      {/* User's Credit Cards Section */}
      {state.creditCards.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.dashboard.yourCards}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.creditCards.map((card) => (
              <div
                key={card.id}
                className="relative rounded-lg p-6 text-white shadow-lg bg-gradient-to-br from-blue-600 to-purple-700 cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
                onClick={() => handleCardClick(card)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-sm font-medium opacity-90">
                    {t.dashboard.creditCard}
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
                    <div className="text-xs opacity-75 uppercase">{t.dashboard.cardholder}</div>
                    <div className="text-sm font-medium">
                      {card.cardholderName}
                    </div>
                  </div>
                  <div className="text-xs opacity-75">
                    {t.dashboard.clickForDetails}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                  <div className="flex justify-between text-xs">
                    <div>
                      <div className="opacity-75">{t.dashboard.available}</div>
                      <div className="font-semibold">
                        ${(card.availableCredit || (card.creditLimit - card.currentBalance)).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="opacity-75">{t.dashboard.limit}</div>
                      <div className="font-semibold">
                        ${card.creditLimit.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="opacity-75">{t.dashboard.balance}</div>
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
            {t.dashboard.helpText}
          </div>
        </div>
      )}

      {/* Recent Transactions Section */}
      {state.creditCards.length > 0 && (
        <div className="mb-12">
          <TransactionsDashboard
            creditCardId={state.creditCards[0].id}
            creditCardName={state.creditCards[0].cardholderName}
            showAddButton={true}
            maxDisplayed={5}
          />
        </div>
      )}

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Billing Cycle Management */}
        <Link to="/billing-cycle" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-semibold mb-3">{t.dashboard.billingCycle.title}</h3>
          <p className="text-gray-600 mb-4">
            {t.dashboard.billingCycle.description}
          </p>
          <div className="text-blue-600 font-medium">{t.dashboard.billingCycle.action}</div>
        </Link>

        {/* Interest Calculator */}
        <Link to="/calculators/interest" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-xl font-semibold mb-3">{t.dashboard.interestCalculator.title}</h3>
          <p className="text-gray-600 mb-4">
            {t.dashboard.interestCalculator.description}
          </p>
          <div className="text-green-600 font-medium">{t.dashboard.interestCalculator.action}</div>
        </Link>

        {/* Payment Strategy Analyzer */}
        <Link to="/calculators/payment-strategy" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-500">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-3">{t.dashboard.paymentStrategy.title}</h3>
          <p className="text-gray-600 mb-4">
            {t.dashboard.paymentStrategy.description}
          </p>
          <div className="text-purple-600 font-medium">{t.dashboard.paymentStrategy.action}</div>
        </Link>

        {/* Fee Structure Simulator */}
        <Link to="/calculators/fee-simulator" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-red-500">
          <div className="text-4xl mb-4">💸</div>
          <h3 className="text-xl font-semibold mb-3">{t.dashboard.feeSimulator.title}</h3>
          <p className="text-gray-600 mb-4">
            {t.dashboard.feeSimulator.description}
          </p>
          <div className="text-red-600 font-medium">{t.dashboard.feeSimulator.action}</div>
        </Link>

        {/* Credit Card Profile Builder */}
        <Link to="/card-builder" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-indigo-500">
          <div className="text-4xl mb-4">🏦</div>
          <h3 className="text-xl font-semibold mb-3">{t.dashboard.cardBuilder.title}</h3>
          <p className="text-gray-600 mb-4">
            {t.dashboard.cardBuilder.description}
          </p>
          <div className="text-indigo-600 font-medium">{t.dashboard.cardBuilder.action}</div>
        </Link>

        {/* Transaction Management */}
        <Link to="/transactions" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-orange-500">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-xl font-semibold mb-3">Transaction Management</h3>
          <p className="text-gray-600 mb-4">
            Add, edit, and manage manual transactions for your credit cards. Track spending and payments.
          </p>
          <div className="text-orange-600 font-medium">Manage Transactions →</div>
        </Link>

        {/* Statement Generator */}
        <Link to="/statement-generator" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-yellow-500">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-xl font-semibold mb-3">{t.dashboard.statementGenerator.title}</h3>
          <p className="text-gray-600 mb-4">
            {t.dashboard.statementGenerator.description}
          </p>
          <div className="text-yellow-600 font-medium">{t.dashboard.statementGenerator.action}</div>
        </Link>

        {/* Educational Dashboard */}
        <Link to="/education" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-teal-500">
          <div className="text-4xl mb-4">🎓</div>
          <h3 className="text-xl font-semibold mb-3">{t.dashboard.educationCenter.title}</h3>
          <p className="text-gray-600 mb-4">
            {t.dashboard.educationCenter.description}
          </p>
          <div className="text-teal-600 font-medium">{t.dashboard.educationCenter.action}</div>
        </Link>

        {/* Financial Health Calculator */}
        <Link to="/calculators/financial-health" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-orange-500">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-3">{t.dashboard.financialHealth.title}</h3>
          <p className="text-gray-600 mb-4">
            {t.dashboard.financialHealth.description}
          </p>
          <div className="text-orange-600 font-medium">{t.dashboard.financialHealth.action}</div>
        </Link>

        {/* Scenario Learning */}
        <Link to="/learning/scenarios" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-pink-500">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold mb-3">{t.dashboard.scenarioLearning.title}</h3>
          <p className="text-gray-600 mb-4">
            {t.dashboard.scenarioLearning.description}
          </p>
          <div className="text-pink-600 font-medium">{t.dashboard.scenarioLearning.action}</div>
        </Link>
      </div>

      {/* Key Features Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 mt-12">
        <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
          {t.dashboard.keyFeatures.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="font-semibold text-indigo-900 mb-2">{t.dashboard.keyFeatures.interactiveSimulations.title}</h3>
            <p className="text-indigo-700 text-sm">
              {t.dashboard.keyFeatures.interactiveSimulations.description}
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-semibold text-indigo-900 mb-2">{t.dashboard.keyFeatures.educationalContent.title}</h3>
            <p className="text-indigo-700 text-sm">
              {t.dashboard.keyFeatures.educationalContent.description}
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="font-semibold text-indigo-900 mb-2">{t.dashboard.keyFeatures.dataVisualization.title}</h3>
            <p className="text-indigo-700 text-sm">
              {t.dashboard.keyFeatures.dataVisualization.description}
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-indigo-900 mb-2">{t.dashboard.keyFeatures.practicalApplication.title}</h3>
            <p className="text-indigo-700 text-sm">
              {t.dashboard.keyFeatures.practicalApplication.description}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {t.dashboard.quickStart.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">1</span>
            </div>
            <h3 className="font-semibold mb-2">{t.dashboard.quickStart.step1.title}</h3>
            <p className="text-gray-600 text-sm">
              {t.dashboard.quickStart.step1.description}
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-xl">2</span>
            </div>
            <h3 className="font-semibold mb-2">{t.dashboard.quickStart.step2.title}</h3>
            <p className="text-gray-600 text-sm">
              {t.dashboard.quickStart.step2.description}
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold mb-2">{t.dashboard.quickStart.step3.title}</h3>
            <p className="text-gray-600 text-sm">
              {t.dashboard.quickStart.step3.description}
            </p>
          </div>
        </div>
      </div>

      {/* Visualization Tools Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {t.dashboard.visualizations.title}
        </h2>
        <p className="text-gray-600 text-center mb-8">
          {t.dashboard.visualizations.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold text-lg mb-3">{t.dashboard.visualizations.interestGrowth.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {t.dashboard.visualizations.interestGrowth.description}
              </p>
              <Link 
                to="/visualizations/interest-growth"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                {t.dashboard.visualizations.interestGrowth.action}
              </Link>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-semibold text-lg mb-3">{t.dashboard.visualizations.paymentImpact.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {t.dashboard.visualizations.paymentImpact.description}
              </p>
              <Link 
                to="/visualizations/payment-impact"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                {t.dashboard.visualizations.paymentImpact.action}
              </Link>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="font-semibold text-lg mb-3">{t.dashboard.visualizations.feeAnalysis.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {t.dashboard.visualizations.feeAnalysis.description}
              </p>
              <Link 
                to="/visualizations/fee-analysis"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                {t.dashboard.visualizations.feeAnalysis.action}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">12+</div>
          <div className="text-gray-600">{t.dashboard.statistics.interactiveTools}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">6</div>
          <div className="text-gray-600">{t.dashboard.statistics.dataVisualizations}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">20+</div>
          <div className="text-gray-600">{t.dashboard.statistics.learningModules}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">∞</div>
          <div className="text-gray-600">{t.dashboard.statistics.scenarios}</div>
        </div>
      </div>

      {/* Footer with Author Information */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p className="mb-2">
            <span className="font-semibold">{t.dashboard.footer.createdBy}</span> Srdjan Janjic
          </p>
          <p className="mb-2">
            <span className="font-semibold">{t.dashboard.footer.contact}</span> srdjan.janjic22@gmail.com
          </p>
          <p className="text-sm">
            <span className="font-semibold">{t.dashboard.footer.version}</span> v1.0.0 | 
            <span className="ml-2">{t.dashboard.footer.description}</span>
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
