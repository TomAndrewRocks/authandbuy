import React from 'react';
import { StyleSheet, View } from 'react-native';

type LayoutScreenProps = {
  children: React.ReactNode;
};

export default function LayoutScreen({ children }: LayoutScreenProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
});
