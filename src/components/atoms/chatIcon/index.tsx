import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '@src/styles/theme';
import {componentSizes, margins, borderRadius} from '@src/styles/sizes';

type NavigationProp = NativeStackNavigationProp<IRootStackParamList>;

interface ChatIconProps {
  isNewNotification?: boolean;
}

export default function ChatIcon({isNewNotification = false}: ChatIconProps) {
  const navigation = useNavigation<NavigationProp>();
  const colors = theme.useTheme();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: margins.medium,
      right: margins.medium,
      zIndex: 1,
    },
    notificationDot: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: componentSizes.icon.small / 2,
      height: componentSizes.icon.small / 2,
      borderRadius: borderRadius.circle,
      backgroundColor: colors.error,
    },
  });

  const handlePress = () => {
    navigation.navigate('Chat');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Icon
        name="message-text-outline"
        size={componentSizes.icon.medium}
        color={colors.primaryText}
      />
      {isNewNotification && <View style={styles.notificationDot} />}
    </TouchableOpacity>
  );
}
