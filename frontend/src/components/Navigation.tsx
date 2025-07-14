/**
 * Navigation Component
 * 
 * Main navigation bar for the Credit Card Billing Simulator application.
 * Provides access to all major features and tools.
 * 
 * Features:
 * - Responsive dropdown menu for calculators and tools
 * - Active route highlighting
 * - Organized menu structure with categories
 * - Professional styling with hover effects
 * 
 * Menu Structure:
 * - Dashboard: Main overview and statistics
 * - Billing Cycles: Billing cycle management
 * - Calculators: Financial calculation tools
 *   - Basic Calculators: Interest, Payment Strategy, Fee Simulator, Financial Health
 *   - Visualizations: Charts and interactive visualizations
 * - Card Builder: Create and manage credit card profiles
 * - Statements: View and generate billing statements
 * - Education: Educational content and tutorials
 * - Scenarios: Interactive learning scenarios
 * - Profile: User profile management
 * 
 * @author Credit Card Simulator Team
 * @version 1.0.0
 */

import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isCalculatorActive = () => {
    return location.pathname.startsWith('/calculators');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-blue-600">
              💳 SJ Credit Card Management Suite
            </h1>
          </div>
          
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              🏠 Dashboard
            </Link>
            
            <Link
              to="/billing-cycle"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/billing-cycle') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              📅 Billing Cycles
            </Link>

            {/* Calculators Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                  isCalculatorActive() 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                🧮 Calculators
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Basic Calculators</div>
                    <Link
                      to="/calculators/interest"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      💰 Interest Calculator
                    </Link>
                    <Link
                      to="/calculators/payment-strategy"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      📊 Payment Strategy Analyzer
                    </Link>
                    <Link
                      to="/calculators/fee-simulator"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      💸 Fee Structure Simulator
                    </Link>
                    <Link
                      to="/calculators/financial-health"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      📊 Financial Health Score
                    </Link>
                    
                    <div className="border-t border-gray-200 my-1"></div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Visualizations</div>
                    <Link
                      to="/visualizations/interest-growth"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      📈 Interest Growth Charts
                    </Link>
                    <Link
                      to="/visualizations/payment-impact"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      🚀 Payment Impact Visualizer
                    </Link>
                    <Link
                      to="/visualizations/fee-analysis"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      📊 Fee Analysis Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/card-builder"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/card-builder') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              🏦 Card Builder
            </Link>

            <Link
              to="/statement-generator"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/statement-generator') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              📄 Statements
            </Link>

            <Link
              to="/education"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/education') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              🎓 Education
            </Link>

            <Link
              to="/learning/scenarios"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/learning/scenarios') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              🎯 Scenarios
            </Link>
            
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/profile') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
              }`}
            >
              👤 Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
