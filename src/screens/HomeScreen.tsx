import React from 'react';
import {View, ScrollView} from 'react-native';

import Friendlist from '@src/components/organism/friendList';
import UserLists from '@src/components/organism/userLists';
import Header from '@src/components/organism/header';
import {paddings} from '@src/styles/sizes';
import theme from '@src/styles/theme';
import {useAppSelector} from '@src/store/store';

export default function HomeScreen() {
  const colors = theme.useTheme();
  const currentUser = useAppSelector(state => state.auth.currentUser);
  const movies = useAppSelector(state => state.movies);

  const allWatchlistMovieCount =
    (movies?.user?.watchlist?.length || 0) +
    (movies?.friends?.reduce((acc, f) => acc + (f.watchlist?.length || 0), 0) ||
      0);

  const allWatchedMovieCount =
    (movies?.user?.watched?.length || 0) +
    (movies?.friends?.reduce((acc, f) => acc + (f.watched?.length || 0), 0) ||
      0);

  const friends = useAppSelector(state => state.movies.friends);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      showsVerticalScrollIndicator={false}>
      <View style={{padding: paddings.medium}}>
        <Header
          userName={currentUser?.userName || ''}
          bio={currentUser?.bio}
          avatarId={currentUser?.avatarId || 1}
          watchlistCount={allWatchlistMovieCount}
          watchedCount={allWatchedMovieCount}
          friendsCount={friends.length}
        />
        <UserLists />
        <Friendlist />
      </View>
    </ScrollView>
  );
}
