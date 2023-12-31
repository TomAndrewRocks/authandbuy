import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const usePinStore = create(
  persist(
    (set, get) => ({
      pin: '',
      setPin: (newPin: string) => {
        set({ pin: newPin });
      },
    }),
    {
      name: 'pin-store',
      getStorage: () => AsyncStorage,
    },
  ),
);
