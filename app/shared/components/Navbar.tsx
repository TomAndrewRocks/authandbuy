import { useSheetStore } from '@contexts/ISheetStore';
import { Avatar, Text } from '@rneui/themed';
import { theme } from '@themes/theme';
import useMeasures from '@utils/useMeasures';
import React from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';

import { DrawerButton } from './Buttons/DrawerButton';
import { Sheet } from './Sheet';

export default function Navbar() {
  const { height } = useMeasures();
  const { isOpen, setIsOpen } = useSheetStore();
  return (
    <>
      <View
        style={{
          width: '100%',
          backgroundColor: theme.lightColors?.white,
          height: height * 0.15,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 40,
          shadowColor: theme.lightColors?.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}>
        <StatusBar animated barStyle="light-content" backgroundColor={theme.lightColors?.primary} />
        <DrawerButton />
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <Avatar
            rounded
            size={45}
            source={{
              uri: 'https://media.licdn.com/dms/image/D5603AQGsGqK8P09Q9g/profile-displayphoto-shrink_400_400/0/1699980715125?e=1706745600&v=beta&t=oqUYvHHKis-pBNxG9aRrHxkdu_fzihccEf3H_U6BIBk',
            }}
          />
        </TouchableOpacity>
      </View>
      <Sheet isOpen={isOpen}>
        <Text>Would like to change your Avatar picture?</Text>
      </Sheet>
    </>
  );
}
