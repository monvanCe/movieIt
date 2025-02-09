import {StyleSheet} from 'react-native';

export const styles = (colors: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    emptyContainer: {
      flexDirection: 'row',
    },
  });
};
