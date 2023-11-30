import LayoutScreen from '@components/Layout';
import useMeasures from '@utils/useMeasures';
import useScreenGuard from '@utils/useScreenGuard';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-paper';

export default function Biometrics() {
  const { height } = useMeasures();
  const { handleBiometrics } = useScreenGuard();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => {
    handleBiometrics();
    setIsSwitchOn(!isSwitchOn);
  };

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
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
    </LayoutScreen>
  );
}
