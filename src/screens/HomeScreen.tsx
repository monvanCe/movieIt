import React from 'react';
import {View} from 'react-native';

import Friendlist from '@src/components/organism/friendList';
import UserLists from '@src/components/organism/userLists';
import {paddings} from '@src/styles/sizes';
import theme from '@src/styles/theme';

export default function HomeScreen() {
  const colors = theme.useTheme();
  return (
    <>
      <View
        style={{
          flex: 1,
          padding: paddings.small,
          gap: paddings.medium,
          backgroundColor: colors.background,
        }}>
        <UserLists />
        <Friendlist />
      </View>
    </>
  );
}
