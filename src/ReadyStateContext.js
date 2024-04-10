import React, { createContext, useState, useContext } from 'react';

// Creating the context
const ReadyStateContext = createContext();

// Provider component that wraps your app and makes the ready state accessible to any child component
export const ReadyStateProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  // Function to set ready state to true
  const makeReady = () => setIsReady(true);
  
  // Function to reset ready state to false
  const resetReady = () => setIsReady(false);

  return (
    <ReadyStateContext.Provider value={{ isReady, makeReady, resetReady }}>
      {children}
    </ReadyStateContext.Provider>
  );
};

// Custom hook to use the ready state in components
export const useReadyState = () => useContext(ReadyStateContext);
