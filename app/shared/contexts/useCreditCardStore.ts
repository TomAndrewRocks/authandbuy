import { ICreditCardProps } from '@interfaces/ICreditCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import create, { SetState } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCreditCardStore = create<ICreditCardProps>(
  persist<ICreditCardProps>(
    (set: SetState<ICreditCardProps>) => ({
      creditCardList: [],
      addCreditCardToList: (flag: string, cardNumber: string) => {
        set((state) => ({
          creditCardList: [
            ...state.creditCardList,
            {
              flag,
              cardNumber,
            },
          ],
        }));
      },
    }),
    {
      name: 'search-list',
      getStorage: () => AsyncStorage,
    },
  ),
);
