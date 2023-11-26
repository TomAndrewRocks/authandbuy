import { useAuthStore } from '@contexts/useUserStore';
import DrawerScreen from '@routes/drawer.routes';
import Login from '@screens/login';
import React from 'react';
import { View } from 'react-native';

export default function NativeApp() {
  const { isUserLogged } = useAuthStore();
  console.log(isUserLogged);
  return (
    <View>
      <Login />
    </View>
  );
}
