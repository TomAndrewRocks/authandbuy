import TextBox from '@components/Box/TextBox';
import ActionButton from '@components/Buttons/ActionButton';
import LayoutScreen from '@components/Layout';
import CardForm from '@components/Payments/CardForm';
import { useCreditCardStore } from '@contexts/ICreditCardStore';
import { useBiometrics } from '@contexts/useBiometrics';
import { CardTypeInfoProps, CreditCardProps } from '@interfaces/ICreditCard';
import { theme } from '@themes/theme';
import { useCreditCardValidator } from '@utils/useCreditCardValidator';
import useMeasures from '@utils/useMeasures';
import useScreenGuard from '@utils/useScreenGuard';
import creditCardType from 'credit-card-type';
import { useFocusEffect } from 'expo-router';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, FlatList, Keyboard, Platform, Text, View } from 'react-native';

export default function Payments() {
  const { height } = useMeasures();
  const { handleBiometrics } = useScreenGuard();
  const { isBiometricsChecked, hasBiometrics } = useBiometrics();
  const { creditCardList, addCreditCardToList } = useCreditCardStore();
  const [showCardForm, setShowCardForm] = React.useState(false);
  const [shouldProceed, setShouldProceed] = React.useState(false);
  const [isSheetOpen, setSheetOpen] = React.useState(false);
  const [cardFlatlist, setCardFlatlist] = React.useState<CreditCardProps[] | []>([]);
  const cardValidator = useCreditCardValidator();

  const {
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: cardValidator,
  });

  const cardNumber = useWatch({ control, name: 'cardNumber', defaultValue: '' });
  const cardInfo = React.useMemo<CardTypeInfoProps[]>(
    () => creditCardType(cardNumber),
    [cardNumber],
  );

  useFocusEffect(
    React.useCallback(() => {
      setShouldProceed(false);
      setShowCardForm(false);
      reset();
      if (hasBiometrics) {
        if (isBiometricsChecked) {
          if (creditCardList.length !== 0) {
            handleBiometrics();
          }
        }
      }
    }, [isBiometricsChecked, cardFlatlist]),
  );

  React.useEffect(() => {
    const filteredList = creditCardList.filter(
      (item, index, self) => index === self.findIndex((t) => t.cardNumber === item.cardNumber),
    );
    setCardFlatlist(filteredList);
  }, [creditCardList]);

  const formatCardNumber = (cardNumber: string) => {
    if (!cardNumber) return '';
    const formattedNumber = cardNumber
      .replace(/\s/g, '')
      .match(/.{1,4}/g)
      ?.join(' ');
    return formattedNumber || '';
  };

  React.useEffect(() => {
    if (cardNumber.length >= 19) {
      Keyboard.dismiss();
      setTimeout(() => {
        setSheetOpen(true);
      }, 300);
    }
  }, [cardNumber]);

  const onCancelSheet = () => {
    setSheetOpen(false);
  };

  const onCompleteSheet = () => {
    const isCardNumberExists = creditCardList.some((card) => card.cardNumber === cardNumber);
    if (isCardNumberExists) {
      Alert.alert('Duplicated Card', 'This card number is already added.');
    } else {
      addCreditCardToList(cardInfo[0]?.niceType, cardNumber);
      setSheetOpen(false);
      setShowCardForm(false);
      reset();
    }
  };

  const creditCardListReversed = React.useMemo(
    () => creditCardList.slice().reverse(),
    [creditCardList],
  );

  return (
    <LayoutScreen>
      {creditCardList.length === 0 && !showCardForm ? (
        <>
          {Platform.OS === 'web' ? (
            ''
          ) : (
            <AnimatedLottieView
              autoPlay
              source={require('../../../assets/credit.json')}
              style={{
                height: height * 0.32,
              }}
            />
          )}
          <View style={{ gap: 35, alignItems: 'center' }}>
            <TextBox>
              <Text>It seems you haven't </Text>
              <Text>a single credit card registered... (yet!)</Text>
            </TextBox>
            <ActionButton
              title="Add Card"
              bgColor={theme.lightColors?.primary}
              onPress={() => setShowCardForm(true)}
              icon="card"
            />
          </View>
        </>
      ) : (
        <CardForm
          control={control}
          errors={errors}
          formatCardNumber={formatCardNumber}
          cardNumber={cardNumber}
          cardInfo={cardInfo}
          shouldProceed={shouldProceed}
        />
      )}
    </LayoutScreen>
  );
}
