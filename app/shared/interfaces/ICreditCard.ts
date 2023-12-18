export interface CardTypeInfoProps {
  type: string;
  niceType: string;
}

export interface CreditCardProps {
  flag: string;
  cardNumber: string;
}

export interface ICreditCardProps {
  creditCardList: CreditCardProps[];
  addCreditCardToList: (flag: string, number: string) => void;
}
