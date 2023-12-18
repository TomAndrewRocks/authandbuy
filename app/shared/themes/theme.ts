import { createTheme } from '@rneui/themed';

export const theme = createTheme({
  lightColors: {
    primary: '#207BD1',
    secondary: '#F3DC0E',
    white: '#FFFFFF',
    black: '#000',
    error: '#FF0000',
    background: '#FFFFFF',
  },
  darkColors: {
    primary: '#171717',
  },
  spacing: {
    xs: 330,
    sm: 414,
    md: 768,
    lg: 1024,
    xl: 1200,
  },
  mode: 'light',
});
