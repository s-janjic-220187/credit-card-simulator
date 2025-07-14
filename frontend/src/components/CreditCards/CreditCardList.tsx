import React from 'react';
import { CreditCard } from '../../types';

interface CreditCardListProps {
  creditCards: CreditCard[];
  onCardSelect?: (card: CreditCard) => void;
}

const CreditCardList: React.FC<CreditCardListProps> = ({ creditCards, onCardSelect }) => {
  const formatCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCardTypeClass = (cardType: string) => {
    switch (cardType.toLowerCase()) {
      case 'visa': return 'bg-blue-600';
      case 'mastercard': return 'bg-red-600';
      case 'american_express': return 'bg-green-600';
      case 'discover': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getCardStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-600';
      case 'INACTIVE': return 'text-red-600';
      case 'SUSPENDED': return 'text-yellow-600';
      case 'CLOSED': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  if (creditCards.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <div className="text-gray-500 text-lg mb-2">No Credit Cards</div>
        <p className="text-gray-400">You don't have any credit cards yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {creditCards.map((card) => (
        <div
          key={card.id}
          className={`relative rounded-lg p-6 text-white shadow-lg cursor-pointer transform transition-transform hover:scale-105 ${getCardTypeClass(card.cardType)}`}
          onClick={() => onCardSelect && onCardSelect(card)}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="text-sm font-medium opacity-90">
              {card.cardType.toUpperCase()}
            </div>
            <div className={`text-sm font-medium ${getCardStatusColor(card.status)}`}>
              {card.status}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-lg font-mono tracking-wider">
              {formatCardNumber(card.cardNumber)}
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs opacity-75 uppercase">Cardholder</div>
              <div className="text-sm font-medium">
                {card.user?.firstName} {card.user?.lastName}
              </div>
            </div>
            <div>
              <div className="text-xs opacity-75 uppercase">Expires</div>
              <div className="text-sm font-medium">
                {new Date(card.expiryDate).toLocaleDateString('en-US', { 
                  month: '2-digit', 
                  year: '2-digit' 
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white border-opacity-20">
            <div className="flex justify-between text-xs">
              <div>
                <div className="opacity-75">Available</div>
                <div className="font-semibold">
                  {formatCurrency(card.creditLimit - card.currentBalance)}
                </div>
              </div>
              <div>
                <div className="opacity-75">Limit</div>
                <div className="font-semibold">
                  {formatCurrency(card.creditLimit)}
                </div>
              </div>
              <div>
                <div className="opacity-75">Balance</div>
                <div className="font-semibold">
                  {formatCurrency(card.currentBalance)}
                </div>
              </div>
            </div>
          </div>

          {/* Usage indicator */}
          <div className="mt-3">
            <div className="w-full bg-white bg-opacity-20 rounded-full h-1">
              <div
                className="bg-white h-1 rounded-full transition-all duration-300"
                style={{
                  width: `${(card.currentBalance / card.creditLimit) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreditCardList;
