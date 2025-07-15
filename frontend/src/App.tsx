import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
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
import { UserProvider, useUser, useUserActions } from './contexts/UserContext';
import { I18nProvider } from './contexts/I18nContext';
import UserLogin from './components/Auth/UserLogin';
import UserCreate from './components/Auth/UserCreate';
import ProfileForm from './components/Profile/ProfileForm';
import CreditCardCreate from './components/CreditCard/CreditCardCreate';
import LogoutPage from './pages/LogoutPage';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Main App Coordinator Component
const AppCoordinator = () => {
  const { state } = useUser();
  const { createProfile } = useUserActions();
  const [authMode, setAuthMode] = useState<'login' | 'create'>('login');
  const [hasNavigatedAfterLogin, setHasNavigatedAfterLogin] = useState(false);
  const [profileError, setProfileError] = useState('');
  const navigate = useNavigate();

  // Handle navigation after login/logout
  useEffect(() => {
    if (state.isAuthenticated && state.currentStep === 'dashboard') {
      // Only navigate to dashboard if we haven't already done so after this login session
      if (!hasNavigatedAfterLogin) {
        console.log('✅ User authenticated and on dashboard step, navigating to root (first time)');
        navigate('/', { replace: true });
        setHasNavigatedAfterLogin(true);
      }
    } else if (!state.isAuthenticated && state.currentStep === 'login') {
      // Reset the navigation flag when user logs out
      setHasNavigatedAfterLogin(false);
      // If user logged out, they'll be shown the login form automatically
      console.log('✅ User not authenticated, showing login form');
      // Make sure we're not on any protected routes
      const currentPath = window.location.pathname;
      if (currentPath !== '/' && currentPath !== '') {
        console.log('🔄 Redirecting from protected route to login');
        navigate('/', { replace: true });
      }
    }
  }, [state.isAuthenticated, state.currentStep, navigate, hasNavigatedAfterLogin]);

  // Show different UI based on user state
  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {authMode === 'login' ? (
          <UserLogin
            onShowCreateUser={() => setAuthMode('create')}
          />
        ) : (
          <UserCreate
            onShowLogin={() => setAuthMode('login')}
          />
        )}
      </div>
      );
    }

    console.log('✅ User is authenticated, checking step:', state.currentStep);

    // Show different content based on current step
    if (state.currentStep === 'profile') {
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Profile</h1>
                <p className="text-gray-600 mb-6">
                  Please provide your information to set up your credit card simulator profile.
                </p>
                
                {profileError && (
                  <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {profileError}
                  </div>
                )}
                
                <ProfileForm
                  onSubmit={async (profileData) => {
                    try {
                      setProfileError('');
                      console.log('📝 Submitting profile data:', profileData);
                      await createProfile(profileData);
                      console.log('✅ Profile created successfully!');
                    } catch (error) {
                      console.error('❌ Failed to create profile:', error);
                      setProfileError(error instanceof Error ? error.message : 'Failed to create profile');
                    }
                  }}
                  onCancel={() => {
                    // Handle cancel - could logout or show previous step
                  }}
                  isLoading={state.isLoading}
                />
              </div>
            </div>
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
      );
    }

    if (state.currentStep === 'cards') {
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <CreditCardCreate />
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
      );
    }

    // Main app with full navigation (dashboard step)
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/logout" element={<LogoutPage />} />
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
    );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <I18nProvider>
          <Router>
            <AppCoordinator />
          </Router>
        </I18nProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </UserProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
