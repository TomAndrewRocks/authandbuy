import TextBox from '@components/Box/TextBox';
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
        <TextBox>
          <Text>Activate your finger-print protection</Text>
          <Text>by checking it down below!</Text>
        </TextBox>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Switch
            value={isBiometricsChecked}
            onValueChange={handleBiometrics}
            color={isBiometricsChecked ? '' : 'gray'}
          />
          <View style={{ flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Text>Status: </Text>
            <Text
              style={{
                color: isBiometricsChecked ? theme.lightColors?.primary : 'gray',
                borderBottomWidth: 1,
                borderBottomColor: isBiometricsChecked ? theme.lightColors?.primary : 'gray',
              }}>
              {isBiometricsChecked ? 'Authenticated' : 'Unautenthicated'}
            </Text>
          </View>
        </View>
      </View>
    </LayoutScreen>
  );
}
