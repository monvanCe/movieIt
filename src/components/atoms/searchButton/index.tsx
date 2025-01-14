import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import theme from '@src/styles/theme';

import {styles} from './styles';

interface ISearchButton extends IOnPress {}

export default function SearchButton({onPress}: ISearchButton) {
  const colors = theme.useTheme();
  const style = React.useMemo(() => styles(colors), [colors]);
  return (
    <TouchableOpacity onPress={onPress} style={style.container}>
      <View style={style.buttonContainer}>
        <Text style={style.buttonText}>Search</Text>
      </View>
    </TouchableOpacity>
  );
}
