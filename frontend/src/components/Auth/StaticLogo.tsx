import React from 'react';
import './StaticLogo.css';

interface StaticLogoProps {
  className?: string;
}

const StaticLogo: React.FC<StaticLogoProps> = ({ className = '' }) => {
  return (
    <div className={`static-logo-container ${className}`}>
      <div className="logo-content">
        <h1 className="brand-name">SJ-CCMS</h1>
        <p className="brand-subtitle">Credit Card Educational Platform</p>
      </div>
    </div>
  );
};

export default StaticLogo;
