import { useBiometrics } from '@contexts/useBiometrics';
import { Fontisto } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, View } from 'react-native';

const window = Dimensions.get('window');
const cardW = window.width * 0.9;
const cardH = window.height * 0.23;

interface CardProps {
  flag: string;
  cardNumber: string;
  shouldProceed: boolean;
}

export const CreditCard = ({ flag, cardNumber, shouldProceed }: CardProps) => {
  const { hasBiometrics, isBiometricsChecked } = useBiometrics();

  const handleCardGradientColors = (flag: string) => {
    const flagValue = flag?.toLowerCase();
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
      return <Fontisto name="visa" size={24} color="#363636" />;
    } else if (flagValue === 'mastercard') {
      return <Fontisto name="mastercard" size={24} color="#363636" />;
    }
    return flag;
  };

  return (
    <LinearGradient
      colors={handleCardGradientColors(flag)}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        alignSelf: 'center',
        height: cardH,
        width: cardW,
        padding: 12,
        borderRadius: 8,
      }}>
      <View>
        <View>
          <View />
          <Text>{cardNumber && cardNumber.length > 0 && handleFlagIcon(flag)}</Text>
        </View>
        <View>
          <Text>
            {hasBiometrics && isBiometricsChecked
              ? shouldProceed
                ? cardNumber
                : '**** **** **** ****'
              : cardNumber}
          </Text>
          {
            cardNumber && cardNumber.length > 0 && '' // <Separator theme={!hasDarkTheme ? 'light' : 'dark'} />
          }
        </View>
        <View />
      </View>
    </LinearGradient>
  );
};
