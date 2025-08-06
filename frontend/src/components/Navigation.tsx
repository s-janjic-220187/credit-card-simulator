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

import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext";
import { useUser } from "../contexts/UserContext";
import LanguageSelector from "./Common/LanguageSelector";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const { state } = useUser();
  const { t } = useI18n();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsAccountDropdownOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isCalculatorActive = () => {
    return (
      location.pathname.startsWith("/calculators") ||
      location.pathname.startsWith("/visualizations")
    );
  };

  const handleLogout = () => {
    setIsAccountDropdownOpen(false);
    navigate("/logout");
  };

  return (
    <nav
      ref={mobileMenuRef}
      className="bg-white shadow-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate">
              <span className="hidden sm:inline">💳 {t.navigation.brand}</span>
              <span className="sm:hidden">
                {t.components.navigation.mobileBrandShort}
              </span>
            </h1>
          </div>

          {/* Navigation Links - Organized by logical usage order */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1 lg:space-x-4">
              {/* 1. Primary Dashboard */}
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive("/")
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <span className="hidden lg:inline">
                  🏠 {t.common.dashboard}
                </span>
                <span className="lg:hidden">🏠</span>
              </Link>

              {/* 2. Card & Account Management */}
              <Link
                to="/card-builder"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive("/card-builder")
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <span className="hidden lg:inline">🏦 {t.common.cards}</span>
                <span className="lg:hidden">🏦</span>
              </Link>

              <Link
                to="/transactions"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive("/transactions")
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <span className="hidden lg:inline">
                  💳 {t.navigation.transactions}
                </span>
                <span className="lg:hidden">💳</span>
              </Link>

              <Link
                to="/billing-cycle"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive("/billing-cycle")
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <span className="hidden lg:inline">📅 {t.common.billing}</span>
                <span className="lg:hidden">📅</span>
              </Link>

              <Link
                to="/statement-generator"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive("/statement-generator")
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <span className="hidden lg:inline">
                  📄 {t.common.statements}
                </span>
                <span className="lg:hidden">📄</span>
              </Link>

              {/* 3. Financial Tools & Calculators */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${
                    isCalculatorActive()
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="hidden lg:inline">🧮 {t.common.tools}</span>
                  <span className="lg:hidden">🧮</span>
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      {/* Calculators Section */}
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {t.navigation.calculators.title}
                      </div>
                      <Link
                        to="/calculators/interest"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        💰 {t.navigation.calculators.interestCalculator}
                      </Link>
                      <Link
                        to="/calculators/payment-strategy"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        📊 {t.navigation.calculators.paymentStrategy}
                      </Link>
                      <Link
                        to="/calculators/fee-simulator"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        💸 {t.navigation.calculators.feeSimulator}
                      </Link>
                      <Link
                        to="/calculators/financial-health"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        📈 {t.navigation.calculators.financialHealth}
                      </Link>

                      {/* Visualizations Section */}
                      <div className="border-t border-gray-100 my-2"></div>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {t.navigation.analytics.title}
                      </div>
                      <Link
                        to="/visualizations/interest-growth"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        📈 {t.navigation.analytics.interestGrowth}
                      </Link>
                      <Link
                        to="/visualizations/payment-impact"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        🚀 {t.navigation.analytics.paymentImpact}
                      </Link>
                      <Link
                        to="/visualizations/fee-analysis"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        📊 {t.navigation.analytics.feeAnalysis}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Learning & Education */}
              <Link
                to="/education"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive("/education")
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <span className="hidden lg:inline">🎓 {t.common.learn}</span>
                <span className="lg:hidden">🎓</span>
              </Link>

              <Link
                to="/learning/scenarios"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive("/learning/scenarios")
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <span className="hidden lg:inline">
                  🎯 {t.common.scenarios}
                </span>
                <span className="lg:hidden">🎯</span>
              </Link>

              {/* 5. Account Management with Language Selector */}
              <div className="flex items-center space-x-2">
                {/* Language Selector */}
                <LanguageSelector compact className="hidden lg:block" />

                <div className="relative">
                  <button
                    onClick={() =>
                      setIsAccountDropdownOpen(!isAccountDropdownOpen)
                    }
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
                  >
                    <span className="hidden lg:inline">
                      👤 {state.profile?.firstName || t.common.account}
                    </span>
                    <span className="lg:hidden">👤</span>
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
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
                          ⚙️ {t.common.profileSettings}
                        </Link>
                        {state.user?.role === "ADMIN" && (
                          <Link
                            to="/admin"
                            onClick={() => setIsAccountDropdownOpen(false)}
                            className="block px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 hover:text-purple-900 transition-colors font-semibold"
                          >
                            🛡️ {t.common.adminDashboard}
                          </Link>
                        )}
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          🚪 {t.common.logout}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              className="bg-gray-50 p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors flex items-center space-x-1"
              aria-label={t.components.navigation.openNavigationMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="text-xs font-medium">
                {t.navigation.mobile.menu}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isAccountDropdownOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-lg max-h-screen overflow-y-auto">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setIsAccountDropdownOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                🏠 {t.common.dashboard}
              </Link>
              <Link
                to="/card-builder"
                onClick={() => setIsAccountDropdownOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                🏦 {t.common.cards}
              </Link>
              <Link
                to="/transactions"
                onClick={() => setIsAccountDropdownOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                💳 {t.navigation.transactions}
              </Link>
              <Link
                to="/billing-cycle"
                onClick={() => setIsAccountDropdownOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                📅 {t.common.billing}
              </Link>
              <Link
                to="/statement-generator"
                onClick={() => setIsAccountDropdownOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                📄 {t.common.statements}
              </Link>

              {/* Tools Section */}
              <div className="py-2 bg-gray-50 rounded-lg mx-2 my-3">
                <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 pb-2 mb-2">
                  🧮 {t.common.tools}
                </div>
                <div className="space-y-1">
                  {/* Calculators */}
                  <div className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded mx-2">
                    📊 {t.navigation.calculators.title}
                  </div>
                  <Link
                    to="/calculators/interest"
                    onClick={() => setIsAccountDropdownOpen(false)}
                    className="block px-6 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md mx-2"
                  >
                    💰 {t.navigation.calculators.interestCalculator}
                  </Link>
                  <Link
                    to="/calculators/payment-strategy"
                    onClick={() => setIsAccountDropdownOpen(false)}
                    className="block px-6 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md mx-2"
                  >
                    📊 {t.navigation.calculators.paymentStrategy}
                  </Link>
                  <Link
                    to="/calculators/fee-simulator"
                    onClick={() => setIsAccountDropdownOpen(false)}
                    className="block px-6 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md mx-2"
                  >
                    💸 {t.navigation.calculators.feeSimulator}
                  </Link>
                  <Link
                    to="/calculators/financial-health"
                    onClick={() => setIsAccountDropdownOpen(false)}
                    className="block px-6 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md mx-2"
                  >
                    📈 {t.navigation.calculators.financialHealth}
                  </Link>

                  {/* Visualizations */}
                  <div className="px-3 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded mx-2 mt-3">
                    📈 {t.navigation.analytics.title}
                  </div>
                  <Link
                    to="/visualizations/interest-growth"
                    onClick={() => setIsAccountDropdownOpen(false)}
                    className="block px-6 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-md mx-2"
                  >
                    📈 {t.navigation.analytics.interestGrowth}
                  </Link>
                  <Link
                    to="/visualizations/payment-impact"
                    onClick={() => setIsAccountDropdownOpen(false)}
                    className="block px-6 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-md mx-2"
                  >
                    🚀 {t.navigation.analytics.paymentImpact}
                  </Link>
                  <Link
                    to="/visualizations/fee-analysis"
                    onClick={() => setIsAccountDropdownOpen(false)}
                    className="block px-6 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded-md mx-2"
                  >
                    📊 {t.navigation.analytics.feeAnalysis}
                  </Link>
                </div>
              </div>

              <Link
                to="/education"
                onClick={() => setIsAccountDropdownOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                🎓 {t.common.learn}
              </Link>
              <Link
                to="/learning/scenarios"
                onClick={() => setIsAccountDropdownOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                🎯 {t.common.scenarios}
              </Link>

              {/* Language Selector in Mobile */}
              <div className="px-3 py-2">
                <LanguageSelector className="w-full" />
              </div>

              <div className="border-t border-gray-200 my-2"></div>
              <Link
                to="/profile"
                onClick={() => setIsAccountDropdownOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              >
                ⚙️ {t.common.profileSettings}
              </Link>
              {state.user?.role === "ADMIN" && (
                <Link
                  to="/admin"
                  onClick={() => setIsAccountDropdownOpen(false)}
                  className="block px-3 py-2 text-purple-700 hover:bg-purple-50 rounded-md font-semibold"
                >
                  🛡️ {t.common.adminDashboard}
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                🚪 {t.common.logout}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
