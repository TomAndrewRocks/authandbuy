import { createTheme } from '@rneui/themed';

export const theme = createTheme({
  lightColors: {
    primary: '#207BD1',
    secondary: '#F3DC0E',
    white: '#FFFFFF',
    black: '#191919',
    error: '#d83a3a',
    grey0: '#c4c4c4',
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
