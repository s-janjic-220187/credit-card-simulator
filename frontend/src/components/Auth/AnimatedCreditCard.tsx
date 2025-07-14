import React from 'react';
import './AnimatedCreditCard.css';

interface AnimatedCreditCardProps {
  className?: string;
}

const AnimatedCreditCard: React.FC<AnimatedCreditCardProps> = ({ className = '' }) => {
  return (
    <div className={`animated-card-container ${className}`}>
      <div className="credit-card">
        <div className="card-front">
          {/* Card gradient background */}
          <div className="card-background"></div>
          
          {/* EMV Chip */}
          <div className="chip">
            <div className="chip-line"></div>
            <div className="chip-line"></div>
            <div className="chip-line"></div>
            <div className="chip-line"></div>
          </div>
          
          {/* Card Logo */}
          <div className="card-logo">
            <div className="logo-circle"></div>
            <div className="logo-circle"></div>
          </div>
          
          {/* Card Number */}
          <div className="card-number">
            <span className="number-group">5432</span>
            <span className="number-group">1098</span>
            <span className="number-group">7654</span>
            <span className="number-group">3210</span>
          </div>
          
          {/* Card Holder Name */}
          <div className="card-holder">
            <div className="card-holder-label">CARD HOLDER</div>
            <div className="card-holder-name">SJ-CCMS USER</div>
          </div>
          
          {/* Expiry Date */}
          <div className="card-expiry">
            <div className="expiry-label">EXPIRES</div>
            <div className="expiry-date">12/30</div>
          </div>
          
          {/* Brand Name */}
          <div className="card-brand">SJ-CCMS</div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCreditCard;
