import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

import Friendlist from '@src/components/organism/friendList';
import UserLists from '@src/components/organism/userLists';
import Header from '@src/components/organism/header';
import ChatIcon from '@src/components/atoms/chatIcon';
import {paddings} from '@src/styles/sizes';
import theme from '@src/styles/theme';
import {useAppSelector} from '@src/store/store';

export default function HomeScreen() {
  const colors = theme.useTheme();
  const currentUser = useAppSelector(state => state.auth.currentUser);
  const movies = useAppSelector(state => state.movies);
  const {messages, lastSeenMessage} = useAppSelector(state => state.chat);

  const allWatchlistMovieCount =
    (movies?.user?.watchlist?.length || 0) +
    (movies?.friends?.reduce((acc, f) => acc + (f.watchlist?.length || 0), 0) ||
      0);

  const allWatchedMovieCount =
    (movies?.user?.watched?.length || 0) +
    (movies?.friends?.reduce((acc, f) => acc + (f.watched?.length || 0), 0) ||
      0);

  const friends = useAppSelector(state => state.movies.friends);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: paddings.medium,
    },
  });

  return (
    <View style={styles.container}>
      <ChatIcon
        isNewNotification={
          messages.length > 0
            ? messages[messages.length - 1]._id !== lastSeenMessage
            : false
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
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
    </View>
  );
}
