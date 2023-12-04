import { ITextInput } from '@interfaces/ITextInput';
import { Icon, Input as TextInput } from '@rneui/themed';
import useMeasures from '@utils/useMeasures';
import React from 'react';
import { Platform } from 'react-native';

export default function Input(props: ITextInput) {
  const { width, height } = useMeasures();
  return (
    <TextInput
      value={props.value}
      onChangeText={props.onChange}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
      inputContainerStyle={{ width: Platform.OS === 'web' ? width * 0.2 : width * 0.5, height: 50 }}
      leftIcon={<Icon name={props.icon} type="ionicon" size={24} color="black" />}
    />
  );
}
