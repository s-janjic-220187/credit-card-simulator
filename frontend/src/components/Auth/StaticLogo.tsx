import React from "react";
import { useI18n } from "../../contexts/I18nContext";
import "./StaticLogo.css";

interface StaticLogoProps {
  className?: string;
}

const StaticLogo: React.FC<StaticLogoProps> = ({ className = "" }) => {
  const { t } = useI18n();

  return (
    <div className={`static-logo-container ${className}`}>
      <div className="logo-content">
        <h1 className="brand-name">SJ-CCMS</h1>
        <p className="brand-subtitle">{t.dashboard.footer.description}</p>
      </div>
    </div>
  );
};

export default StaticLogo;
