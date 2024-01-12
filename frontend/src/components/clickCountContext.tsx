import React, { useState, createContext, useContext } from 'react';

type ClickCountContextType = {
  count: number;
  incrementCount: () => void;
};

const ClickCountContext = createContext<ClickCountContextType>({
  count: 0,
  incrementCount: () => {}
});

export const useClickCount = () => useContext(ClickCountContext);

type ClickCountProviderProps = {
  children: React.ReactNode;
};

export const ClickCountProvider: React.FC<ClickCountProviderProps> = ({ children }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <ClickCountContext.Provider value={{ count, incrementCount }}>
      {children}
    </ClickCountContext.Provider>
  );

};

