import React from 'react';
import {View} from 'react-native';

import Friendlist from '@src/components/organism/friendList';
import UserLists from '@src/components/organism/userLists';
import {paddings} from '@src/styles/sizes';

export default function HomeScreen() {
  return (
    <>
      <View style={{flex: 1, padding: paddings.small, gap: paddings.medium}}>
        <UserLists />
        <Friendlist />
      </View>
    </>
  );
}
