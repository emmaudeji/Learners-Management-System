"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from 'react';
import { AosOptions } from "aos";
import "aos/dist/aos.css";
import { initAOS } from '@/utils/initAOS';
import { User } from '@/types';
import { useUserStore } from '@/store/useUserStore';
import { getCurrentUser } from '@/lib/actions/user.actions';
export interface AppState {
  setIsNewUser: Dispatch<SetStateAction<boolean>>;
  isNewUser:boolean
  user:User|null
}

const GlobalContext = createContext<AppState | undefined>(undefined);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isNewUser, setIsNewUser] = useState(false)

  const {setUser,user} = useUserStore()

  // Automatically initialize AOS on mount
  useEffect(() => {
    initAOS();
    const fetchU = async () => {
          const user = await getCurrentUser()
          setUser(user!)
        }
        fetchU()
  }, []);

  const contextValue: AppState = {
   user,
   isNewUser, setIsNewUser,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): AppState => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within an AppProvider');
  }
  return context;
};
