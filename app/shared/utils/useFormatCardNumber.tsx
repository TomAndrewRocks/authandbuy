export default function useFormatCardNumber() {
  const formatNumber = (cardNumber: string) => {
    if (!cardNumber) return '';
    const formattedNumber = cardNumber
      .replace(/\s/g, '')
      .match(/.{1,4}/g)
      ?.join(' ');
    return formattedNumber || '';
  };
  return formatNumber;
}
