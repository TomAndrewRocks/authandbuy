import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import useMeasures from '@utils/useMeasures';
import React from 'react';

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const { height } = useMeasures();
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        flex: 1,
        paddingTop: height * 0.085,
      }}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
