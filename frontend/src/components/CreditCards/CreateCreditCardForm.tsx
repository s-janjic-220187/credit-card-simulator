import React, { useState } from 'react';

interface CreateCreditCardFormProps {
  onSubmit: (cardData: CreateCreditCardData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface CreateCreditCardData {
  cardType: string;
  creditLimit: number;
}

const CreateCreditCardForm: React.FC<CreateCreditCardFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<CreateCreditCardData>({
    cardType: 'VISA',
    creditLimit: 1000
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'creditLimit' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Apply for Credit Card</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cardType" className="block text-sm font-medium text-gray-700 mb-2">
            Card Type *
          </label>
          <select
            id="cardType"
            name="cardType"
            value={formData.cardType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="VISA">Visa</option>
            <option value="MASTERCARD">Mastercard</option>
            <option value="AMERICAN_EXPRESS">American Express</option>
            <option value="DISCOVER">Discover</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="creditLimit" className="block text-sm font-medium text-gray-700 mb-2">
            Requested Credit Limit ($) *
          </label>
          <input
            type="number"
            id="creditLimit"
            name="creditLimit"
            value={formData.creditLimit}
            onChange={handleChange}
            required
            min="500"
            max="50000"
            step="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Minimum: $500, Maximum: $50,000
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">Important Notes:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Your actual credit limit may differ based on your credit profile</li>
            <li>• This is a simulation - no real credit check will be performed</li>
            <li>• The card will be issued instantly for demonstration purposes</li>
          </ul>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Apply for Card'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCreditCardForm;
