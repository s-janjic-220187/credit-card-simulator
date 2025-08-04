import React from "react";
import { useI18n } from "./contexts/I18nContext";

const TestComponent: React.FC = () => {
  const { t } = useI18n();
  console.log("✅ TestComponent is rendering!");

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        border: "2px solid #333",
        margin: "20px",
        textAlign: "center",
      }}
    >
      <h1>🎯 React is Working!</h1>
      <p>{t.test.loadingMessage}</p>
      <p>{t.test.consoleMessage}</p>
    </div>
  );
};

export default TestComponent;
