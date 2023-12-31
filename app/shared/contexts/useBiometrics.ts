import { IUserBiometrics } from '@interfaces/IBiometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useBiometrics = create<IUserBiometrics>(
  persist(
    (set) => ({
      isUserAuth: false,
      hasBiometrics: false,
      isBiometricsChecked: false,
      setUserAuth: (value: boolean) => set({ isUserAuth: value }),
      setUserBiometrics: (val) => set({ hasBiometrics: val }),
      setCheckBiometrics: (value: boolean) =>
        set(() => ({
          isBiometricsChecked: value,
        })),
    }),
    {
      name: 'biometrics-store',
      getStorage: () => AsyncStorage,
    },
    // ** state persistence localStorage/AsyncStorage
  ),
);
