import * as LocalAuth from 'expo-local-authentication';
import { Alert } from 'react-native';

import { useBiometrics } from '../contexts/useBiometrics';

export default function useScreenGuard() {
  const { setUserAuth, isBiometricsChecked, setCheckBiometrics } = useBiometrics();

  const handleFingerPrintValidation = async () => {
    const isBiometricAllowed = await LocalAuth.isEnrolledAsync();
    if (!isBiometricAllowed && !isBiometricsChecked) {
      setCheckBiometrics(false);
      return Alert.alert('Local Authentication', 'No finger-print recognized!');
    }
    // checking if finger-print is set

    if (!isBiometricsChecked) {
      // calling the handle only when check goes true

      const auth = await LocalAuth.authenticateAsync({
        promptMessage: 'Biometric Login',
        fallbackLabel: 'Unrecognizable fingerprint!',
        cancelLabel: 'Cancel',
        disableDeviceFallback: true,
      });
      // prompt of biometric auth
      if (auth.success) {
        setUserAuth();
        if (auth.success) {
          //   router.push('/screens/view/onBoard');
        }
      } else if (auth.error === 'user_cancel' || auth.warning === 'Cancel') {
        setCheckBiometrics(false);
      }
      // then user authenticated!
    } else {
      setUserAuth();
    }
  };

  const handleBiometrics = () => {
    if (!isBiometricsChecked) {
      setTimeout(() => setCheckBiometrics(!isBiometricsChecked), 150);
    } else {
      setCheckBiometrics(!isBiometricsChecked);
    }
    // check toggle
    handleFingerPrintValidation();
    // validate finger print
  };

  return {
    handleBiometrics,
    handleFingerPrintValidation,
  };
}
