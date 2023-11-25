import { IButton } from '@interfaces/IButton';
import React from 'react';
import { Alert } from 'react-native';
import { Button } from 'react-native-paper';

export default function GoogleSignIn(props: IButton) {
  return (
    <Button icon="google" mode="contained" onPress={props.onPress}>
      Google Sign In
    </Button>
  );
}
