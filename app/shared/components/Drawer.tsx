import { useAuthStore } from '@contexts/useUserStore';
import { Ionicons } from '@expo/vector-icons';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import useMeasures from '@utils/useMeasures';
import { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';
import { theme } from '@themes/theme';

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const { height } = useMeasures();
  const navigation = useNavigation();
  const { setUserLogged } = useAuthStore();

  const handleCloseDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const handleLogout = async () => {
    handleCloseDrawer();
    try {
      // await logoutUser.mutateAsync();
      setUserLogged(false);
      router.push('/shared/screens/login');
    } catch (error: any) {
      Alert.alert('Error logging out:', error.message);
    }
  };
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        paddingTop: height * 0.1,
        backgroundColor: theme.lightColors?.primary
      }}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        // labelStyle={{ color: hasDarkTheme ? 'white' : 'black' }}
        icon={({ focused, size, color }) => (
          <Ionicons
            name="log-out-outline"
            size={size}
            //  color={hasDarkTheme ? 'white' : 'black'}
          />
        )}
        style={{
          position: 'absolute',
          bottom: 1,
          width: '100%',
          paddingRight: 20,
          // backgroundColor: hasDarkTheme ? '#353535' : '#f1f1f1',
        }}
      />
    </DrawerContentScrollView>
  );
}
