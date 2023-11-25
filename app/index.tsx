import NativeApp from '@mobile/index';
import { theme } from '@themes/theme';
import WebApp from '@web/index';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { PaperProvider } from 'react-native-paper';

WebBrowser.maybeCompleteAuthSession();
export default function Page() {
  return (
    <PaperProvider theme={theme}>
      {Platform.OS === 'android' && <NativeApp />}
      {Platform.OS === 'web' && <WebApp />}
    </PaperProvider>
  );
}
