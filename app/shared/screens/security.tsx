import LayoutScreen from '@components/Layout';
import PinInput from '@components/PinInput';
import { usePinStore } from '@contexts/usePinStore';
import React from 'react';
import { Text } from 'react-native';

export default function Security() {
  const { pin, setPin, getDecryptedPin } = usePinStore();

  console.log(getDecryptedPin());

  return (
    <LayoutScreen>
      <Text>Security</Text>
      <PinInput />
    </LayoutScreen>
  );
}
