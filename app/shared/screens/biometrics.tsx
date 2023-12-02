import LayoutScreen from '@components/Layout';
import { useBiometrics } from '@contexts/useBiometrics';
import { Switch } from '@rneui/themed';
import useMeasures from '@utils/useMeasures';
import useScreenGuard from '@utils/useScreenGuard';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { Text, View } from 'react-native';

export default function Biometrics() {
  const { height } = useMeasures();
  const { isBiometricsChecked } = useBiometrics();
  const { handleBiometrics } = useScreenGuard();

  return (
    <LayoutScreen>
      <AnimatedLottieView
        autoPlay
        source={require('../../../assets/biometrics.json')}
        style={{
          height: height * 0.45,
        }}
      />
      <Text>Activate your finger-print protection by checking it down below!</Text>
      <View>
        <Switch value={isBiometricsChecked} onValueChange={handleBiometrics} />
      </View>
    </LayoutScreen>
  );
}
