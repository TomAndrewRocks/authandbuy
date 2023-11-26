import { Dimensions } from 'react-native';

export default function useMeasures() {
  const { width, height } = Dimensions.get('window');
  return { width, height };
}
