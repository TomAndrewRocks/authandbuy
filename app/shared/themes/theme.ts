import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#207BD1',
    secondary: 'yellow',
  },
  breakpoints: {
    values: {
      xs: 330,
      sm: 414,
      md: 768,
      lg: 1024,
      xl: 1200,
    },
  },
};
