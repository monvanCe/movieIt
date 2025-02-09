import React, {useEffect, useCallback} from 'react';
import {View, Image, RefreshControl} from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import PrimaryText from '@src/components/atoms/primary-text';
import SecondaryText from '@src/components/atoms/secondary-text';
import {lowResImage} from '@src/const/imageSources';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useNotification from '@src/hooks/useNotification';
import {FlashList} from '@shopify/flash-list';
import {borderRadius, borderWidths, paddings, margins} from '@src/styles/sizes';
import theme from '@src/styles/theme';
import {
  notificationTypes,
  notificationActionTypes,
  movieActionTypes,
} from '@src/const/enums';
import i18n from '@src/localization';
import useToggle from '@src/hooks/useToggle';

type NotificationActions = {
  colorRenderer: (type: string) => string;
  nameRenderer: (item: INotification) => string;
  isReceived: (item: INotification) => boolean;
  isSent: (item: INotification) => boolean;
  movieIconRenderer: (item: INotification) => string | undefined;
  acceptFriendshipRequest: (id: string) => void;
  rejectFriendshipRequest: (id: string) => void;
  cancelFriendshipRequest: (id: string) => void;
  answerFriendMovieRequest: (
    id: string,
    status: notificationActionTypes,
    movie: any,
    movieType: string,
  ) => void;
};

type NotificationItemProps = {
  item: INotification;
  index: number;
  colors: ITheme;
  onAction: NotificationActions;
};

const NotificationItem = ({
  item,
  index,
  colors,
  onAction,
}: NotificationItemProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(item.status === 'send' ? 1 : 0.5, {
        duration: 300,
      }),
    };
  });

  const handleMovieAction = (status: string) => {
    if (item.type === notificationTypes.friendshipMovies && item.movieType) {
      onAction.answerFriendMovieRequest(
        item._id,
        status as notificationActionTypes,
        item.movie,
        item.movieType,
      );
    } else if (status === notificationActionTypes.accept) {
      onAction.acceptFriendshipRequest(item._id);
    } else if (status === notificationActionTypes.reject) {
      onAction.rejectFriendshipRequest(item._id);
    } else {
      onAction.cancelFriendshipRequest(item._id);
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          padding: paddings.medium,
          borderWidth: borderWidths.small,
          borderColor: onAction.colorRenderer(item.status),
          gap: paddings.medium,
          borderRadius: borderRadius.medium,
          backgroundColor: colors.background,
          shadowColor: colors.primary,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        },
        animatedStyle,
      ]}>
      <View style={{position: 'relative'}}>
        <Image
          source={{
            uri:
              item.type === notificationTypes.friendship
                ? item.image
                : lowResImage(item.image),
          }}
          style={{
            height: 45,
            aspectRatio: 1,
            borderRadius: borderRadius.small,
          }}
        />
        <View
          style={{
            position: 'absolute',
            borderRadius: 50,
            right: -4,
            bottom: -4,
            backgroundColor:
              item.movieType === movieActionTypes.towatched
                ? colors.warning
                : colors.success,
            padding: 4,
          }}>
          <Ionicons
            name={onAction.movieIconRenderer(item) || 'add'}
            size={14}
            color={colors.primaryText}
          />
        </View>
      </View>
      <View style={{flex: 1, marginRight: paddings.small}}>
        <PrimaryText style={{fontSize: 15, fontWeight: '600'}}>
          {onAction.nameRenderer(item)}
        </PrimaryText>
        <SecondaryText numberOfLines={2} style={{fontSize: 13, marginTop: 2}}>
          {item.subTitle}
        </SecondaryText>
      </View>
      {onAction.isReceived(item) && (
        <View style={{flexDirection: 'row', gap: paddings.small}}>
          <Ionicons
            name="checkmark-circle"
            size={28}
            color={colors.success}
            onPress={() => handleMovieAction(notificationActionTypes.accept)}
            style={{
              padding: 4,
              backgroundColor: colors.background,
              borderRadius: borderRadius.large,
            }}
          />
          <Ionicons
            name="close-circle"
            size={28}
            color={colors.error}
            onPress={() => handleMovieAction(notificationActionTypes.reject)}
            style={{
              padding: 4,
              backgroundColor: colors.background,
              borderRadius: borderRadius.large,
            }}
          />
        </View>
      )}
      {onAction.isSent(item) && (
        <Ionicons
          name="close-circle"
          size={28}
          color={colors.error}
          onPress={() => handleMovieAction(notificationActionTypes.cancelled)}
          style={{
            padding: 4,
            backgroundColor: colors.background,
            borderRadius: borderRadius.large,
          }}
        />
      )}
    </Animated.View>
  );
};

export default function NotificationScreen() {
  const colors = theme.useTheme();
  const {
    isToggle: isLoading,
    open: startLoading,
    close: stopLoading,
  } = useToggle();
  const {
    notifications,
    loadNotifications,
    userId,
    acceptFriendshipRequest,
    rejectFriendshipRequest,
    cancelFriendshipRequest,
    answerFriendMovieRequest,
  } = useNotification();

  const onRefresh = useCallback(async () => {
    startLoading();
    await loadNotifications();
    stopLoading();
  }, []);

  useEffect(() => {
    loadNotifications();
  }, []);

  const colorRenderer = (type: string): string => {
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
      default:
        return colors.border;
    }
  };

  const nameRenderer = (item: INotification): string => {
    if (item.from._id === userId) {
      return item.to.userName;
    } else {
      return item.from.userName;
    }
  };

  const isReceived = (item: INotification): boolean => {
    if (item.status !== 'send') return false;
    return item.to._id === userId;
  };

  const isSent = (item: INotification): boolean => {
    if (item.status !== 'send') return false;
    return item.from._id === userId;
  };

  const movieIconRenderer = (item: INotification): string | undefined => {
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

  const EmptyComponent = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: margins.large * 2,
      }}>
      <Ionicons
        name="notifications-off-outline"
        size={48}
        color={colors.secondaryText}
      />
      <PrimaryText
        style={{marginTop: margins.medium, color: colors.secondaryText}}>
        {i18n.t('noNotifications')}
      </PrimaryText>
    </View>
  );

  const actions: NotificationActions = {
    colorRenderer,
    nameRenderer,
    isReceived,
    isSent,
    movieIconRenderer,
    acceptFriendshipRequest,
    rejectFriendshipRequest,
    cancelFriendshipRequest,
    answerFriendMovieRequest,
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <FlashList
        data={notifications}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={{padding: paddings.small}}
        ItemSeparatorComponent={() => <View style={{height: paddings.small}} />}
        ListEmptyComponent={EmptyComponent}
        renderItem={({item, index}) => (
          <NotificationItem
            item={item}
            index={index}
            colors={colors}
            onAction={actions}
          />
        )}
        estimatedItemSize={85}
      />
    </View>
  );
}
