import { IButton } from '@interfaces/IButton';
import { Button } from '@rneui/base';
import React from 'react';

export default function ActionButton(props: IButton) {
  return (
    <Button
      buttonStyle={{ width: 150 }}
      containerStyle={{ margin: 5 }}
      disabledStyle={{
        borderWidth: 2,
        borderColor: "#00F"
      }}
      disabledTitleStyle={{ color: "#00F" }}
      linearGradientProps={null}
      // icon={<Icon name="react" size={15} color="#0FF" />}
      // iconContainerStyle={{ background: "#000" }}
      loadingProps={{ animating: true }}
      loadingStyle={{}}
      onPress={props.onPress}
      title='Google Sign In'
      titleProps={{}}
      titleStyle={{ marginHorizontal: 5 }}
    />
  );
}
