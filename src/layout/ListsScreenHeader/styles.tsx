import {StyleSheet} from 'react-native';

import sizes from '@src/styles/sizes';

export const styles = (colors: ITheme) => {
  const {paddings} = sizes;

  return StyleSheet.create({
    container: {
      paddingVertical: paddings.small,
      paddingHorizontal: paddings.small,

      zIndex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: paddings.small,
    },
    text: {
      color: colors.primaryText,
    },
  });
};
