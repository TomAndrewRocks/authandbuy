import ActionButton from '@components/Buttons/ActionButton';
import LayoutScreen from '@components/Layout';
import { theme } from '@themes/theme';
import useMeasures from '@utils/useMeasures';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { Text, View } from 'react-native';

export default function Payments() {
  const { height } = useMeasures();
  return (
    <LayoutScreen>
      <AnimatedLottieView
        autoPlay
        source={require('../../../assets/credit.json')}
        style={{
          height: height * 0.32,
        }}
      />
      <View style={{ gap: 35, alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', width: 300 }}>
          It seems you haven't a single credit card registered... (yet!)
        </Text>
        <ActionButton
          title="Add Card"
          bgColor={theme.lightColors?.primary}
          onPress={() => console.log('hey')}
        />
      </View>
    </LayoutScreen>
  );
}
