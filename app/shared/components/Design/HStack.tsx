import { StackProps } from '@interfaces/IStack';
import tw from '@provider/tw';
import { View } from 'react-native';

export default function HStack({ children, style }: StackProps) {
  return <View style={!style ? tw`flex-row gap-2` : tw`flex-row gap-2 ${style}`}>{children}</View>;
}
