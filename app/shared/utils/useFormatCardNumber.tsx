export default function useFormatCardNumber() {
  const formatNumber = (cardNumber: string) => {
    if (!cardNumber) return '';
    const formattedNumber = cardNumber
      .replace(/\s/g, '')
      .match(/.{1,4}/g)
      ?.join(' ');
    return formattedNumber || '';
  };

  const showLastFourDigits = (number: string) => {
    if (!number) return '';
    const lastFourDigits = number.slice(-4);
    return `**** **** **** ${lastFourDigits}`;
  };

  return {
    formatNumber,
    showLastFourDigits,
  };
}
