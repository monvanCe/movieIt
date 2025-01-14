import {setNotification} from '@src/store/slices/notificationSlice';
import {useAppDispatch, useAppSelector} from '@src/store/store';

import useMovies from './useMovies';
import useUser from './useUser';

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
  };
};

export default useNotification;
