import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import theme from '@src/styles/theme';
import {styles} from './styles';
import i18n from '@src/localization';

interface ISearchButton extends IOnPress {}

export default function SearchButton({onPress}: ISearchButton) {
  const colors = theme.useTheme();
  const style = React.useMemo(() => styles(colors), [colors]);

  return (
    <TouchableOpacity onPress={onPress} style={style.container}>
      <View style={style.buttonContainer}>
        <Ionicons name="search" size={20} color={colors.tertiaryText} />
        <Text style={style.buttonText}>{i18n.t('search')}</Text>
      </View>
    </TouchableOpacity>
  );
}
