import { IFormData } from '@interfaces/IForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useFormStore = create<IFormData>(
  persist(
    (set) => ({
      values: {
        name: '',
        email: '',
      },
      setValues: (newValues) => set((state) => ({ values: { ...state.values, ...newValues } })),
    }),
    { name: 'form-store', getStorage: () => AsyncStorage },
  ),
);
