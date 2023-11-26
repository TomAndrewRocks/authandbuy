import { IUser } from '@interfaces/IUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<IUser>(
  persist(
    (set) => ({
      isUserLogged: false,
      userID: '',
      setUserID: (id: string) =>
        set(() => ({
          userID: id,
        })),
      setUserLogged: (value: boolean) =>
        set(() => ({
          isUserLogged: value,
        })),
    }),
    {
      name: 'auth-store',
      //   getStorage: () => AsyncStorage,
    },
  ),
);
