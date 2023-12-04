import Footer from '@components/Footer';
import FormUser from '@components/FormUser';
import LayoutScreen from '@components/Layout';
import { Text } from '@rneui/themed';
import React from 'react';
import { Platform, View } from 'react-native';

export default function Register() {
  if (Platform.OS === 'web') document.title = 'Register';
  return (
    <LayoutScreen>
      <Text h2 style={{ position: 'absolute', top: 0, paddingVertical: 50 }}>
        Next up: Your data!
      </Text>
      <View style={{ gap: 30, alignItems: 'center' }}>
        <Text style={{ textAlign: 'center' }}>
          Field up with your credentials for a better experience!
        </Text>
        <FormUser />
      </View>
      <Footer />
    </LayoutScreen>
  );
}
