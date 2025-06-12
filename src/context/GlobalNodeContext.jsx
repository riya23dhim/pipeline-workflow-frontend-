
import React, { createContext, useContext, useState } from 'react';

const GlobalNodeContext = createContext();

export const useGlobalNodeStyle = () => {
  const context = useContext(GlobalNodeContext);
  if (!context) {
    throw new Error('useGlobalNodeStyle must be used within a GlobalNodeProvider');
  }
  return context;
};

export const GlobalNodeProvider = ({ children }) => {
  const [globalStyle, setGlobalStyle] = useState({
    backgroundColor:'#fffafa',
    theme: {
      name: 'Light',
      band: '#a8c5f0',
      bg: '#fcfdff',
      border: '#e8e9f3'
    },
    handleStyle: 'circle',
    animation: 'none',
    isAnimating: true,

  });

  const updateGlobalStyle = (updates) => {
    setGlobalStyle(prev => ({ ...prev, ...updates }));
  };

  const triggerGlobalAnimation = () => {
    setGlobalStyle(prev => ({ ...prev, isAnimating: true }));
    setTimeout(() => {
      setGlobalStyle(prev => ({ ...prev, isAnimating: false }));
    }, 1000);
  };

  return (
    <GlobalNodeContext.Provider value={{
      globalStyle,
      updateGlobalStyle,
      triggerGlobalAnimation
    }}>
      {children}
    </GlobalNodeContext.Provider>
  );
};
