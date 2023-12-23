import { StyleProp, ViewStyle } from 'react-native';

export interface IButton {
  onPress: () => void;
  icon?: string;
  title?: string;
  bgColor?: string;
  type?: 'clear' | 'solid' | 'outline' | undefined;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
}
