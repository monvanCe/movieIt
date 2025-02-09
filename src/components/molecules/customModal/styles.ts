import {StyleSheet} from 'react-native';

import metricEngine from '@src/styles/metricEngine';
import sizes from '@src/styles/sizes';

export const styles = (colors: ITheme) => {
  const {horizontalScale} = metricEngine;
  const {borderRadius, paddings} = sizes;

  return StyleSheet.create({
    modalContainer: {
      width: '100%',
      backgroundColor: colors.surface,
      borderTopRightRadius: borderRadius.large,
      borderTopLeftRadius: borderRadius.large,
      bottom: 0,
      position: 'absolute',
      justifyContent: 'flex-end',
      paddingTop: paddings.medium,
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: -3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    iconButtonContainer: {
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingHorizontal: paddings.medium,
      marginBottom: paddings.medium,
    },
    modalSlider: {
      height: 5,
      backgroundColor: colors.divider,
      width: '15%',
      position: 'absolute',
      left: '42.5%',
      right: '42.5%',
      borderRadius: borderRadius.large,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: colors.background,
      opacity: 0.5,
    },
  });
};
