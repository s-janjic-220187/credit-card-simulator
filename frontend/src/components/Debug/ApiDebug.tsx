import React, { useState, useEffect } from 'react';
import { checkApiHealth } from '../../services/api';

const ApiDebug: React.FC = () => {
  const [healthCheck, setHealthCheck] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);

  const runHealthCheck = async () => {
    setIsChecking(true);
    const result = await checkApiHealth();
    setHealthCheck(result);
    setIsChecking(false);
  };

  useEffect(() => {
    // Run initial health check
    runHealthCheck();
  }, []);

  // Show in production for debugging Railway issues
  // if (!import.meta.env.DEV) {
  //   return null; // Only show in development
  // }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-md z-50">
      <h3 className="text-sm font-bold mb-2">🔧 API Debug Info</h3>
      
      <div className="text-xs space-y-1 mb-3">
        <div><strong>Environment:</strong> {import.meta.env.DEV ? 'Development' : 'Production'}</div>
        <div><strong>Hostname:</strong> {window.location.hostname}</div>
        <div><strong>VITE_API_BASE_URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'Not set'}</div>
        <div><strong>Current Origin:</strong> {window.location.origin}</div>
      </div>

      <button
        onClick={runHealthCheck}
        disabled={isChecking}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-3 py-1 rounded text-xs mb-2"
      >
        {isChecking ? 'Testing...' : 'Test API'}
      </button>

      {healthCheck && (
        <div className={`text-xs p-2 rounded ${healthCheck.success ? 'bg-green-800' : 'bg-red-800'}`}>
          <div><strong>Status:</strong> {healthCheck.success ? '✅ Success' : '❌ Failed'}</div>
          {healthCheck.success ? (
            <div><strong>Response:</strong> {JSON.stringify(healthCheck.data)}</div>
          ) : (
            <div><strong>Error:</strong> {healthCheck.error?.message}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiDebug;
