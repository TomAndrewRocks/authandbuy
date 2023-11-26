import React from 'react';
import { View, Text } from 'react-native';

export default function Footer() {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        paddingVertical: 10,
      }}>
      <Text>Created by Tech Praia</Text>
    </View>
  );
}
