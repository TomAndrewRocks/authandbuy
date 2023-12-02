import { Avatar } from '@rneui/themed';
import { theme } from '@themes/theme';
import useMeasures from '@utils/useMeasures';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';

import { DrawerButton } from './Buttons/DrawerButton';

export default function Navbar() {
  const { height } = useMeasures();
  return (
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
      <StatusBar style="light" backgroundColor={theme.lightColors?.primary} />
      <DrawerButton />
      <Avatar
        size={40}
        source={{
          uri: 'https://media.licdn.com/dms/image/D5603AQGsGqK8P09Q9g/profile-displayphoto-shrink_400_400/0/1699980715125?e=1706745600&v=beta&t=oqUYvHHKis-pBNxG9aRrHxkdu_fzihccEf3H_U6BIBk',
        }}
      />
    </View>
  );
}
