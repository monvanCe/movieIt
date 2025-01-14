import { useState } from 'react';
import { Text, View } from 'react-native';

import theme from '@styles/theme';

import Dropdown from '../../components/atoms/dropdown';
import { styles } from './styles';

export default function () {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const colors = theme.useTheme();
  const style = styles(colors);

  return (
    <View style={style.container}>
      <Text style={style.text}>Lists: </Text>
      <View style={{ width: 75 }}>
        <Dropdown
          texts={['item 1', 'item 2', 'item 3']}
          text={selectedValue}
          onPress={e => setSelectedValue(e)}
        />
      </View>
    </View>
  );
}
