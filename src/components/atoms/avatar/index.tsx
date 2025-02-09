import React from 'react';
import {Image, View} from 'react-native';
import {borderRadius} from '@src/styles/sizes';
import theme from '@src/styles/theme';

interface AvatarProps {
  size: number;
  avatarId: number;
}

export default function Avatar({size, avatarId}: AvatarProps) {
  const colors = theme.useTheme();

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.divider,
      }}>
      <Image
        source={{uri: avatarId?.toString()}}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  );
}
