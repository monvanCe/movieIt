import {StyleSheet} from 'react-native';

import {borderRadius, borderWidths, margins, paddings} from '@src/styles/sizes';

export const styles = (colors: ITheme) => {
  return StyleSheet.create({
    container: {
      marginTop: margins.small,
      height: 48,
      width: '100%',
      paddingHorizontal: paddings.medium,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderWidth: borderWidths.small,
      borderColor: colors.border,
      borderRadius: borderRadius.medium,
      height: '100%',
      width: '100%',
      paddingHorizontal: paddings.medium,
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
      position: 'relative',
      zIndex: 1,
    },
    buttonText: {
      color: colors.tertiaryText,
      marginLeft: margins.medium,
    },
  });
};
