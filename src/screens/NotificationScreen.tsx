import {useEffect} from 'react';
import {View, Image} from 'react-native';

import PrimaryText from '@src/components/atoms/primary-text';
import SecondaryText from '@src/components/atoms/secondary-text';
import {lowResImage} from '@src/const/imageSources';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useNotification from '@src/hooks/useNotification';
import {FlashList} from '@shopify/flash-list';
import {borderRadius, borderWidths, paddings} from '@src/styles/sizes';
import theme from '@src/styles/theme';
import {
  notificationTypes,
  notificationActionTypes,
  movieActionTypes,
} from '@src/const/enums';

export default function NotificationScreen() {
  const colors = theme.useTheme();
  const {
    notifications,
    loadNotifications,
    userId,
    acceptFriendshipRequest,
    rejectFriendshipRequest,
    cancelFriendshipRequest,
    answerFriendMovieRequest,
  } = useNotification();

  useEffect(() => {
    loadNotifications();
  }, []);

  const colorRenderer = (type: string) => {
    switch (type) {
      case 'send':
        return colors.warning;
      case notificationActionTypes.accept:
        return colors.success;
      case notificationActionTypes.reject:
        return colors.error;
      case notificationActionTypes.cancelled:
        return colors.border;
      case 'removing':
        return colors.border;
    }
  };

  const nameRenderer = (item: any) => {
    if (item.from._id === userId) {
      return item.to.userName;
    } else {
      return item.from.userName;
    }
  };

  const isReceived = (item: any) => {
    if (item.status !== 'send') return false;

    return item.to._id === userId;
  };

  const isSent = (item: any) => {
    if (item.status !== 'send') return false;

    return item.from._id === userId;
  };

  const movieIconRenderer = (item: any) => {
    if (item.type === notificationTypes.friendshipMovies) {
      switch (item.movieType) {
        case movieActionTypes.towatched:
          return 'add';
        case movieActionTypes.watched:
          return 'checkmark';
      }
    }

    if (item.type === notificationTypes.friendship) {
      return 'add';
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <FlashList
        data={notifications}
        renderItem={({item, index}: {item: any; index: number}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: paddings.medium,
              borderWidth: borderWidths.small,
              borderColor: colorRenderer(item.status),
              margin: paddings.medium,
              gap: paddings.medium,
              borderRadius: borderRadius.medium,
              opacity: item.status === 'send' ? 1 : 0.5,
            }}>
            <View style={{position: 'relative'}}>
              <Image
                source={{
                  uri:
                    item.type === notificationTypes.friendship
                      ? item.image
                      : lowResImage(item.image),
                }}
                style={{height: 50, aspectRatio: 1}}
              />

              <View
                style={{
                  position: 'absolute',
                  borderRadius: 50,
                  right: 0,
                  bottom: 0,
                  backgroundColor:
                    item.movieType === movieActionTypes.towatched
                      ? colors.warning
                      : colors.success,
                }}>
                <Ionicons
                  name={movieIconRenderer(item) || 'add'}
                  size={16}
                  color={colors.primaryText}
                />
              </View>
            </View>
            <View style={{marginRight: 'auto', maxWidth: '50%'}}>
              <PrimaryText>{nameRenderer(item)}</PrimaryText>
              <SecondaryText>{item.subTitle}</SecondaryText>
            </View>
            {isReceived(item) && (
              <>
                <Ionicons
                  name="checkmark-circle"
                  size={32}
                  color={colors.success}
                  onPress={() =>
                    item.type === notificationTypes.friendshipMovies
                      ? answerFriendMovieRequest(
                          item._id,
                          notificationActionTypes.accept,
                          item.movie,
                          item.movieType,
                        )
                      : acceptFriendshipRequest(item._id)
                  }
                />
                <Ionicons
                  name="close-circle"
                  size={32}
                  color={colors.error}
                  onPress={() =>
                    item.type === notificationTypes.friendshipMovies
                      ? answerFriendMovieRequest(
                          item._id,
                          notificationActionTypes.reject,
                          item.movie,
                          item.movieType,
                        )
                      : rejectFriendshipRequest(item._id)
                  }
                />
              </>
            )}
            {isSent(item) && (
              <>
                <Ionicons
                  name="close-circle"
                  size={32}
                  color={colors.error}
                  onPress={() => {
                    item.type === notificationTypes.friendshipMovies
                      ? answerFriendMovieRequest(
                          item._id,
                          notificationActionTypes.cancelled,
                          item.movie,
                          item.movieType,
                        )
                      : cancelFriendshipRequest(item._id);
                  }}
                />
              </>
            )}
          </View>
        )}
        estimatedItemSize={100}
      />
    </View>
  );
}
