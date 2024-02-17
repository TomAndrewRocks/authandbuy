import { useState } from "react";
import {
  TextInput as DefaultTextInput,
  Platform,
  TextInputProps,
} from "react-native";
import tw from "../provider/tw";
/**
 * React Native text input component built with Tailwind CSS
 */
export const TextInput = ({
  placeholderTextColor,
  ...props
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <DefaultTextInput
      {...props}
      onFocus={() => setIsFocused(!isFocused)}
      onEndEditing={() => setIsFocused(!isFocused)}
      style={[
        tw`w-full bg-neutral-100 dark:bg-neutral-900 border border-black/20 dark:border-white/20 rounded-md h-12 px-4 text-neutral-950 dark:text-neutral-50`,
        isFocused && Platform.OS !== "web" ? tw`bg-neutral-200 border-black/35` : {},
        props.style,
      ]}
      placeholderTextColor={
        placeholderTextColor || tw.color("text-neutral-500")
      }
    />
  );
};
