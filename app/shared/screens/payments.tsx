import TextBox from '@components/Box/TextBox';
import ActionButton from '@components/Buttons/ActionButton';
import LayoutScreen from '@components/Layout';
import CardForm from '@components/Payments/CardForm';
import { CreditCard } from '@components/Payments/CreditCard';
import { Sheet } from '@components/Sheet';
import { useBiometrics } from '@contexts/useBiometrics';
import { useCreditCardStore } from '@contexts/useCreditCardStore';
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
  const [isOpen, setOpen] = React.useState(false);
  const [showCardForm, setShowCardForm] = React.useState(false);
  const [shouldProceed, setShouldProceed] = React.useState(false);
  const [cardFlatlist, setCardFlatlist] = React.useState<CreditCardProps[] | []>([]);
  const cardValidator = useCreditCardValidator();
  const { formatNumber } = useFormatCardNumber();

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
    }, [isBiometricsChecked, cardFlatlist]),
  );

  React.useEffect(() => {
    const filteredList = creditCardList.filter(
      (item, index, self) => index === self.findIndex((t) => t.cardNumber === item.cardNumber),
    );
    setCardFlatlist(filteredList);
  }, [creditCardList]);

  const onSubmit = async () => {
    try {
      setShouldProceed(true);
      console.log('Form data is valid:');
    } catch (error) {
      console.log('Form data is invalid', error);
    }
  };

  React.useEffect(() => {
    if (isValid) {
      Keyboard.dismiss();
      setOpen(true);
      onSubmit();
    }
  }, [isValid]);

  const creditCardListReversed = React.useMemo(
    () => creditCardList.slice().reverse(),
    [creditCardList],
  );

  const cardExists = creditCardList.some(
    (card) => card.cardNumber === cardNumber && card.flag === cardInfo[0]?.niceType,
  );

  const handleNewCard = () => {
    setOpen(false);
    if (cardExists) {
      Alert.alert('Card already added on your list! Try another card.');
    } else {
      addCreditCardToList(cardInfo[0]?.niceType, cardNumber);
      console.log('Novo cartão adicionado com sucesso!');
    }
  };

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
              title="Add a card"
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
          formatCardNumber={formatNumber}
          cardNumber={cardNumber}
          cardInfo={cardInfo}
          shouldProceed={shouldProceed}
        />
      ) : (
        <FlatList
          data={creditCardListReversed}
          keyExtractor={(item) => item.cardNumber}
          ItemSeparatorComponent={() => (
            <Divider width={1} color={theme.lightColors?.grey0} style={{ paddingVertical: 12 }} />
          )}
          ListFooterComponentStyle={{ marginVertical: 35 }}
          ListFooterComponent={
            <ActionButton icon="card" title="New card" onPress={() => setShowCardForm(true)} />
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
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            gap: 30,
          }}>
          {cardExists ? (
            <Text>Card already added on your list! Try another card.</Text>
          ) : (
            <>
              <Text>Would like to add this card to your account?</Text>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <ActionButton
                  onPress={handleNewCard}
                  title="Add Card"
                  type="solid"
                  bgColor={theme.lightColors?.primary}
                />
                <ActionButton
                  onPress={() => setOpen(false)}
                  title="Cancel"
                  type="solid"
                  bgColor={theme.lightColors?.error}
                />
              </View>
            </>
          )}
        </View>
      </Sheet>
    </LayoutScreen>
  );
}
