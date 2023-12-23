import TextBox from '@components/Box/TextBox';
import { CardTypeInfoProps } from '@interfaces/ICreditCard';
import { Input } from '@rneui/themed';
import { ValidationResult } from '@utils/useCreditCardValidator';
import useFormatCardNumber from '@utils/useFormatCardNumber';
import useMeasures from '@utils/useMeasures';
import React from 'react';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import { View, Platform } from 'react-native';

import { CreditCard } from './CreditCard';

interface ICardForm {
  control: Control<FieldValues>;
  formatCardNumber: (value: any) => void;
  errors: FieldErrors<ValidationResult>;
  cardNumber: string;
  cardInfo: CardTypeInfoProps[];
  shouldProceed: boolean;
}

export default function CardForm(props: ICardForm) {
  const { width } = useMeasures();
  const formatCardNumber = useFormatCardNumber();

  return (
    <View style={{ gap: 40, alignItems: 'center' }}>
      <TextBox>Manage your bank accounts with safety and swag!</TextBox>
      <View
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: Platform.OS === 'web' ? 'row' : 'column',
          alignItems: 'center',
          gap: Platform.OS === 'web' ? 80 : 0,
        }}>
        <View>
          <Controller
            defaultValue=""
            name="cardNumber"
            control={props.control}
            render={({ field: { onChange, value } }) => (
              <View>
                <Input
                  maxLength={19}
                  leftIcon={{ type: 'font-awesome', name: 'credit-card' }}
                  errorStyle={{ color: 'red' }}
                  keyboardType="numeric"
                  value={formatCardNumber(value)}
                  containerStyle={{ width: Platform.OS === 'web' ? width * 0.2 : width * 0.7 }}
                  onChangeText={(text) => {
                    const formattedText = text.replace(/[^\d]/g, '');
                    onChange(formattedText);
                  }}
                  inputContainerStyle={{
                    width: Platform.OS === 'web' ? width * 0.2 : width * 0.7,
                    gap: 4,
                  }}
                />
              </View>
            )}
          />
        </View>
        <CreditCard
          cardNumber={props.cardNumber}
          flag={props.cardInfo[0]?.niceType}
          shouldProceed={props.shouldProceed}
        />
      </View>
    </View>
  );
}
