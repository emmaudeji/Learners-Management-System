// lib/store/useUserStore.ts
'use client';

import { User } from '@/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoggedIn: false,
        setUser: (user) => set({ user, isLoggedIn: true }),
        clearUser: () => set({ user: null, isLoggedIn: false }),
      }),
      {
        name: 'user-store',
      }
    )
  )
);
