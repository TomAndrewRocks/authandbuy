import { Feather } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export const DrawerButton = () => {
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <TouchableOpacity onPress={handleOpenDrawer}>
      <Feather name="align-justify" size={24} color="#000" />
    </TouchableOpacity>
  );
};
