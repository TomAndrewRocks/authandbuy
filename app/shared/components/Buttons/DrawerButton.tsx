import { Feather } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

export const DrawerButton = () => {
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return <Feather name="align-justify" size={24} onPress={handleOpenDrawer} color="#000" />;
};
