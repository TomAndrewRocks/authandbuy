import { queryClient } from '@api/query';
import { ThemeProvider } from '@rneui/themed';
import { QueryClientProvider } from '@tanstack/react-query';
import { theme } from '@themes/theme';
import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Stack initialRouteName="splash" screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
