import {
  addNotification,
  setNotification,
  updateNotificationStatus,
} from '@src/store/slices/notificationSlice';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {useEffect} from 'react';
import {
  addFriend,
  setFriends,
  addFriendWatchlist,
  addFriendWatched,
} from '@src/store/slices/moviesSlice';

import useMovies from './useMovies';
import useUser from './useUser';
import {
  notificationTypes,
  notificationActionTypes,
  movieActionTypes,
} from '@src/const/enums';

const useNotification = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.currentUser?._id);
  const notifications = useAppSelector(
    state => state.notifications.notifications,
  );
  const friends = useAppSelector(state => state.movies.friends);

  const {
    getAllRequests,
    acceptFriendshipRequest,
    rejectFriendshipRequest,
    cancelFriendshipRequest,
  } = useUser();

  const {getMovie, answerFriendMovieRequest} = useMovies();

  const handleFriendshipAction = async (
    id: string,
    action: notificationActionTypes,
  ) => {
    dispatch(updateNotificationStatus({id, status: action}));
    if (action === notificationActionTypes.accept) {
      const response = await acceptFriendshipRequest(id);
      if (response) {
        const notification = notifications.find(n => n._id === id);
        if (notification) {
          const otherUser =
            notification.from._id === userId
              ? notification.to
              : notification.from;
          dispatch(
            addFriend({
              id: otherUser._id,
              name: otherUser.userName,
              friendshipId: response.friendshipId,
              avatar: otherUser.avatarId.toString(),
            }),
          );
        }
      }
    } else if (action === notificationActionTypes.reject) {
      await rejectFriendshipRequest(id);
    } else if (action === notificationActionTypes.cancelled) {
      await cancelFriendshipRequest(id);
    }
  };

  const handleMovieAction = async (
    id: string,
    action: notificationActionTypes,
    movieId: any,
    movieType: string,
  ) => {
    dispatch(updateNotificationStatus({id, status: action}));
    if (action === notificationActionTypes.accept) {
      const notification = notifications.find(n => n._id === id);
      if (notification) {
        const otherUserId =
          notification.from._id === userId
            ? notification.to._id
            : notification.from._id;
        if (movieType === movieActionTypes.towatched) {
          const movie = await getMovie(movieId);
          dispatch(addFriendWatchlist({id: otherUserId, movie}));
        } else if (movieType === movieActionTypes.watched) {
          const movie = await getMovie(movieId);
          dispatch(addFriendWatched({id: otherUserId, movie}));
        }
      }
    }
    await answerFriendMovieRequest(
      id,
      action,
      movieId,
      movieType as movieActionTypes,
    );
  };

  useEffect(() => {
    const uniqueNotifications = notifications.reduce((acc, notification) => {
      const existing = acc.find(n => n._id === notification._id);
      if (
        !existing ||
        new Date(notification.updatedAt) > new Date(existing.updatedAt)
      ) {
        const filtered = acc.filter(n => n._id !== notification._id);
        return [...filtered, notification];
      }
      return acc;
    }, [] as INotification[]);

    const sortedNotifications = uniqueNotifications.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    if (sortedNotifications.length !== notifications.length) {
      dispatch(setNotification(sortedNotifications));
    }
  }, [notifications]);

  useEffect(() => {
    const uniqueFriends = friends.reduce((acc, friend) => {
      const existing = acc.find(f => f.id === friend.id);
      if (!existing) {
        return [...acc, friend];
      }
      return acc;
    }, [] as typeof friends);

    if (uniqueFriends.length !== friends.length) {
      dispatch(setFriends(uniqueFriends));
    }
  }, [friends]);

  const updateByNotification = async (remoteMessage: any) => {
    const notificationData = JSON.parse(remoteMessage.data.notificationData);

    let newNotification: INotification = {
      ...notificationData,
      message: remoteMessage.notification?.body || 'New notification',
    };

    if (notificationData.type === notificationTypes.friendshipMovies) {
      const movie = await getMovie(notificationData.movie);
      newNotification = {
        ...newNotification,
        image: movie.posterPath,
        subTitle: movie.title,
      };

      if (notificationData.status === notificationActionTypes.accept) {
        const receiverId = notificationData.from._id;
        if (notificationData.movieType === movieActionTypes.towatched) {
          dispatch(addFriendWatchlist({id: receiverId, movie}));
        } else if (notificationData.movieType === movieActionTypes.watched) {
          dispatch(addFriendWatched({id: receiverId, movie}));
        }
      }
    } else if (notificationData.type === notificationTypes.friendship) {
      const image =
        notificationData.from._id === userId
          ? notificationData.to.avatarId
          : notificationData.from.avatarId;

      newNotification = {
        ...newNotification,
        image,
        subTitle: 'Friendship request',
      };

      if (notificationData.status === notificationActionTypes.accept) {
        const otherUser =
          notificationData.from._id === userId
            ? notificationData.to
            : notificationData.from;
        dispatch(
          addFriend({
            id: otherUser._id,
            name: otherUser.userName,
            friendshipId: notificationData._id,
            avatar: otherUser.avatarId,
          }),
        );
      }
    }

    dispatch(addNotification(newNotification));
  };

  const loadNotifications = () => {
    getAllRequests().then(requests => {
      const newRequests = requests.map(async (request: any) => {
        if (request.type === 'friendshipMovies') {
          const movie = await getMovie(request.movie);
          return {...request, image: movie.posterPath, subTitle: movie.title};
        }

        if (request.type === 'friendship') {
          const image =
            request.from._id === userId
              ? request.to.avatarId
              : request.from.avatarId;

          return {...request, image, subTitle: 'Friendship request'};
        }

        return request;
      });

      Promise.all(newRequests).then(notifications => {
        dispatch(setNotification(notifications));
      });
    });
  };

  return {
    notifications,
    getAllRequests,
    acceptFriendshipRequest: (id: string) =>
      handleFriendshipAction(id, notificationActionTypes.accept),
    rejectFriendshipRequest: (id: string) =>
      handleFriendshipAction(id, notificationActionTypes.reject),
    cancelFriendshipRequest: (id: string) =>
      handleFriendshipAction(id, notificationActionTypes.cancelled),
    getMovie,
    answerFriendMovieRequest: (
      id: string,
      action: notificationActionTypes,
      movie: any,
      movieType: string,
    ) => handleMovieAction(id, action, movie, movieType),
    loadNotifications,
    userId,
    updateByNotification,
  };
};

export default useNotification;
