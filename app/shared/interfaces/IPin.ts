export interface PinInputProps {
  pin: string | null;
  setPin: (newPin: string) => void;
  length?: number;
  getDecryptedPin: () => void;
}
