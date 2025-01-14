import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import theme from '@src/styles/theme';

import {styles} from './styles';

interface props extends IText, IOnPress {
  overrideStyle?: any;
}

export default function Button({text, onPress, overrideStyle}: props) {
  const colors = theme.useTheme();
  const style = React.useMemo(() => styles(colors), [colors]);

  return (
    <TouchableOpacity style={overrideStyle} onPress={onPress}>
      <Text style={style.text}>{text}</Text>
    </TouchableOpacity>
  );
}
