import { useAuthStore } from "@contexts/useUserStore";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "@routes/drawer.routes";
import Login from "@screens/auth/login";
import { preventAutoHideAsync } from "expo-splash-screen";
import React from "react";
import Splash from "./splash";
import { StatusBar } from "expo-status-bar";

preventAutoHideAsync();

export default function Page() {
  const { isUserLogged } = useAuthStore();
  const [splashFinished, setSplashFinished] = React.useState(false);

  const renderActions = React.useMemo(() => {
    if (splashFinished) {
      return <MyDrawer />;
    } else {
      return <Splash onComplete={setSplashFinished} />;
    }
  }, [isUserLogged, splashFinished]);

  return (
    <NavigationContainer independent>
      <StatusBar animated style={"dark"} />
      {isUserLogged ? renderActions : <Login />}
    </NavigationContainer>
  );
}
