import { IButton } from '@interfaces/IButton';
import useMeasures from '@utils/useMeasures';
import React from 'react';
import { Platform } from 'react-native';
import { Button } from 'react-native-paper';

export default function ActionButton(props: IButton) {
  const { width } = useMeasures();
  return (
    <Button
      style={
        props.style
          ? props.style
          : { backgroundColor: props.bgColor, width: Platform.OS !== 'web' ? width * 0.4 : null }
      }
      icon={props.icon}
      mode={props.mode ? props.mode : 'contained'}
      textColor={props.textColor}
      contentStyle={{ width: '100%' }}
      onPress={props.onPress}>
      {props.title}
    </Button>
  );
}
