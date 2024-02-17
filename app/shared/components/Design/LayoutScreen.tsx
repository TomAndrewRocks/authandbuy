// import Navbar from '@components/Navbar';
import Navbar from "@components/Navbar";
import { useAuthStore } from "@contexts/useUserStore";
import tw from "@provider/tw";
import React from "react";
import { View } from "react-native";

type LayoutScreenProps = {
  children: React.ReactNode;
};

export default function LayoutScreen({ children }: LayoutScreenProps) {
  const { isUserLogged } = useAuthStore();
  return (
    <>
      {isUserLogged && <Navbar />}
      <View style={[tw`flex-1 items-center justify-center`]}>{children}</View>
    </>
  );
}
