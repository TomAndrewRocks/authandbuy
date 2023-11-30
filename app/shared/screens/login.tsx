import ActionButton from '@components/Buttons/ActionButton';
import Footer from '@components/Footer';
import LayoutScreen from '@components/Layout';
import { useAuthStore } from '@contexts/useUserStore';
import { theme } from '@themes/theme';
import useMeasures from '@utils/useMeasures';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Platform, View } from 'react-native';

export default function Login() {
  const animation = React.useRef(null);
  const { width } = useMeasures();
  const { setUserLogged } = useAuthStore();
  const handleSignIn = async () => {
    try {
      // await WebBrowser.openAuthSessionAsync(
      //   `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent`,
      //   process.env.REDIRECT_URI,
      // ).then((response) => {
      //   if (response?.type === 'success') {
      router.push('/shared/screens/register');
      setUserLogged(false);
      //   }
      // });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LayoutScreen
      style={{
        flex: 1,
        gap: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.white,
      }}>
      {Platform.OS !== 'web' && (
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: width * 0.8,
            backgroundColor: theme.colors.white,
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require('../../../assets/app.json')}
        />
      )}
      <ActionButton
        bgColor={theme.colors.primary}
        icon="google"
        title="Google Sign In"
        onPress={handleSignIn}
      />
      <Footer />
    </LayoutScreen>
  );
}
