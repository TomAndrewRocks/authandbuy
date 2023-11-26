import { theme } from '@themes/theme';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type LayoutScreenProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function LayoutScreen({ children, style }: LayoutScreenProps) {
  return <View style={style ? style : styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: theme.colors.white,
  },
});
