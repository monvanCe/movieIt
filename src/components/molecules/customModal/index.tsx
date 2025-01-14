import React, {useMemo} from 'react';
import {
  DimensionValue,
  Dimensions,
  GestureResponderEvent,
  Modal,
  PanResponder,
  PanResponderGestureState,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import IconButton from '@src/components/atoms/iconbutton';
import {paddings} from '@src/styles/sizes';
import theme from '@src/styles/theme';

import {styles} from './styles';

interface ICustomModalWithHeight extends IChildren, IVisible, IOnPress {
  height: DimensionValue;
}

export default function CustomModal({
  children,
  visible,
  onPress,
  height,
}: ICustomModalWithHeight) {
  const screenHeight = Dimensions.get('screen').height;
  const windowHeight = Dimensions.get('window').height;
  const containerHeight: any = useMemo(
    () =>
      typeof height === 'string'
        ? screenHeight * (parseFloat(height) / 100)
        : height,
    [height],
  );
  const insets = useSafeAreaInsets();
  const colors = theme.useTheme();
  const style = React.useMemo(() => styles(colors), [colors]);
  const [changeY, setChangeY] = React.useState(0);

  const handleMove = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    setChangeY(prev => prev + gestureState.dy);
    if (gestureState.dy > 50) {
      onPress();
    }
  };

  const handleRelease = () => {
    setChangeY(0);
  };

  const pandResponser = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: handleMove,
    onPanResponderRelease: handleRelease,
  });

  return (
    <>
      <Modal
        statusBarTranslucent
        animationType="slide"
        transparent
        visible={visible}>
        <TouchableOpacity
          style={{flex: 1, backgroundColor: 'black', opacity: 0.1}}
          onPress={onPress}
        />

        <View {...pandResponser.panHandlers} style={style.modalContainer}>
          <View
            style={{
              height: containerHeight - changeY,
              maxHeight:
                windowHeight - (Platform.OS === 'ios' ? insets.top : 0),
              paddingHorizontal: paddings.medium,
              paddingBottom: insets.bottom,
            }}>
            <View style={style.iconButtonContainer}>
              <View style={style.modalSlider} />
              <IconButton icon="close" onPress={onPress} />
            </View>
            {children}
          </View>
        </View>
      </Modal>
    </>
  );
}
