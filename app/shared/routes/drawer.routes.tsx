import CustomDrawer from "@components/Drawer";
import { Ionicons } from "@expo/vector-icons";
import usePallete from "@hooks/usePallete";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Menu from "@screens/menu";
import { Platform } from "react-native";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  //   const { hasBiometrics } = useBiometrics();
  const { colorTheme } = usePallete();

  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        drawerStatusBarAnimation: "fade",
        drawerStyle: {
          backgroundColor: colorTheme("wheat-bg"),
        },
        drawerLabelStyle: {
          color: "yellow",
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Menu"
        component={Menu}
        options={{
          title: "Menu",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={colorTheme("wheat-bg")}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
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
      {Platform.OS === 'web' && (
        <Drawer.Screen
          name="Security"
          component={Security}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons name="lock-open" size={size} color="#fff" />
            ),
          }}
        />
      )} */}
    </Drawer.Navigator>
  );
}
