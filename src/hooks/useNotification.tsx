import {
  addNotification,
  setNotification,
} from '@src/store/slices/notificationSlice';
import {useAppDispatch, useAppSelector} from '@src/store/store';
import {useEffect} from 'react';

import useMovies from './useMovies';
import useUser from './useUser';
import {notificationTypes} from '@src/const/enums';

const useNotification = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.currentUser?._id);
  const notifications = useAppSelector(
    state => state.notifications.notifications,
  );

  const {
    getAllRequests,
    acceptFriendshipRequest,
    rejectFriendshipRequest,
    cancelFriendshipRequest,
  } = useUser();

  const {getMovie, answerFriendMovieRequest} = useMovies();

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

  const updateByNotification = async (remoteMessage: any) => {
    const notificationData = JSON.parse(remoteMessage.data.notificationData);
    console.log('notificationData', notificationData);

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
    acceptFriendshipRequest,
    rejectFriendshipRequest,
    cancelFriendshipRequest,
    getMovie,
    answerFriendMovieRequest,
    loadNotifications,
    userId,
    updateByNotification,
  };
};

export default useNotification;
