"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AosOptions } from "aos";
import "aos/dist/aos.css";
import { initAOS } from '@/utils/initAOS';
 

export interface AppState {
  // modal:  null|string;
  // query:  null|string;
  // setModal: (modal: null|string) => void;
  // setQuery: (modal: null|string) => void;
  // initAOS: (options?: Partial<AosOptions>) => void;
}

export interface GlobalContextProps extends AppState {
  // Add other context properties or methods here if needed in the future
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const [modal, setModal] = useState<string|null>('');
  // const [query, setQuery] = useState<string|null>('');

  // Automatically initialize AOS on mount
  useEffect(() => {
    initAOS();
  }, []);

  const contextValue: GlobalContextProps = {
    // modal, setModal, 
    // query, setQuery, 
    // initAOS,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within an AppProvider');
  }
  return context;
};
