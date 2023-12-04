import { queryClient } from '@api/query';
import { ThemeProvider } from '@rneui/themed';
import { QueryClientProvider } from '@tanstack/react-query';
import { theme } from '@themes/theme';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function Layout() {
  if (Platform.OS === 'web') document.title = 'Auth and Buy';
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Stack initialRouteName="splash" screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
