import { useBiometrics } from '@contexts/useBiometrics';
import { Fontisto } from '@expo/vector-icons';
import { Divider, Text } from '@rneui/themed';
import { theme } from '@themes/theme';
import useFormatCardNumber from '@utils/useFormatCardNumber';
import useMeasures from '@utils/useMeasures';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Easing, Platform, View } from 'react-native';

interface CardProps {
  flag: string;
  cardNumber: string;
  shouldProceed: boolean;
}

let displayCardNumber;

export const CreditCard = ({ flag, cardNumber, shouldProceed }: CardProps) => {
  const { hasBiometrics, isBiometricsChecked } = useBiometrics();
  const { width, height } = useMeasures();
  const { formatNumber, showLastFourDigits } = useFormatCardNumber();

  const flagValue = flag?.toLowerCase();
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    if (
      (flagValue === 'visa' && cardNumber.length > 0) ||
      (flagValue === 'mastercard' && cardNumber.length > 0)
    ) {
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        rotateAnim.setValue(0);
      });
    }
  }, [flagValue]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const opacityInterpolate = opacityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleCardGradientColors = (flag: string) => {
    if (flagValue === 'visa' && cardNumber.length > 0) {
      return ['#007bffc5', '#dddddd'];
    } else if (flagValue === 'mastercard' && cardNumber.length > 0) {
      return ['#ff0000ca', '#ffa600bc', '#ffff004c'];
    } else if (cardNumber.length > 0) {
      return ['#c7972f', '#c0aa7b'];
    }
    return ['#7a7a7a', '#b3b3b3'];
  };

  const handleFlagIcon = (flag: string) => {
    const flagValue = flag?.toLowerCase();
    if (flagValue === 'visa' && cardNumber.length > 0) {
      return <Fontisto name="visa" size={24} color={theme.lightColors?.white} />;
    } else if (flagValue === 'mastercard' && cardNumber.length > 0) {
      return <Fontisto name="mastercard" size={24} color={theme.lightColors?.white} />;
    }
    return flagValue;
  };

  if (hasBiometrics && isBiometricsChecked) {
    displayCardNumber = shouldProceed ? formatNumber(cardNumber) : showLastFourDigits(cardNumber);
  } else {
    displayCardNumber = formatNumber(cardNumber);
  }

  return (
    <Animated.View
      style={{
        transform: [{ rotateY: rotateInterpolate }],
        alignSelf: 'center',
        height: Platform.OS === 'web' ? height * 0.2 : height * 0.23,
        width: Platform.OS === 'web' ? width * 0.2 : width * 0.8,
        padding: 12,
        borderRadius: 8,
        opacity: opacityInterpolate,
      }}>
      <LinearGradient
        colors={handleCardGradientColors(flag)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          alignSelf: 'center',
          height: Platform.OS === 'web' ? height * 0.2 : height * 0.23,
          width: Platform.OS === 'web' ? width * 0.2 : width * 0.8,
          padding: 12,
          borderRadius: 8,
        }}>
        <View style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
          <View>
            <Text>{cardNumber && cardNumber.length > 0 && handleFlagIcon(flag)}</Text>
          </View>
          <View style={{ gap: 10 }}>
            <Text style={{ color: theme?.lightColors?.white }}>{displayCardNumber}</Text>
            {displayCardNumber && <Divider width={2} color={theme?.lightColors?.white} />}
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};
