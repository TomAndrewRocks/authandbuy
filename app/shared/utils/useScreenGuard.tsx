import * as LocalAuth from 'expo-local-authentication';
import { Alert } from 'react-native';

import { useBiometrics } from '../contexts/useBiometrics';

export default function useScreenGuard() {
  const { isUserAuth, setUserAuth, isBiometricsChecked, setCheckBiometrics } = useBiometrics();

  const handleFingerPrintValidation = async () => {
    if (!isBiometricsChecked) {
      const auth = await LocalAuth.authenticateAsync({
        promptMessage: 'Biometric Login',
        fallbackLabel: 'Unrecognizable fingerprint!',
        cancelLabel: 'Cancel',
        disableDeviceFallback: true,
      });
      // prompt of biometric auth
      if (auth.success) {
        setUserAuth(true);
        if (auth.success) {
          //   router.push('/screens/view/onBoard');
        }
      } else if (auth.error === 'user_cancel' || auth.warning === 'Cancel') {
        setCheckBiometrics(false);
        setUserAuth(false);
      }
    }
  };

  const handleScreenPass = async () => {
    if (isUserAuth) {
      const auth = await LocalAuth.authenticateAsync({
        promptMessage: 'Biometric Login',
        fallbackLabel: 'Unrecognizable fingerprint!',
        cancelLabel: 'Cancel',
        disableDeviceFallback: true,
      });
      // prompt of biometric auth
      if (auth.success) {
        setUserAuth(true);
        if (auth.success) {
          //   router.push('/screens/view/onBoard');
        }
      } else if (auth.error === 'user_cancel' || auth.warning === 'Cancel') {
        setCheckBiometrics(false);
        setUserAuth(false);
      }
    }
  };

  const handleBiometrics = () => {
    if (!isBiometricsChecked) {
      setUserAuth(true);
      setTimeout(() => setCheckBiometrics(!isBiometricsChecked), 150);
    } else {
      setUserAuth(false);
      setCheckBiometrics(!isBiometricsChecked);
    }
    // check toggle
    handleFingerPrintValidation();
    // validate finger print
  };

  return {
    handleBiometrics,
    handleScreenPass,
    handleFingerPrintValidation,
  };
}
