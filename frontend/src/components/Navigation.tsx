/**
 * Navigation Component
 * 
 * Main navigation bar for the Credit Card Billing Simulator application.
 * Organized in logical usage order for optimal user experience.
 * 
 * Features:
 * - Responsive design with elegant typography
 * - User-friendly order: Dashboard → Management → Tools → Education → Account
 * - Overflow-safe design with proper responsive breakpoints
 * - Logout functionality for user management
 * 
 * @author Credit Card Simulator Team
 * @version 2.0.0
 */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const { state } = useUser();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isCalculatorActive = () => {
    return location.pathname.startsWith('/calculators') || location.pathname.startsWith('/visualizations');
  };

  const handleLogout = () => {
    setIsAccountDropdownOpen(false);
    navigate('/logout');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate">
              <span className="hidden sm:inline">💳 SJ-CCMS</span>
              <span className="sm:hidden">💳 SJ</span>
            </h1>
          </div>
          
          {/* Navigation Links - Organized by logical usage order */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1 lg:space-x-4">
              {/* 1. Primary Dashboard */}
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/') 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="hidden lg:inline">🏠 Dashboard</span>
                <span className="lg:hidden">🏠</span>
              </Link>
              
              {/* 2. Card & Account Management */}
              <Link
                to="/card-builder"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/card-builder') 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="hidden lg:inline">🏦 Cards</span>
                <span className="lg:hidden">🏦</span>
              </Link>

              <Link
                to="/billing-cycle"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/billing-cycle') 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="hidden lg:inline">📅 Billing</span>
                <span className="lg:hidden">📅</span>
              </Link>

              <Link
                to="/statement-generator"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/statement-generator') 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="hidden lg:inline">📄 Statements</span>
                <span className="lg:hidden">📄</span>
              </Link>

              {/* 3. Financial Tools & Calculators */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${
                    isCalculatorActive() 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="hidden lg:inline">🧮 Tools</span>
                  <span className="lg:hidden">🧮</span>
                  <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      {/* Calculators Section */}
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Calculators</div>
                      <Link
                        to="/calculators/interest"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        💰 Interest Calculator
                      </Link>
                      <Link
                        to="/calculators/payment-strategy"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        📊 Payment Strategy
                      </Link>
                      <Link
                        to="/calculators/fee-simulator"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        💸 Fee Simulator
                      </Link>
                      <Link
                        to="/calculators/financial-health"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        📈 Financial Health
                      </Link>
                      
                      {/* Visualizations Section */}
                      <div className="border-t border-gray-100 my-2"></div>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Analytics</div>
                      <Link
                        to="/visualizations/interest-growth"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        📈 Interest Growth
                      </Link>
                      <Link
                        to="/visualizations/payment-impact"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        🚀 Payment Impact
                      </Link>
                      <Link
                        to="/visualizations/fee-analysis"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        📊 Fee Analysis
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Learning & Education */}
              <Link
                to="/education"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/education') 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="hidden lg:inline">🎓 Learn</span>
                <span className="lg:hidden">🎓</span>
              </Link>

              <Link
                to="/learning/scenarios"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive('/learning/scenarios') 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="hidden lg:inline">🎯 Scenarios</span>
                <span className="lg:hidden">🎯</span>
              </Link>
              
              {/* 5. Account Management */}
              <div className="relative">
                <button
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
                >
                  <span className="hidden lg:inline">👤 {state.profile?.firstName || 'Account'}</span>
                  <span className="lg:hidden">👤</span>
                  <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsAccountDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        ⚙️ Profile Settings
                      </Link>
                      {state.user?.role === 'ADMIN' && (
                        <Link
                          to="/admin"
                          onClick={() => setIsAccountDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 hover:text-purple-900 transition-colors font-semibold"
                        >
                          🛡️ Admin Dashboard
                        </Link>
                      )}
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              className="bg-gray-50 p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isAccountDropdownOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">🏠 Dashboard</Link>
              <Link to="/card-builder" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">🏦 Cards</Link>
              <Link to="/billing-cycle" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">📅 Billing</Link>
              <Link to="/statement-generator" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">📄 Statements</Link>
              <Link to="/calculators/interest" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">🧮 Tools</Link>
              <Link to="/education" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">🎓 Learn</Link>
              <Link to="/learning/scenarios" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">🎯 Scenarios</Link>
              <div className="border-t border-gray-200 my-2"></div>
              <Link to="/profile" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md">⚙️ Profile</Link>
              {state.user?.role === 'ADMIN' && (
                <Link to="/admin" className="block px-3 py-2 text-purple-700 hover:bg-purple-50 rounded-md font-semibold">🛡️ Admin Dashboard</Link>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
