// lib/store/useUserStore.ts
// 'use client';

// import { urls } from '@/constants/admin';
// import { signOutUser } from '@/lib/actions/user.actions';
// import { User } from '@/types';
// import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';

// interface UserState {
//   user: User | null;
//   isLoggedIn: boolean;
//   setUser: (user: User) => void;
//   clearUser: () => Promise<boolean>;
// }

// export const useUserStore = create<UserState>()(
//   devtools((set) => ({
//     user: null,
//     isLoggedIn: false,
//     setUser: (user) => set({ user, isLoggedIn: true }),
//     clearUser: async () => {
//       await signOutUser();
//       set({ user: null, isLoggedIn: false });
//       return true; // signal to redirect
//     }
//   }))
// );







// lib/store/useUserStore.ts
'use client';

import { signOutUser } from '@/lib/actions/user.actions';
import { User } from '@/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  clearUser: () => Promise<boolean>;
}

export const useUserStore = create<UserState>()(
  devtools(
      (set) => ({
        user: null,
        isLoggedIn: false,
        setUser: (user) => set({ user, isLoggedIn: true }),
        clearUser: async () => {
          await signOutUser();
          set({ user: null, isLoggedIn: false });
          localStorage.removeItem('user-store');
      return true; // signal to redirect

        },

      }),
  )
);
