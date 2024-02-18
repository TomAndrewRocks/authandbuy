import { Button } from "@components/Buttons/Button";
import LayoutScreen from "@components/Design/LayoutScreen";
import VStack from "@components/Design/VStack";
import { useAuthStore } from "@contexts/useUserStore";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";
import * as Google from "expo-auth-session/providers/google";

export default function Login() {
  const { setUserLogged } = useAuthStore();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT,
    expoClientId: "com.techpraia.authbuy",
  });

  return (
    <LayoutScreen>
      <VStack style={"items-center"}>
        <Text>Login</Text>
        {/*  <Button
          text="Google Sign in"
          onPress={() => {
            promptAsync();
          }}
        /> */}
        <Button
          text="Sign in"
          variant="primary"
          onPress={() => {
            router.push("/shared/routes/drawer.routes");
            setUserLogged(true);
          }}
        />
      </VStack>
    </LayoutScreen>
  );
}
