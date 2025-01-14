import {StyleSheet} from 'react-native';

import {borderRadius, borderWidths, paddings} from '@src/styles/sizes';

export const styles = (colors: ITheme) => {
  return StyleSheet.create({
    container: {
      borderWidth: borderWidths.small,
      padding: paddings.medium,
      borderColor: colors.border,
      borderRadius: borderRadius.medium,
      width: '100%',
      justifyContent: 'space-between',
      aspectRatio: 0.75,
    },
    text: {color: colors.primaryText},
  });
};
