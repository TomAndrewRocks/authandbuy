import * as Haptics from 'expo-haptics';

export default function useHaptics() {
  const lightVibration = () => {
    return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return {
    lightVibration,
  };
}
