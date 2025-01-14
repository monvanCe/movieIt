import { createTheming } from '@callstack/react-theme-provider';

export const themes = {
  light: {
    primary: '#6200EE',
    secondary: '#03DAC6',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primaryText: '#000000',
    secondaryText: '#757575',
    tertiaryText: '#BDBDBD',
    error: '#B00020',
    warning: '#F9A825',
    success: '#388E3C',
    info: '#1976D2',
    border: '#E0E0E0',
    divider: '#BDBDBD',
    iconPrimary: '#6200EE',
    iconSecondary: '#757575',
  },
  dark: {
    primary: '#BB86FC',
    secondary: '#03DAC6',
    background: '#121212',
    surface: '#333333',
    primaryText: '#FFFFFF',
    secondaryText: '#E0E0E0',
    tertiaryText: '#BDBDBD',
    error: '#CF6679',
    warning: '#F9A825',
    success: '#388E3C',
    info: '#1976D2',
    border: '#4D4D4D',
    divider: '#484848',
    iconPrimary: '#BB86FC',
    iconSecondary: '#E0E0E0',
  },
};

const { ThemeProvider, withTheme, useTheme } = createTheming(themes.light);

export default { ThemeProvider, withTheme, useTheme };
