import { useAuthStore } from '@contexts/useUserStore';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from '@routes/drawer.routes';
import Login from '@screens/login';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  const { isUserLogged } = useAuthStore();
  return (
    <NavigationContainer independent>{isUserLogged ? <MyDrawer /> : <Login />}</NavigationContainer>
  );
}
