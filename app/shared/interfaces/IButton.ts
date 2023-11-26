import { StyleProp, ViewStyle } from 'react-native';

export interface IButton {
  onPress: () => void;
  icon?: string;
  title?: string;
  bgColor: string;
  mode?: 'text' | 'contained' | 'outlined' | 'elevated' | 'contained-tonal' | undefined;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
}
