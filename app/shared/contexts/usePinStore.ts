import { PinInputProps } from '@interfaces/IPin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decryptData, encryptData } from '@utils/useEncryption';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const usePinStore = create(
  persist<PinInputProps>(
    (set, get) => ({
      pin: '',
      setPin: async (newPin: string) => {
        try {
          const encryptedPin = await encryptData(newPin, 'enc');
          set({ pin: encryptedPin });
        } catch (error) {
          console.error('Error encrypting PIN:', error);
        }
      },
      getDecryptedPin: async () => {
        try {
          const storedPin = get().pin;
          if (!storedPin) return '';

          const decryptedPin = await decryptData(`${storedPin}`, 'enc');
          return decryptedPin;
        } catch (error) {
          console.error('Error decrypting PIN:', error);
          return '';
        }
      },
    }),
    {
      name: 'pin-store',
      getStorage: () => AsyncStorage,
    },
  ),
);
