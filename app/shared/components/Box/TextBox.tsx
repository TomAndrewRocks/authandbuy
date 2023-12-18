import { Card, Text } from '@rneui/themed';
import { theme } from '@themes/theme';
import React from 'react';

interface ITextBox {
  children: React.ReactNode;
}

export default function TextBox({ children }: ITextBox) {
  return (
    <Card
      containerStyle={{
        shadowColor: theme.darkColors?.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderRadius: 20,
      }}>
      <Text style={{ textAlign: 'center' }}>{children}</Text>
    </Card>
  );
}
