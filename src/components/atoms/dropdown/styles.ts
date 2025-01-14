import {StyleSheet} from 'react-native';

import metricEngine from '@src/styles/metricEngine';
import sizes from '@src/styles/sizes';

export const styles = (colors: ITheme) => {
  const {paddings, fontSizes, borderRadius, borderWidths, margins} = sizes;

  return StyleSheet.create({
    container: {
      position: 'relative',
      width: '100%',
    },
    dropdownButton: {
      paddingHorizontal: paddings.small,
      paddingVertical: paddings.small,
      borderWidth: borderWidths.small,
      borderColor: colors.border,
      borderRadius: borderRadius.small,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: paddings.small,
      backgroundColor: colors.background,
    },
    dropdownButtonText: {
      fontSize: fontSizes.small,
      color: colors.primaryText,
    },
    dropdownMenu: {
      position: 'absolute',
      left: 0,
      right: 0,
      borderWidth: borderWidths.small,
      borderColor: colors.divider,
      borderRadius: borderRadius.small,
      backgroundColor: colors.surface,
      paddingHorizontal: paddings.small,
    },
    itemButton: {
      paddingVertical: paddings.small,
    },
    itemText: {
      fontSize: fontSizes.small,
      color: colors.primaryText,
    },
  });
};
