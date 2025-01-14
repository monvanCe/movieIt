import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import useToggle from '@src/hooks/useToggle';
import i18n from '@src/localization/index';
import metricEngine from '@src/styles/metricEngine';
import sizes from '@src/styles/sizes';
import theme from '@src/styles/theme';
import {MotiView} from 'moti';

import {styles} from './styles';

interface props extends IText, ITexts, IOnPressWithParam {}

export default function Dropdown({texts, text, onPress}: props) {
  const {isToggle, close, toggle} = useToggle();
  const [height, setHeight] = React.useState(0);
  const dropdownRef = React.useRef(null);
  const colors = theme.useTheme();
  const style = React.useMemo(() => styles(colors), [colors]);
  const {fontSizes} = sizes;

  const getDropdownHeight = React.useCallback(() => {
    if (dropdownRef.current) {
      const dropdown: any = dropdownRef.current;
      dropdown.measure(
        (x: any, y: any, width: any, height: any, pageX: any, pageY: any) => {
          setHeight(height);
        },
      );
    }
  }, [dropdownRef, setHeight]);

  return (
    <View style={style.container}>
      <TouchableOpacity
        activeOpacity={1}
        ref={dropdownRef}
        onPress={() => {
          toggle();
          getDropdownHeight();
        }}
        style={style.dropdownButton}>
        <View style={{flex: 1}}>
          <Text numberOfLines={1} style={style.dropdownButtonText}>
            {text || i18n.t('none')}
          </Text>
        </View>
        <View style={{width: 15}}>
          <Ionicons
            name={isToggle ? 'caret-up' : 'caret-down'}
            size={metricEngine.moderateScale(fontSizes.small)}
            color={colors.primaryText}
          />
        </View>
      </TouchableOpacity>
      {isToggle && (
        <MotiView
          from={{opacity: 0}}
          animate={{opacity: 1}}
          style={[style.dropdownMenu, {top: height + 2}]}>
          {texts.map((item: string) => (
            <View key={item.toString()}>
              <TouchableOpacity
                style={style.itemButton}
                onPress={() => {
                  onPress(item);
                  close();
                }}>
                <Text style={style.itemText}>{item}</Text>
              </TouchableOpacity>
              {item !== texts[texts.length - 1] && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.divider,
                  }}
                />
              )}
            </View>
          ))}
        </MotiView>
      )}
    </View>
  );
}
