import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import Navigation from './components/Navigation';
import BillingCycleDashboard from './components/BillingCycle/BillingCycleDashboard';
import InterestCalculator from './components/Calculators/InterestCalculator';
import PaymentStrategyAnalyzer from './components/Calculators/PaymentStrategyAnalyzer';
import FeeStructureSimulator from './components/Calculators/FeeStructureSimulator';
import FinancialHealthCalculator from './components/Calculators/FinancialHealthCalculator';
import CreditCardProfileBuilder from './components/CreditCard/CreditCardProfileBuilder';
import StatementGenerator from './components/Statement/StatementGenerator';
import EducationalDashboard from './components/Education/EducationalDashboard';
import InterestGrowthCharts from './components/Visualization/InterestGrowthCharts';
import PaymentImpactVisualizer from './components/Visualization/PaymentImpactVisualizer';
import FeeAnalysisDashboard from './components/Visualization/FeeAnalysisDashboard';
import ScenarioLearning from './components/Learning/ScenarioLearning';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/billing-cycle" element={<BillingCycleDashboard />} />
              <Route path="/calculators/interest" element={<InterestCalculator />} />
              <Route path="/calculators/payment-strategy" element={<PaymentStrategyAnalyzer />} />
              <Route path="/calculators/fee-simulator" element={<FeeStructureSimulator />} />
              <Route path="/calculators/financial-health" element={<FinancialHealthCalculator />} />
              <Route path="/visualizations/interest-growth" element={<InterestGrowthCharts />} />
              <Route path="/visualizations/payment-impact" element={<PaymentImpactVisualizer />} />
              <Route path="/visualizations/fee-analysis" element={<FeeAnalysisDashboard />} />
              <Route path="/card-builder" element={<CreditCardProfileBuilder />} />
              <Route path="/statement-generator" element={<StatementGenerator />} />
              <Route path="/education" element={<EducationalDashboard />} />
              <Route path="/learning/scenarios" element={<ScenarioLearning />} />
            </Routes>
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
