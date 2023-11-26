import { Animated, Easing } from 'react-native';

export const useNativeAnimate = () => {
  const useAnimateTiming = (
    ref: Animated.Value,
    toValue: number,
    duration?: number,
    easingFunction?: (value: number) => number,
  ): Animated.CompositeAnimation => {
    return Animated.timing(ref, {
      toValue,
      duration: duration ? duration : 200,
      easing: easingFunction ? easingFunction : Easing.linear,
      useNativeDriver: true,
    });
  };

  const useAnimateSpring = (ref: Animated.Value, toValue: number) => {
    return Animated.spring(ref, {
      toValue,
      speed: 10,
      useNativeDriver: true,
    }).start();
  };

  const useAnimateParallel = (ref: Animated.Value, opacity: Animated.Value) => {
    return Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(ref, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return {
    useAnimateTiming,
    useAnimateSpring,
    useAnimateParallel,
  };
};
