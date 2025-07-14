import React from 'react';
import { useUser } from '../../contexts/UserContext';

const DebugState: React.FC = () => {
  const { state } = useUser();

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border-2 border-blue-500 max-w-md z-50">
      <h3 className="font-bold text-lg mb-2 text-blue-600">Debug State</h3>
      <div className="space-y-2 text-sm">
        <div>
          <strong>Is Authenticated:</strong> {state.isAuthenticated ? '✅ Yes' : '❌ No'}
        </div>
        <div>
          <strong>Current Step:</strong> {state.currentStep}
        </div>
        <div>
          <strong>Is Loading:</strong> {state.isLoading ? '⏳ Yes' : '✅ No'}
        </div>
        <div>
          <strong>User:</strong> {state.user ? (
            <div className="ml-2">
              <div>ID: {state.user.id}</div>
              <div>Email: {state.user.email}</div>
            </div>
          ) : '❌ None'}
        </div>
        <div>
          <strong>Profile:</strong> {state.profile ? (
            <div className="ml-2">
              <div>Name: {state.profile.firstName} {state.profile.lastName}</div>
            </div>
          ) : '❌ None'}
        </div>
        <div>
          <strong>Credit Cards:</strong> {state.creditCards.length > 0 ? (
            <div className="ml-2">
              <div>Count: {state.creditCards.length}</div>
              {state.creditCards.map(card => (
                <div key={card.id}>• {card.cardholderName}</div>
              ))}
            </div>
          ) : '❌ None'}
        </div>
      </div>
    </div>
  );
};

export default DebugState;
