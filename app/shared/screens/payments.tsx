import TextBox from '@components/Box/TextBox';
import ActionButton from '@components/Buttons/ActionButton';
import LayoutScreen from '@components/Layout';
import CardForm from '@components/Payments/CardForm';
import { CreditCard } from '@components/Payments/CreditCard';
import { useCreditCardStore } from '@contexts/ICreditCardStore';
import { useBiometrics } from '@contexts/useBiometrics';
import { CardTypeInfoProps, CreditCardProps } from '@interfaces/ICreditCard';
import { Divider } from '@rneui/themed';
import { theme } from '@themes/theme';
import { useCreditCardValidator } from '@utils/useCreditCardValidator';
import useFormatCardNumber from '@utils/useFormatCardNumber';
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

  const formatCardNumber = useFormatCardNumber();

  const {
    control,
    reset,
    trigger,
    formState: { errors, isValid },
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

  const onSubmit = async () => {
    const isValid = await trigger(); // Trigger validation

    if (isValid) {
      // Proceed with form submission
      console.log('Form data is valid:');
    } else {
      // Show errors in the form
      console.log('Form data is invalid');
    }
  };

  React.useEffect(() => {
    if (isValid) {
      Keyboard.dismiss();
      onSubmit();
      setTimeout(() => {
        setSheetOpen(true);
      }, 300);
    }
  }, [isValid]);

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
      ) : showCardForm ? (
        <CardForm
          control={control}
          errors={errors}
          formatCardNumber={formatCardNumber}
          cardNumber={cardNumber}
          cardInfo={cardInfo}
          shouldProceed={shouldProceed}
        />
      ) : (
        <FlatList
          data={creditCardListReversed}
          keyExtractor={(item) => item.cardNumber}
          ItemSeparatorComponent={() => <Divider width={5} color={theme?.lightColors?.primary} />}
          ListFooterComponentStyle={{ marginVertical: 35 }}
          ListFooterComponent={
            <ActionButton
              icon="credit-card"
              title="Add new Credit Card"
              onPress={() => setShowCardForm(true)}
            />
          }
          renderItem={({ item }) => (
            <CreditCard
              cardNumber={item.cardNumber}
              flag={item.flag}
              shouldProceed={shouldProceed}
            />
          )}
        />
      )}
    </LayoutScreen>
  );
}
