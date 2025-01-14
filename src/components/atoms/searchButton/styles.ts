import {StyleSheet} from 'react-native';

import {borderRadius, borderWidths, margins, paddings} from '@src/styles/sizes';

export const styles = (colors: ITheme) => {
  return StyleSheet.create({
    container: {
      marginTop: margins.small,
      height: '6%',
      width: '100%',
      paddingHorizontal: paddings.medium,
    },
    buttonContainer: {
      borderWidth: borderWidths.small,
      borderColor: colors.border,
      borderRadius: borderRadius.small,
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      paddingHorizontal: paddings.medium,
    },
    buttonText: {color: colors.primaryText},
  });
};
