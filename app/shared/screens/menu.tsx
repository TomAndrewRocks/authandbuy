import { useAuthStore } from '@contexts/useUserStore';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import Model from '@components/Model';
import Navbar from '@components/Navbar';
import LayoutScreen from '@components/Layout';
import { View, StyleSheet } from 'react-native';
import { Slider, Text, Icon } from '@rneui/themed';

export default function Menu() {
  const { isUserLogged } = useAuthStore();
  const [value, setValue] = React.useState(0);
  const [vertValue, setVertValue] = React.useState(0);

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

  const interpolate = (start: number, end: number) => {
    let k = (value - 0) / 10; // 0 =>min  && 10 => MAX
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };

  return (
    <LayoutScreen>
      <Model />
      <View style={[styles.contentView]}>
        <Slider
          value={value}
          onValueChange={setValue}
          maximumValue={10}
          minimumValue={0}
          step={1}
          allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: 'transparent' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
          thumbProps={{
            children: (
              <Icon
                name="heartbeat"
                type="font-awesome"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color={color()}
              />
            ),
          }}
        />
        <Text style={{ paddingTop: 20 }}>Value: {value}</Text>
      </View>
    </LayoutScreen>
  );
}

const styles = StyleSheet.create({
  contentView: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  verticalContent: {
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    height: 500,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  subHeader: {
    backgroundColor: '#2089dc',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    marginBottom: 10,
  },
});
