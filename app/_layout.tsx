import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Slot } from "expo-router";
import { useWarmUpBrowser } from "@hooks/useWarmUpBrowser";
import { Platform } from "react-native";

export default function Layout() {
  //
  useWarmUpBrowser();
  //

  if (Platform.OS == "web") {
    document.title = "Auth and Buy App";
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Slot />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
