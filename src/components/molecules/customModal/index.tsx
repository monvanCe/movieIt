import React, {useMemo} from 'react';
import {
  DimensionValue,
  Dimensions,
  GestureResponderEvent,
  Modal,
  PanResponder,
  PanResponderGestureState,
  Platform,
  TouchableOpacity,
  View,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
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
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 15,
          mass: 0.8,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 15,
          mass: 0.8,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

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

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [containerHeight, 0],
  });

  return (
    <Modal
      statusBarTranslucent
      transparent
      visible={visible}
      animationType="none">
      <Animated.View
        style={[
          style.modalOverlay,
          {
            opacity: overlayOpacity,
          },
        ]}>
        <TouchableOpacity style={{flex: 1}} onPress={onPress} />
      </Animated.View>

      <Animated.View
        {...pandResponser.panHandlers}
        style={[
          style.modalContainer,
          {
            transform: [{translateY}],
          },
        ]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
              keyboardShouldPersistTaps="handled">
              {children}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}
