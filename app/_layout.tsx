import { queryClient } from '@api/query';
import { useBiometrics } from '@contexts/useBiometrics';
import { ThemeProvider } from '@rneui/themed';
import { QueryClientProvider } from '@tanstack/react-query';
import { theme } from '@themes/theme';
import useScreenGuard from '@utils/useScreenGuard';
import * as LocalAuth from 'expo-local-authentication';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function Layout() {
  const { setUserBiometrics, isUserAuth } = useBiometrics();
  const { handleFingerPrintValidation } = useScreenGuard();

  const checkingIfBiometricsExist = async () => {
    const compatible = await LocalAuth.hasHardwareAsync();
    const allowedAuthTypes = await LocalAuth.supportedAuthenticationTypesAsync();
    if (compatible) setUserBiometrics(true);
    console.log(allowedAuthTypes);
  };

  React.useEffect(() => {
    checkingIfBiometricsExist();
    if (isUserAuth) {
      handleFingerPrintValidation();
    }
  }, [isUserAuth]);

  if (Platform.OS === 'web') document.title = 'Auth and Buy';
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Stack initialRouteName="splash" screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
