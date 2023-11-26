import { queryClient } from '@api/query';
import { QueryClientProvider } from '@tanstack/react-query';
import { theme } from '@themes/theme';
import WebApp from '@web/index';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { PaperProvider } from 'react-native-paper';

export default function Layout() {
  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Stack initialRouteName="splash" screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </PaperProvider>
  );
}
