/* eslint-disable no-void */
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Platform } from "react-native";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    if (Platform.OS !== "web") {
      void WebBrowser.warmUpAsync().then(() => {
        void WebBrowser.maybeCompleteAuthSession();
      });
      return () => {
        void WebBrowser.coolDownAsync();
      };
    }
  }, []);
};
