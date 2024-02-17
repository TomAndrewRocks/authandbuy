import { useAuthStore } from "@contexts/useUserStore";
import { Ionicons } from "@expo/vector-icons";
import useMeasures from "@hooks/useMeasures";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import React from "react";
import { Alert } from "react-native";

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
      router.push("/modules/screens/auth/login");
    } catch (error: any) {
      Alert.alert("Error logging out:", error.message);
    }
  };
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        paddingTop: height * 0.1,
        // backgroundColor: theme.lightColors?.primary,
      }}
    >
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        // labelStyle={{ color: theme.lightColors?.secondary }}
        icon={({ size }) => (
          <Ionicons
            name="log-out-outline"
            size={size}
            // color={theme.lightColors?.white}
          />
        )}
        style={{
          position: "absolute",
          bottom: 1,
          width: "100%",
          paddingRight: 20,
        }}
      />
    </DrawerContentScrollView>
  );
}
