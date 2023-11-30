import { ITextInput } from '@interfaces/ITextInput';
import { theme } from '@themes/theme';
import useMeasures from '@utils/useMeasures';
import React from 'react';
import { Platform } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function Input(props: ITextInput) {
  const { width, height } = useMeasures();
  return (
    <TextInput
      value={props.value}
      label={props.label}
      placeholder={props.placeholder}
      onChangeText={props.onChange}
      contentStyle={props.color}
      activeUnderlineColor={theme.lightColors?.primary}
      underlineColor={theme.lightColors?.primary}
      style={{
        backgroundColor: theme.lightColors?.white,
        height: height * 0.085,
        width: Platform.OS !== 'web' ? width * 0.75 : null,
      }}
    />
  );
}
