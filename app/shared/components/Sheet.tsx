import { BottomSheet, Button, Icon, ListItem, Overlay } from '@rneui/base';
import { theme } from '@themes/theme';
import React from 'react';
import { Platform, Text } from 'react-native';

interface SheetProps {
  isOpen: boolean;
  onPress: () => void;
}

export const Sheet = (props: SheetProps) => {
  if (Platform.OS === 'web') {
    return (
      <Overlay isVisible={props.isOpen} onBackdropPress={props.onPress}>
        <Text>Hello!</Text>
        <Text>Welcome to React Native Elements</Text>
        <Button
          icon={
            <Icon
              name="wrench"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          title="Start Building"
          onPress={props.onPress}
        />
      </Overlay>
    );
  }

  return (
    <BottomSheet modalProps={{}} isVisible={props.isOpen} onBackdropPress={props.onPress}>
      <ListItem.Content style={{ backgroundColor: theme.lightColors?.white, height: 100 }}>
        <ListItem.Title>Sheet</ListItem.Title>
      </ListItem.Content>
      <Button title="Fechar" onPress={props.onPress} />
    </BottomSheet>
  );
};
