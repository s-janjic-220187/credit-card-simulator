import React, { useState } from 'react';
import { useUser, useUserActions } from '../../contexts/UserContext';
import { creditCardService } from '../../services/creditCardService';
import api from '../../services/api';

const CreditCardCreate: React.FC = () => {
  const { state } = useUser();
  const { addCreditCard, goToStep } = useUserActions();
  
  const [formData, setFormData] = useState({
    cardholderName: state.profile ? `${state.profile.firstName} ${state.profile.lastName}` : '',
    creditLimit: 1000,
    apr: 18.9,
    cycleStartDate: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'creditLimit' || name === 'apr' || name === 'cycleStartDate' 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('🎯 Creating credit card using service...');
      const cardData = {
        cardholderName: formData.cardholderName,
        creditLimit: formData.creditLimit,
        apr: formData.apr,
        cycleStartDate: formData.cycleStartDate,
      };

      const newCard = await creditCardService.createCreditCard(cardData, state.user!.id);
      
      console.log('✅ Credit card created successfully:', newCard);
      addCreditCard(newCard);
      goToStep('dashboard');
    } catch (error) {
      console.error('❌ Failed to create credit card:', error);
      setError(error instanceof Error ? error.message : 'Failed to create credit card');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDemo = async () => {
    setIsLoading(true);
    setError('');

    try {
      console.log('Creating demo data...');
      
      // Use the api service to make the request with proper URL routing
      const response = await api.post('/demo/create');
      console.log('Demo creation response:', response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to create demo data');
      }

      // The demo creates user, profile, and credit card
      console.log('Demo data created successfully');
      window.location.reload(); // Simple way to refresh with new data
    } catch (error) {
      console.error('Demo creation error:', error);
      setError(error instanceof Error ? error.message : 'Failed to create demo data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkipForNow = () => {
    goToStep('dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Your First Credit Card</h2>
          <p className="text-gray-600 mt-2">Set up a credit card to start using the simulator</p>
        </div>

        {state.creditCards.length === 0 && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <div className="text-blue-600 mr-2">💡</div>
              <h3 className="font-medium text-blue-900">Getting Started</h3>
            </div>
            <p className="text-blue-800 text-sm">
              You need at least one credit card to use the billing cycle features. 
              You can create a custom card below or use our demo data for quick testing.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Demo Option */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">🚀 Quick Start Option</h3>
            <p className="text-gray-600 text-sm mb-3">
              Create demo data including a user profile and credit card with sample settings.
            </p>
            <button
              onClick={handleCreateDemo}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Demo Card'}
            </button>
          </div>

          {/* Manual Creation */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">✏️ Create Custom Card</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  id="cardholderName"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="creditLimit" className="block text-sm font-medium text-gray-700 mb-1">
                    Credit Limit ($)
                  </label>
                  <input
                    type="number"
                    id="creditLimit"
                    name="creditLimit"
                    value={formData.creditLimit}
                    onChange={handleChange}
                    min="100"
                    max="50000"
                    step="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="apr" className="block text-sm font-medium text-gray-700 mb-1">
                    APR (%)
                  </label>
                  <input
                    type="number"
                    id="apr"
                    name="apr"
                    value={formData.apr}
                    onChange={handleChange}
                    min="0"
                    max="30"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cycleStartDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Billing Cycle Start Date
                </label>
                <select
                  id="cycleStartDate"
                  name="cycleStartDate"
                  value={formData.cycleStartDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>
                      {day}{day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'} of each month
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Creating Card...' : 'Create Credit Card'}
              </button>
            </form>
          </div>

          {/* Skip Option */}
          <div className="text-center">
            <button
              onClick={handleSkipForNow}
              className="text-gray-600 hover:text-gray-800 text-sm underline"
            >
              Skip for now (you can add cards later)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardCreate;
