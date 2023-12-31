import { Control } from 'react-hook-form';

export interface PinInputProps {
  pin: string | Control<{ pin: string }, any>;
  setPin: (newPin: string) => void;
  length?: string;
  getDecryptedPin: () => void;
}
