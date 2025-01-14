import {StyleSheet} from 'react-native';

import metricEngine from '@src/styles/metricEngine';
import sizes from '@src/styles/sizes';

export const styles = (colors: any) => {
  const {paddings, borderRadius, borderWidths} = sizes;
  const {horizontalScale} = metricEngine;

  return StyleSheet.create({
    container: {
      height: '100%',
      aspectRatio: 9 / 13.5,
      marginHorizontal: paddings.small,
    },
    image: {
      height: '100%',
      width: '100%',
      borderRadius: borderRadius.small,
      borderWidth: borderWidths.small,
      borderColor: colors.border,
    },
  });
};
