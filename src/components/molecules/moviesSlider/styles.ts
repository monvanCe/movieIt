import {StyleSheet} from 'react-native';

import sizes from '@src/styles/sizes';

export const styles = (colors: ITheme) => {
  const {paddings, fontSizes} = sizes;

  return StyleSheet.create({
    text: {
      color: colors.primaryText,
      paddingLeft: paddings.small,
      paddingVertical: paddings.small,
      fontSize: fontSizes.medium,
      fontWeight: 'bold',
    },
    horizontalContainer: {
      height: 150,
    },
  });
};
