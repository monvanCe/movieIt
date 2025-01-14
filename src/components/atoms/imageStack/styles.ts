import {StyleSheet} from 'react-native';

import {borderRadius} from '@src/styles/sizes';

export const styles = (colors: ITheme) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      aspectRatio: 2,
    },
    item: {
      aspectRatio: 1,
      borderRadius: borderRadius.small,
    },
  });
};
