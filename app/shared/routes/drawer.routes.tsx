import CustomDrawer from '@components/Drawer';
import { useBiometrics } from '@contexts/useBiometrics';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Biometrics from '@screens/biometrics';
import Favorites from '@screens/favorites';
import Menu from '@screens/menu';
import Payments from '@screens/payments';
const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  const { hasBiometrics } = useBiometrics();

  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        // drawerStyle: {
        //   backgroundColor: hasDarkTheme ? '#353535' : '#f1f1f1',
        // },
        // drawerLabelStyle: {
        //   color: hasDarkTheme ? 'yellow' : '#207BD1',
        // },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Menu"
        component={Menu}
        options={{
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              // color={handleFocusedColor(focused)}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? 'heart' : 'heart-outline'}
              size={size}
              // color={handleFocusedColor(focused)}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Payments"
        component={Payments}
        options={{
          drawerIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? 'card' : 'card-outline'}
              size={size}
              // color={handleFocusedColor(focused)}
            />
          ),
        }}
      />
      {hasBiometrics && (
        <Drawer.Screen
          name="Local Authentication"
          component={Biometrics}
          options={{
            drawerIcon: ({ focused, size, color }) => (
              <Ionicons
                name="finger-print"
                size={size}
                // color={handleFocusedColor(focused)}
              />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
}
