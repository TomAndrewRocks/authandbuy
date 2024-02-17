import tw from "@provider/tw";
import { Image, ImageProps } from "react-native";

interface AvatarProps extends ImageProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "rounded";
}

export const Avatar = ({
  source,
  size = "sm",
  variant = "default",
  style,
  ...props
}: AvatarProps) => {
  const variants = {
    default: tw`rounded-full`,
    rounded: tw`rounded-lg`,
  };

  const sizes = {
    xs: tw`w-12 h-12`,
    sm: tw`w-16 h-16`,
    md: tw`w-24 h-24`,
    lg: tw`w-36 h-36`,
    xl: tw`w-48 h-48`,
  };

  return (
    <Image
      style={[variants[variant], sizes[size], style]}
      source={source}
      {...props}
    />
  );
};
