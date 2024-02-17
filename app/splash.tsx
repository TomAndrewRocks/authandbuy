import React from "react";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { StyleSheet } from "react-native";
import { hideAsync } from "expo-splash-screen";

type SplashProps = {
  onComplete: (status: boolean) => void;
};

export default function Splash({ onComplete }: SplashProps) {
  const [lastStatus, setLastStatus] = React.useState<AVPlaybackStatus>(
    {} as AVPlaybackStatus
  );

  const onPlayBackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      if (lastStatus.isLoaded !== status.isLoaded) {
        hideAsync();
      }
      if (status.didJustFinish) {
        onComplete(true);
      }
    }
    setLastStatus(() => status);
  };

  return (
    <Video
      shouldPlay
      isLooping={false}
      style={StyleSheet.absoluteFill}
      resizeMode={ResizeMode.COVER}
      onPlaybackStatusUpdate={onPlayBackStatusUpdate}
      source={require("../assets/splash.mp4")}
    />
  );
}
