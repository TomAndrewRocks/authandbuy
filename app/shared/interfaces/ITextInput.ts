import { FieldError } from 'react-hook-form';
import { StyleProp, TextStyle } from 'react-native';

export interface ITextInput {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: () => void;
  onBlur?: () => void;
  color?: StyleProp<TextStyle>;
  fieldError?: FieldError | undefined;
  icon: string;
}
