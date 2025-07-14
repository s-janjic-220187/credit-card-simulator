/**
 * Logout Page Component
 * 
 * Handles user logout functionality and provides options for switching accounts
 * or returning to login. Displays confirmation and handles cleanup.
 * 
 * Features:
 * - Confirmation dialog before logout
 * - User account switching options
 * - Clean state management
 * - Elegant transition back to login
 * 
 * @author Credit Card Simulator Team
 * @version 1.0.0
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useUserActions } from '../contexts/UserContext';

const LogoutPage = () => {
  const navigate = useNavigate();
  const { state } = useUser();
  const { logout } = useUserActions();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    // Simulate logout process with a brief delay for UX
    setTimeout(() => {
      logout();
      // Don't navigate anywhere - the AppCoordinator will handle showing the login UI
    }, 1500);
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  const handleSwitchAccount = () => {
    logout();
    // Don't navigate anywhere - the AppCoordinator will handle showing the login UI
  };

  useEffect(() => {
    // If user is not logged in, this component shouldn't be accessible
    // The AppCoordinator will handle showing the login UI
    if (!state.user) {
      navigate('/', { replace: true });
    }
  }, [state.user, navigate]);

  if (isLoggingOut) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full mx-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Logging out...</h2>
          <p className="text-gray-600">Please wait while we securely sign you out.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign Out</h2>
          <p className="text-gray-600">
            Are you sure you want to sign out?
          </p>
          {state.user && (
            <p className="text-sm text-gray-500 mt-2">
              Currently signed in as: <span className="font-medium">{state.profile?.firstName || state.user.email}</span>
            </p>
          )}
        </div>

        <div className="space-y-3">
          {/* Confirm Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            🚪 Yes, Sign Out
          </button>

          {/* Switch Account */}
          <button
            onClick={handleSwitchAccount}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            🔄 Switch Account
          </button>

          {/* Cancel */}
          <button
            onClick={handleCancel}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            ← Cancel
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Your session data will be cleared when you sign out.
            <br />
            Make sure to save any important work before continuing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
