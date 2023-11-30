import LayoutScreen from '@components/Layout';
import Navbar from '@components/Navbar';
import { useAuthStore } from '@contexts/useUserStore';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { View, Text, Alert } from 'react-native';

export default function Menu() {
  const { isUserLogged } = useAuthStore();

  const [image, setImage] = React.useState<string | null>('');
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('pic', result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const parts = image?.split('/');
  const filename = parts && parts[parts.length - 1];
  const extension = filename && filename?.split('.')?.pop()?.toLowerCase();
  const shortenedName = filename && filename.substring(0, 20);

  return (
    <LayoutScreen>
      {/* <ActionButton
        onPress={pickImage}
        bgColor={theme.colors.tertiary}
        icon="camera-outline"
        title="Profile Photo"
        mode="outlined"
        textColor={theme.colors.black}
        style={{
          width: '100%',
        }}
      />
      <Text>{image && `${shortenedName}....${extension}`}</Text> */}
      <Text>{JSON.stringify(isUserLogged) ? 'User Logged' : 'Not authenthicated'}</Text>
    </LayoutScreen>
  );
}
