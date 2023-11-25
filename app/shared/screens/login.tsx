import GoogleSignIn from '@components/Buttons/GoogleSignIn';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Platform, View } from 'react-native';

export default function Login() {
  const animation = React.useRef(null);
  const handleSignIn = async () => {
    try {
      await WebBrowser.openAuthSessionAsync(
        `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent`,
        process.env.REDIRECT_URI,
      ).then((response) => {
        if (response?.type === 'success') {
          router.push('/shared/screens/register');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      {Platform.OS !== 'web' && (
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 200,
            height: 200,
            backgroundColor: '#eee',
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require('../../../assets/app.json')}
        />
      )}
      <GoogleSignIn onPress={handleSignIn} />
    </View>
  );
}
