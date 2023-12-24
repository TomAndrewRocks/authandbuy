import { CreditCardProps, ICreditCardProps } from '@interfaces/ICreditCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decryptData, encryptData } from '@utils/useEncryption';
import create, { GetState, SetState } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCreditCardStore = create<ICreditCardProps>(
  persist<ICreditCardProps>(
    (set: SetState<ICreditCardProps>, get: GetState<ICreditCardProps>) => {
      return {
        creditCardList: [] as (CreditCardProps & { encryptedData: ArrayBuffer })[],
        addCreditCardToList: async (flag: string, cardNumber: string) => {
          try {
            const sensitiveData = {
              flag,
              cardNumber,
            };
            const encryptedData = await encryptData(JSON.stringify(sensitiveData));

            set((state) => ({
              creditCardList: [
                ...state.creditCardList,
                {
                  flag,
                  cardNumber,
                  encryptedData,
                },
              ],
            }));
          } catch (error) {
            console.error('Erro ao criptografar dados:', error);
          }
        },
        getDecryptedCreditCardList: async () => {
          const state = get();

          const decryptedList = await Promise.all(
            state.creditCardList.map(async (card) => {
              try {
                const decryptedData = await decryptData(card.cardNumber);
                const decryptedObject = JSON.parse(
                  new TextDecoder().decode(JSON.parse(JSON.stringify(decryptData))),
                ) as {
                  flag: string;
                  cardNumber: string;
                };
                return {
                  flag: decryptedObject.flag,
                  cardNumber: decryptedObject.cardNumber,
                };
              } catch (error) {
                console.error('Erro ao descriptografar dados:', error);
                return null;
              }
            }),
          );
          return decryptedList.filter((card) => card !== null) as CreditCardProps[];
        },
      };
    },
    {
      name: 'payment-list',
      getStorage: () => AsyncStorage,
    },
  ),
);
