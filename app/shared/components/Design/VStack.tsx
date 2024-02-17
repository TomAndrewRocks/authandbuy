import { StackProps } from "@interfaces/IStack";
import tw from "@provider/tw";
import { View } from "react-native";

export default function VStack({ children, style }: StackProps) {
  return (
    <View style={!style ? tw`flex-col gap-2` : tw`flex-col gap-2 ${style}`}>
      {children}
    </View>
  );
}
