import { useAuthStore } from "@contexts/useUserStore";
import { Ionicons } from "@expo/vector-icons";
import useMeasures from "@hooks/useMeasures";
import usePallete from "@hooks/usePallete";
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
  const navigation = useNavigation();
  const { height } = useMeasures();
  const { colorTheme } = usePallete();
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
        backgroundColor: colorTheme("primary-bg"),
      }}
    >
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        labelStyle={{ color: colorTheme("wheat-bg") }}
        icon={({ size }) => (
          <Ionicons
            name="log-out-outline"
            size={size}
            color={colorTheme("wheat-bg")}
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
