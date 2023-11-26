import Footer from '@components/Footer';
import FormUser from '@components/FormUser';
import LayoutScreen from '@components/Layout';
import React from 'react';
import { Text } from 'react-native-paper';

export default function Register() {
  return (
    <LayoutScreen>
      <Text variant="displaySmall" style={{ position: 'absolute', top: 0, paddingVertical: 50 }}>
        Next up: Your data!
      </Text>
      <FormUser />
      <Footer />
    </LayoutScreen>
  );
}
