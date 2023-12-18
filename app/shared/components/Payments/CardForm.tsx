import TextBox from '@components/Box/TextBox';
import Input from '@components/TextInput';
import { Ionicons } from '@expo/vector-icons';
import { CardTypeInfoProps } from '@interfaces/ICreditCard';
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { View, Text } from 'react-native';

import { CreditCard } from './CreditCard';

interface ICardForm {
  control: Control<FieldValues>;
  formatCardNumber: (value: any) => void;
  errors: FieldErrors<any>;
  cardNumber: string;
  cardInfo: CardTypeInfoProps[];
  shouldProceed: boolean;
}

export default function CardForm(props: ICardForm) {
  return (
    <>
      <TextBox>Manage your bank accounts with safety and swag!</TextBox>
      <View>
        {/* {cardInfo.length > 0 && <Text>Card Brand: {cardInfo[0].niceType}</Text>} */}
        <Controller
          name="cardNumber"
          control={props.control}
          render={({ field: { onChange, value } }) => (
            <View>
              <View
                style={{
                  position: 'absolute',
                  left: 10,
                  top: 12,
                  zIndex: 99999,
                }}>
                <Ionicons name="card" size={18.5} color="#151515" />
              </View>
              <Input
                icon="card"
                // w={width * 0.9}
                // value={props.formatCardNumber(value)}
                // maxLength={19}
                // keyboardType="numeric"
                // placeholderTextColor={'$color10'}
                // onChangeText={onChange}
                // style={{
                //   paddingLeft: 35,
                //   paddingRight: 50,
                // }}
              />
            </View>
          )}
        />
        {props.errors?.cardNumber && <Text>This is required.</Text>}
      </View>
      <CreditCard
        cardNumber={props.cardNumber}
        flag={props.cardInfo[0]?.niceType}
        shouldProceed={props.shouldProceed}
      />
    </>
  );
}
