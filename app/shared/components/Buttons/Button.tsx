import tw from "@provider/tw";
import { createContext, useContext, useState } from "react";
import {
  Pressable,
  PressableProps,
  Text,
  View,
  TextProps,
  ViewStyle,
} from "react-native";

export type ButtonVariant =
  | "default"
  | "success"
  | "destructive"
  | "info"
  | "warning";

const twColors = {
  default: {
    bg: tw`bg-default-bg`,
    hover: tw`bg-default-hover`,
  },
  success: {
    bg: tw`bg-success-bg`,
    hover: tw`bg-success-hover`,
  },
  destructive: {
    bg: tw`bg-destructive-bg`,
    hover: tw`bg-destructive-hover`,
  },
  warning: {
    bg: tw`bg-warning-bg`,
    hover: tw`bg-warning-hover`,
  },
  primary: {
    bg: tw`bg-primary-bg`,
    hover: tw`bg-primary-hover`,
  },
};

const twSizes = {
  sm: tw`h-8 px-3`,
  md: tw`h-10 px-4`,
  lg: tw`h-12 px-5`,
};

interface ButtonProps extends PressableProps {
  variant?: keyof typeof twColors;
  size?: keyof typeof twSizes;
  text?: string;
  selected?: boolean;
}

const VariantContext = createContext("default");

export const ButtonText = ({ style, children }: TextProps) => {
  const variant = useContext(VariantContext);

  const variants: any = {
    default: tw`text-neutral-50 dark:text-neutral-900`,
    success: tw`text-green-50`,
    destructive: tw`text-red-50`,
    warning: tw`text-orange-50`,
    primary: tw`text-blue-50`,
  };

  return (
    <Text style={[tw`font-bold`, variants[variant], style]}>{children}</Text>
  );
};

/**
 * React Native button component built with tw CSS
 */
export const Button = ({
  text,
  variant = "default",
  size = "md",
  selected,
  style,
  children,
  ...props
}: ButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const renderContent = () => {
    if (text) {
      return (
        <View style={tw`flex flex-row items-center gap-2`}>
          <ButtonText>{text}</ButtonText>
        </View>
      );
    }

    if (text) {
      return <ButtonText>{text}</ButtonText>;
    }

    if (typeof children === "string") {
      return <ButtonText>{children}</ButtonText>;
    }

    return <>{children}</>;
  };

  return (
    <Pressable
      {...props}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        tw`flex items-center justify-center rounded-md`,
        twSizes[size],
        twColors[variant].bg,
        hovered || pressed || selected ? twColors[variant].hover : null,
        style as ViewStyle,
      ]}
    >
      <VariantContext.Provider value={variant}>
        {renderContent()}
      </VariantContext.Provider>
    </Pressable>
  );
};
