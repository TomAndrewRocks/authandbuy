import Footer from '@components/Footer';
import FormUser from '@components/FormUser';
import LayoutScreen from '@components/Layout';
import { Text } from '@rneui/themed';
import React from 'react';

export default function Register() {
  return (
    <LayoutScreen>
      <Text h2 style={{ position: 'absolute', top: 0, paddingVertical: 50 }}>
        Next up: Your data!
      </Text>
      <FormUser />
      <Footer />
    </LayoutScreen>
  );
}
