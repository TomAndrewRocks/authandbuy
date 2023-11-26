import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import useMeasures from '@utils/useMeasures';
import React from 'react';
import { Button, Text, View } from 'react-native';

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const { height } = useMeasures();
  return (
    // <DrawerContentScrollView
    //   contentContainerStyle={{
    //     flex: 1,
    //     paddingTop: height * 0.085,
    //   }}>
    //   <DrawerItemList {...props} />
    // </DrawerContentScrollView>
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Close drawer" onPress={() => props.navigation.closeDrawer()} />
      <DrawerItem label="Toggle drawer" onPress={() => props.navigation.toggleDrawer()} />
    </DrawerContentScrollView>
  );
}
