import { IButton } from '@interfaces/IButton';
import { Button } from '@rneui/base';
import { theme } from '@themes/theme';
import React from 'react';

export default function ActionButton(props: IButton) {
  return (
    <Button
      buttonStyle={{
        width: 150,
        backgroundColor: props.bgColor ? props.bgColor : theme.lightColors?.primary,
      }}
      containerStyle={{
        margin: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 5,
      }}
      disabledStyle={{
        borderWidth: 2,
        borderColor: '#00F',
      }}
      disabledTitleStyle={{ color: '#00F' }}
      icon={{
        name: props.icon,
        type: 'ionicon',
        size: 18,
        color: theme.lightColors?.white,
      }}
      loadingProps={{ animating: true }}
      loadingStyle={{}}
      onPress={props.onPress}
      title={props.title}
      titleProps={{}}
      titleStyle={{ marginHorizontal: 5 }}
    />
  );
}
