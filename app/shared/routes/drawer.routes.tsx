import CustomDrawer from '@components/Drawer';
import { useBiometrics } from '@contexts/useBiometrics';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Biometrics from '@screens/biometrics';
import Favorites from '@screens/favorites';
import Menu from '@screens/menu';
import Payments from '@screens/payments';
import { theme } from '@themes/theme';
import { Platform } from 'react-native';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  const { hasBiometrics } = useBiometrics();

  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#f1f1f1',
        },
        drawerLabelStyle: {
          color: 'yellow',
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Menu"
        component={Menu}
        options={{
          title: 'Menu',
          drawerIcon: ({ focused, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color="#fff" />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: 'Favorites',
          drawerIcon: ({ focused, size }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color="#fff" />
          ),
        }}
      />
      <Drawer.Screen
        name="Payments"
        component={Payments}
        options={{
          title: 'Payments',
          drawerIcon: ({ focused, size }) => (
            <Ionicons name={focused ? 'card' : 'card-outline'} size={size} color="#fff" />
          ),
        }}
      />
      {hasBiometrics && (
        <Drawer.Screen
          name="Local Authentication"
          component={Biometrics}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons name="finger-print" size={size} color="#fff" />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
}
