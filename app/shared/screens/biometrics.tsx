import LayoutScreen from '@components/Layout';
import { useBiometrics } from '@contexts/useBiometrics';
import { Badge, Switch } from '@rneui/themed';
import { theme } from '@themes/theme';
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
      <View style={{ gap: 30, alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>
          Activate your finger-print protection by checking it down below!
        </Text>
        <View>
          <Switch
            value={isBiometricsChecked}
            onValueChange={handleBiometrics}
            color={isBiometricsChecked ? '' : 'gray'}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Status: </Text>
          <Badge
            value={isBiometricsChecked ? 'Authenticated' : 'Unautenthicated'}
            badgeStyle={{
              backgroundColor: isBiometricsChecked ? theme.lightColors?.primary : 'gray',
            }}
          />
        </View>
      </View>
    </LayoutScreen>
  );
}
