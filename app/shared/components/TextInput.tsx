import { ITextInput } from '@interfaces/ITextInput';
import useMeasures from '@utils/useMeasures';
import React from 'react';
import { TextInput } from 'react-native';

export default function Input(props: ITextInput) {
  const { width, height } = useMeasures();
  return (
    <TextInput
      value={props.value}
      onChangeText={props.onChange}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
      // activeUnderlineColor={theme.lightColors?.primary}
      // underlineColor={theme.lightColors?.primary}
      // style={{
      //   backgroundColor: theme.lightColors?.white,
      //   height: height * 0.085,
      //   width: Platform.OS !== 'web' ? width * 0.75 : null,
      // }}
    />
  );
}
