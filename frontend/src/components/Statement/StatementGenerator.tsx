import React, { useState, useMemo } from 'react';

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  type: 'purchase' | 'payment' | 'fee' | 'interest' | 'credit';
}

interface StatementPeriod {
  startDate: Date;
  endDate: Date;
  paymentDueDate: Date;
}

interface StatementData {
  accountNumber: string;
  cardholderName: string;
  statementPeriod: StatementPeriod;
  previousBalance: number;
  transactions: Transaction[];
  apr: number;
  minimumPaymentPercentage: number;
  creditLimit: number;
  fees: {
    late: number;
    overlimit: number;
    foreign: number;
    cashAdvance: number;
  };
}

const StatementGenerator: React.FC = () => {
  const [statementData, setStatementData] = useState<StatementData>({
    accountNumber: '4532-****-****-1234',
    cardholderName: 'John Doe',
    statementPeriod: {
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2024, 0, 31),
      paymentDueDate: new Date(2024, 1, 25),
    },
    previousBalance: 1250.00,
    transactions: [
      {
        id: '1',
        date: new Date(2024, 0, 3),
        description: 'AMAZON.COM PURCHASE',
        amount: 89.99,
        category: 'Online Shopping',
        type: 'purchase',
      },
      {
        id: '2',
        date: new Date(2024, 0, 5),
        description: 'GROCERY STORE',
        amount: 142.50,
        category: 'Groceries',
        type: 'purchase',
      },
      {
        id: '3',
        date: new Date(2024, 0, 8),
        description: 'PAYMENT - THANK YOU',
        amount: -500.00,
        category: 'Payment',
        type: 'payment',
      },
      {
        id: '4',
        date: new Date(2024, 0, 12),
        description: 'GAS STATION',
        amount: 65.00,
        category: 'Gas',
        type: 'purchase',
      },
      {
        id: '5',
        date: new Date(2024, 0, 15),
        description: 'RESTAURANT',
        amount: 78.25,
        category: 'Dining',
        type: 'purchase',
      },
      {
        id: '6',
        date: new Date(2024, 0, 20),
        description: 'INTEREST CHARGE',
        amount: 25.42,
        category: 'Interest',
        type: 'interest',
      },
      {
        id: '7',
        date: new Date(2024, 0, 25),
        description: 'FOREIGN TRANSACTION FEE',
        amount: 3.50,
        category: 'Fee',
        type: 'fee',
      },
    ],
    apr: 23.99,
    minimumPaymentPercentage: 2.0,
    creditLimit: 5000,
    fees: {
      late: 39,
      overlimit: 25,
      foreign: 3.0,
      cashAdvance: 5.0,
    },
  });

  const [activeView, setActiveView] = useState<'statement' | 'builder' | 'analysis'>('statement');
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    date: new Date(),
    description: '',
    amount: 0,
    category: 'Purchase',
    type: 'purchase',
  });

  const calculatedValues = useMemo(() => {
    const purchases = statementData.transactions
      .filter(t => t.type === 'purchase')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const payments = statementData.transactions
      .filter(t => t.type === 'payment')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
    const fees = statementData.transactions
      .filter(t => t.type === 'fee')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const interest = statementData.transactions
      .filter(t => t.type === 'interest')
      .reduce((sum, t) => sum + t.amount, 0);

    const newBalance = statementData.previousBalance + purchases + fees + interest - payments;
    const availableCredit = statementData.creditLimit - newBalance;
    const minimumPayment = Math.max(25, newBalance * (statementData.minimumPaymentPercentage / 100));
    
    const dailyRate = statementData.apr / 100 / 365;
    const averageDailyBalance = (statementData.previousBalance + newBalance) / 2;
    const daysInCycle = Math.ceil((statementData.statementPeriod.endDate.getTime() - statementData.statementPeriod.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const calculatedInterest = averageDailyBalance * dailyRate * daysInCycle;

    return {
      purchases,
      payments,
      fees,
      interest,
      newBalance,
      availableCredit,
      minimumPayment,
      calculatedInterest,
      creditUtilization: (newBalance / statementData.creditLimit) * 100,
    };
  }, [statementData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const addTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount) {
      alert('Please fill in description and amount');
      return;
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      date: newTransaction.date || new Date(),
      description: newTransaction.description,
      amount: newTransaction.amount,
      category: newTransaction.category || 'Purchase',
      type: newTransaction.type || 'purchase',
    };

    setStatementData(prev => ({
      ...prev,
      transactions: [...prev.transactions, transaction].sort((a, b) => a.date.getTime() - b.date.getTime()),
    }));

    setNewTransaction({
      date: new Date(),
      description: '',
      amount: 0,
      category: 'Purchase',
      type: 'purchase',
    });
  };

  const removeTransaction = (id: string) => {
    setStatementData(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id),
    }));
  };

  const transactionCategories = [
    'Groceries', 'Gas', 'Dining', 'Online Shopping', 'Travel',
    'Entertainment', 'Utilities', 'Healthcare', 'Education', 'Other'
  ];

  if (activeView === 'builder') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Statement Builder</h1>
            <button
              onClick={() => setActiveView('statement')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              View Statement
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Account Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Account Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={statementData.cardholderName}
                  onChange={(e) => setStatementData(prev => ({ ...prev, cardholderName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={statementData.accountNumber}
                  onChange={(e) => setStatementData(prev => ({ ...prev, accountNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credit Limit ($)
                </label>
                <input
                  type="number"
                  value={statementData.creditLimit}
                  onChange={(e) => setStatementData(prev => ({ ...prev, creditLimit: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previous Balance ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={statementData.previousBalance}
                  onChange={(e) => setStatementData(prev => ({ ...prev, previousBalance: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  APR (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={statementData.apr}
                  onChange={(e) => setStatementData(prev => ({ ...prev, apr: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Payment (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={statementData.minimumPaymentPercentage}
                  onChange={(e) => setStatementData(prev => ({ ...prev, minimumPaymentPercentage: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Statement Period */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Statement Period</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={statementData.statementPeriod.startDate.toISOString().split('T')[0]}
                  onChange={(e) => setStatementData(prev => ({
                    ...prev,
                    statementPeriod: {
                      ...prev.statementPeriod,
                      startDate: new Date(e.target.value)
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={statementData.statementPeriod.endDate.toISOString().split('T')[0]}
                  onChange={(e) => setStatementData(prev => ({
                    ...prev,
                    statementPeriod: {
                      ...prev.statementPeriod,
                      endDate: new Date(e.target.value)
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Due Date
                </label>
                <input
                  type="date"
                  value={statementData.statementPeriod.paymentDueDate.toISOString().split('T')[0]}
                  onChange={(e) => setStatementData(prev => ({
                    ...prev,
                    statementPeriod: {
                      ...prev.statementPeriod,
                      paymentDueDate: new Date(e.target.value)
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Add Transaction */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newTransaction.date?.toISOString().split('T')[0] || ''}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, date: new Date(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newTransaction.type}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="purchase">Purchase</option>
                    <option value="payment">Payment</option>
                    <option value="fee">Fee</option>
                    <option value="interest">Interest</option>
                    <option value="credit">Credit</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., AMAZON.COM PURCHASE"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {transactionCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <button
                onClick={addTransaction}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                Add Transaction
              </button>
            </div>
          </div>

          {/* Current Transactions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Current Transactions ({statementData.transactions.length})</h2>
            <div className="space-y-2">
              {statementData.transactions.map(transaction => (
                <div key={transaction.id} className="flex justify-between items-center p-3 border rounded">
                  <div className="flex-1">
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-gray-600">
                      {formatDate(transaction.date)} • {transaction.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`font-medium ${
                      transaction.type === 'payment' || transaction.type === 'credit'
                        ? 'text-green-600'
                        : transaction.type === 'fee' || transaction.type === 'interest'
                        ? 'text-red-600'
                        : 'text-gray-900'
                    }`}>
                      {transaction.type === 'payment' || transaction.type === 'credit' ? '-' : ''}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </span>
                    <button
                      onClick={() => removeTransaction(transaction.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'analysis') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Statement Analysis</h1>
            <button
              onClick={() => setActiveView('statement')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              View Statement
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Key Metrics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Credit Utilization:</span>
                <span className={`font-medium ${
                  calculatedValues.creditUtilization > 30 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {calculatedValues.creditUtilization.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Available Credit:</span>
                <span className="font-medium">{formatCurrency(calculatedValues.availableCredit)}</span>
              </div>
              <div className="flex justify-between">
                <span>Interest This Period:</span>
                <span className="font-medium text-red-600">{formatCurrency(calculatedValues.interest)}</span>
              </div>
              <div className="flex justify-between">
                <span>Fees This Period:</span>
                <span className="font-medium text-red-600">{formatCurrency(calculatedValues.fees)}</span>
              </div>
            </div>
          </div>

          {/* Spending Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
            <div className="space-y-3">
              {transactionCategories.map(category => {
                const categoryTotal = statementData.transactions
                  .filter(t => t.category === category && t.type === 'purchase')
                  .reduce((sum, t) => sum + t.amount, 0);
                
                if (categoryTotal === 0) return null;
                
                const percentage = (categoryTotal / calculatedValues.purchases) * 100;
                
                return (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{category}</span>
                      <span>{formatCurrency(categoryTotal)} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Impact Analysis */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Impact</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Minimum Payment: {formatCurrency(calculatedValues.minimumPayment)}</h3>
                <p className="text-sm text-gray-600">
                  Paying only the minimum will result in significant interest charges over time.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Pay in Full: {formatCurrency(calculatedValues.newBalance)}</h3>
                <p className="text-sm text-gray-600">
                  Paying the full balance avoids interest charges on new purchases.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Interest Calculation</h4>
                <p className="text-sm text-yellow-700">
                  Daily Rate: {(statementData.apr / 365).toFixed(4)}%<br />
                  Average Daily Balance: {formatCurrency((statementData.previousBalance + calculatedValues.newBalance) / 2)}<br />
                  Interest Charged: {formatCurrency(calculatedValues.calculatedInterest)}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-900">Recommendations</h2>
            <div className="space-y-3 text-sm">
              {calculatedValues.creditUtilization > 30 && (
                <div className="bg-white rounded-lg p-3">
                  <strong>High Credit Utilization:</strong>
                  <p className="mt-1 text-gray-700">
                    Your utilization is {calculatedValues.creditUtilization.toFixed(1)}%. 
                    Consider paying down balance to below 30% to improve credit score.
                  </p>
                </div>
              )}
              
              {calculatedValues.interest > 0 && (
                <div className="bg-white rounded-lg p-3">
                  <strong>Interest Charges:</strong>
                  <p className="mt-1 text-gray-700">
                    You paid {formatCurrency(calculatedValues.interest)} in interest. 
                    Pay your full balance to avoid interest charges.
                  </p>
                </div>
              )}
              
              {calculatedValues.fees > 0 && (
                <div className="bg-white rounded-lg p-3">
                  <strong>Fees Charged:</strong>
                  <p className="mt-1 text-gray-700">
                    You were charged {formatCurrency(calculatedValues.fees)} in fees. 
                    Review fee policies to avoid future charges.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Statement View
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">📄 Credit Card Statement</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveView('builder')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Edit Statement
            </button>
            <button
              onClick={() => setActiveView('analysis')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              View Analysis
            </button>
          </div>
        </div>
        <p className="text-gray-600">
          Generate and analyze realistic credit card statements to understand billing cycles, 
          interest calculations, and payment strategies.
        </p>
      </div>

      {/* Statement Header */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-6 border-l-4 border-blue-500">
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">CREDIT CARD STATEMENT</h2>
            <div className="text-sm space-y-1">
              <div><strong>Account Holder:</strong> {statementData.cardholderName}</div>
              <div><strong>Account Number:</strong> {statementData.accountNumber}</div>
              <div><strong>Statement Period:</strong> {formatDate(statementData.statementPeriod.startDate)} - {formatDate(statementData.statementPeriod.endDate)}</div>
              <div><strong>Payment Due Date:</strong> {formatDate(statementData.statementPeriod.paymentDueDate)}</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-2">
                {formatCurrency(calculatedValues.newBalance)}
              </div>
              <div className="text-sm text-gray-600">New Balance</div>
              <div className="text-lg font-medium text-blue-600 mt-2">
                {formatCurrency(calculatedValues.minimumPayment)}
              </div>
              <div className="text-xs text-gray-600">Minimum Payment Due</div>
            </div>
          </div>
        </div>

        {/* Account Summary */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Account Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Previous Balance</div>
              <div className="font-medium">{formatCurrency(statementData.previousBalance)}</div>
            </div>
            <div>
              <div className="text-gray-600">Payments & Credits</div>
              <div className="font-medium text-green-600">-{formatCurrency(calculatedValues.payments)}</div>
            </div>
            <div>
              <div className="text-gray-600">Purchases & Advances</div>
              <div className="font-medium">{formatCurrency(calculatedValues.purchases)}</div>
            </div>
            <div>
              <div className="text-gray-600">Fees & Interest</div>
              <div className="font-medium text-red-600">{formatCurrency(calculatedValues.fees + calculatedValues.interest)}</div>
            </div>
          </div>
        </div>

        {/* Credit Information */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Credit Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-600">Credit Limit</div>
              <div className="font-medium">{formatCurrency(statementData.creditLimit)}</div>
            </div>
            <div>
              <div className="text-gray-600">Available Credit</div>
              <div className="font-medium">{formatCurrency(calculatedValues.availableCredit)}</div>
            </div>
            <div>
              <div className="text-gray-600">Credit Utilization</div>
              <div className={`font-medium ${
                calculatedValues.creditUtilization > 30 ? 'text-red-600' : 'text-green-600'
              }`}>
                {calculatedValues.creditUtilization.toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-gray-600">Annual Percentage Rate</div>
              <div className="font-medium">{statementData.apr.toFixed(2)}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
        <div className="space-y-1 text-sm">
          <div className="grid grid-cols-12 gap-2 font-medium text-gray-700 border-b pb-2">
            <div className="col-span-2">Date</div>
            <div className="col-span-6">Description</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>
          
          {statementData.transactions.map(transaction => (
            <div key={transaction.id} className="grid grid-cols-12 gap-2 py-2 border-b border-gray-100">
              <div className="col-span-2">{formatDate(transaction.date)}</div>
              <div className="col-span-6">{transaction.description}</div>
              <div className="col-span-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  transaction.type === 'purchase' ? 'bg-blue-100 text-blue-800' :
                  transaction.type === 'payment' ? 'bg-green-100 text-green-800' :
                  transaction.type === 'fee' ? 'bg-red-100 text-red-800' :
                  transaction.type === 'interest' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {transaction.category}
                </span>
              </div>
              <div className={`col-span-2 text-right font-medium ${
                transaction.type === 'payment' || transaction.type === 'credit'
                  ? 'text-green-600'
                  : transaction.type === 'fee' || transaction.type === 'interest'
                  ? 'text-red-600'
                  : 'text-gray-900'
              }`}>
                {transaction.type === 'payment' || transaction.type === 'credit' ? '-' : ''}
                {formatCurrency(Math.abs(transaction.amount))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4 text-orange-900">Important Payment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3">
              <strong>Payment Due Date:</strong>
              <p className="mt-1 text-gray-700">
                {formatDate(statementData.statementPeriod.paymentDueDate)}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <strong>Minimum Payment:</strong>
              <p className="mt-1 text-gray-700">
                {formatCurrency(calculatedValues.minimumPayment)} (or {statementData.minimumPaymentPercentage}% of balance, whichever is greater)
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3">
              <strong>Late Payment Fee:</strong>
              <p className="mt-1 text-gray-700">
                Up to {formatCurrency(statementData.fees.late)} if payment is received after due date
              </p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <strong>Interest Calculation:</strong>
              <p className="mt-1 text-gray-700">
                Interest is calculated daily on your average daily balance at {statementData.apr.toFixed(2)}% APR
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatementGenerator;
