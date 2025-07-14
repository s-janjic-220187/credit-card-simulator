import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface BillingCycle {
  id: string;
  cycleNumber: number;
  startDate: string;
  endDate: string;
  dueDate: string;
  startingBalance: number;
  endingBalance: number;
  averageDailyBalance: number;
  totalPurchases: number;
  totalPayments: number;
  interestCharged: number;
  feesCharged: number;
  minimumPayment: number;
  isPaid: boolean;
  isOverdue: boolean;
}

interface BillingCycleDashboardProps {
  creditCardId?: string;
}

const BillingCycleDashboard: React.FC<BillingCycleDashboardProps> = ({ creditCardId = 'demo-card' }) => {
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle | null>(null);

  const { data: billingCycles, isLoading } = useQuery({
    queryKey: ['billingCycles', creditCardId],
    queryFn: async () => {
      const response = await fetch(`/api/billing/cycles/${creditCardId}`);
      const result = await response.json();
      return result.data as BillingCycle[];
    },
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const generateNewCycle = async () => {
    try {
      const response = await fetch(`/api/billing/cycle/${creditCardId}`, {
        method: 'POST',
      });
      if (response.ok) {
        // Refresh the cycles list
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to generate billing cycle:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            💳 Billing Cycle Dashboard
          </h1>
          <button
            onClick={generateNewCycle}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Generate New Cycle
          </button>
        </div>
        <p className="text-gray-600">
          Track and analyze credit card billing cycles, interest calculations, and fee structures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Billing Cycles List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Billing Cycles</h2>
            <div className="space-y-3">
              {billingCycles?.map((cycle) => (
                <div
                  key={cycle.id}
                  onClick={() => setSelectedCycle(cycle)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors $\{
                    selectedCycle?.id === cycle.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">
                      Cycle #{cycle.cycleNumber}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium $\{
                        cycle.isPaid
                          ? 'bg-green-100 text-green-800'
                          : cycle.isOverdue
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {cycle.isPaid ? 'Paid' : cycle.isOverdue ? 'Overdue' : 'Current'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}
                  </div>
                  <div className="text-sm font-medium text-gray-900 mt-1">
                    Balance: {formatCurrency(cycle.endingBalance)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cycle Details */}
        <div className="lg:col-span-2">
          {selectedCycle ? (
            <div className="space-y-6">
              {/* Cycle Overview */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Cycle #{selectedCycle.cycleNumber} Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(selectedCycle.startingBalance)}
                    </div>
                    <div className="text-sm text-gray-600">Starting Balance</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(selectedCycle.totalPurchases)}
                    </div>
                    <div className="text-sm text-gray-600">Total Purchases</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {formatCurrency(selectedCycle.endingBalance)}
                    </div>
                    <div className="text-sm text-gray-600">Ending Balance</div>
                  </div>
                </div>
              </div>

              {/* Interest and Fees Breakdown */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">💰 Interest & Fees</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Daily Balance:</span>
                      <span className="font-medium">
                        {formatCurrency(selectedCycle.averageDailyBalance)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Charged:</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(selectedCycle.interestCharged)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fees Charged:</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(selectedCycle.feesCharged)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Payments:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(selectedCycle.totalPayments)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minimum Payment:</span>
                      <span className="font-medium">
                        {formatCurrency(selectedCycle.minimumPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Date:</span>
                      <span className="font-medium">
                        {formatDate(selectedCycle.dueDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Educational Information */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-900">
                  📚 How This Cycle Was Calculated
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white rounded-lg p-4">
                    <strong>Interest Calculation:</strong>
                    <p className="mt-1 text-gray-700">
                      Daily interest rate × Average daily balance × Days in cycle = 
                      Interest charge ({formatCurrency(selectedCycle.interestCharged)})
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <strong>Average Daily Balance:</strong>
                    <p className="mt-1 text-gray-700">
                      Sum of daily balances ÷ Number of days in cycle = 
                      {formatCurrency(selectedCycle.averageDailyBalance)}
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <strong>Minimum Payment:</strong>
                    <p className="mt-1 text-gray-700">
                      Typically 2-3% of balance or $35 (whichever is higher), 
                      plus interest and fees = {formatCurrency(selectedCycle.minimumPayment)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a Billing Cycle
              </h3>
              <p className="text-gray-600">
                Choose a billing cycle from the list to view detailed calculations,
                interest breakdowns, and educational information.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingCycleDashboard;
