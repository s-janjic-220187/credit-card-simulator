import React from 'react';

const TestComponent: React.FC = () => {
  console.log('✅ TestComponent is rendering!');
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      border: '2px solid #333',
      margin: '20px',
      textAlign: 'center'
    }}>
      <h1>🎯 React is Working!</h1>
      <p>If you see this, React is loading correctly.</p>
      <p>Check the browser console for debug logs.</p>
    </div>
  );
};

export default TestComponent;
