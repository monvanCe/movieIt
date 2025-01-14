import {View, Animated, StyleSheet} from 'react-native';
import {useEffect, useRef} from 'react';
import {useAppSelector} from '@src/store/store';
import sizes from '@src/styles/sizes';

export default function SkeletonItem() {
  const appTheme = useAppSelector(state => state.appConfig.appTheme);
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, []);

  return (
    <View
      style={{
        height: '100%',
        aspectRatio: 9 / 13.5,
        marginHorizontal: sizes.paddings.small,
      }}>
      <Animated.View
        style={[
          styles.skeleton,
          {
            opacity,
            backgroundColor: appTheme === 'dark' ? '#404040' : '#E0E0E0',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
});
