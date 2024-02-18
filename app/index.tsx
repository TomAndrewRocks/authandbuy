import { useAuthStore } from "@contexts/useUserStore";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "@routes/drawer.routes";
import Login from "@screens/auth/login";
import { preventAutoHideAsync } from "expo-splash-screen";
import React from "react";
import Splash from "./splash";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

//

preventAutoHideAsync();
//Important note: It is recommended to call this in global scope without awaiting,
//rather than inside React components or hooks, because otherwise this might be called too late, 
//when the splash screen is already hidden.

//

export default function Page() {
  const { isUserLogged } = useAuthStore();
  const [statusBarColor, setStatusBarColor] = React.useState("");
  const [splashFinished, setSplashFinished] = React.useState(false);

  const isWebPlatform = Platform.OS == "web";

  const renderActions = React.useMemo(() => {
    if (!isWebPlatform) {
      if (splashFinished) {
        return <MyDrawer />;
      } else {
        return <Splash onComplete={setSplashFinished} />;
      }
    }
    return <MyDrawer />;
  }, [isUserLogged, isWebPlatform, splashFinished]);

  return (
    <NavigationContainer independent>
      <StatusBar animated style={"dark"} />
      {isUserLogged ? renderActions : <Login />}
    </NavigationContainer>
  );
}
