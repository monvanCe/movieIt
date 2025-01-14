import { StyleSheet } from 'react-native';

export const styles = (colors: ITheme) => {
  return StyleSheet.create({
    text: {
      color: colors.primaryText,
    },
  });
};
