import React from "react";
import TransactionManagementHub from "../components/Transactions/TransactionManagementHub";
import { useI18n } from "../contexts/I18nContext";
import { useUser } from "../contexts/UserContext";

const TransactionManagementPage: React.FC = () => {
  const { state } = useUser();
  const { t } = useI18n();

  if (!state.user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please log in to access transaction management.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {t.auth.loginButton}
          </button>
        </div>
      </div>
    );
  }

  return <TransactionManagementHub />;
};

export default TransactionManagementPage;
