import { Button } from "@components/Buttons/Button";
import LayoutScreen from "@components/Design/LayoutScreen";
import VStack from "@components/Design/VStack";
import { useAuthStore } from "@contexts/useUserStore";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function Menu() {
  const { setUserLogged } = useAuthStore();
  return (
    <LayoutScreen>
      <VStack style={"items-center"}>
        <Text>Menu</Text>
        <Button
          text="Logout"
          onPress={() => {
            setUserLogged(false);
            router.push("/modules/screens/auth/login");
          }}
        />
      </VStack>
    </LayoutScreen>
  );
}
