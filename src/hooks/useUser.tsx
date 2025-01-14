import {
  getAllRequestsService,
  getFriendWatchedMoviesService,
  getFriendWatchlistService,
  getFriendsService,
  getSearchedUsersService,
  sendAnswerRequestService,
  sendFriendshipRequestService,
  updateUserService,
} from '@src/service/internalServices';
import {setCurrentUser} from '@src/store/slices/authSlice';
import {
  addFriend,
  setFriendWatched,
  setFriendWatchlist,
} from '@src/store/slices/moviesSlice';
import {store} from '@src/store/store';

import useMovies from './useMovies';
import useFriendshipNotification from './useFriendshipNotification';

export default function useUser() {
  const {getMovie} = useMovies();
  const dispatch = store.dispatch;
  const {addSentFriendshipRequest} = useFriendshipNotification();

  const getAllRequests = async () => {
    try {
      const response = await getAllRequestsService();
      return response;
    } catch (error) {
      throw error;
    }
  };

  const searchUsers = async (search: string) => {
    try {
      const response = await getSearchedUsersService(search);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const sendFriendshipRequest = async (friendId: string) => {
    try {
      const response = await sendFriendshipRequestService(friendId);
      if (response.requestId) {
        addSentFriendshipRequest(response.requestId, {_id: friendId});
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const acceptFriendshipRequest = async (RequestId: string) => {
    try {
      const response = await sendAnswerRequestService(RequestId, 'accept');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const rejectFriendshipRequest = async (RequestId: string) => {
    try {
      const response = await sendAnswerRequestService(RequestId, 'reject');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const cancelFriendshipRequest = async (RequestId: string) => {
    try {
      const response = await sendAnswerRequestService(RequestId, 'cancelled');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const removeFriend = async (friendId: string) => {
    try {
      const response = await sendAnswerRequestService(friendId, 'removing');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const loadFriends = async () => {
    const state = store.getState();
    const friends = state.movies.friends;
    if (friends.length) return;

    try {
      const response = await getFriendsService();
      response.forEach(async (friend: any) => {
        const friendWatchlist = await getFriendWatchlistService(friend._id);
        const friendWatched = await getFriendWatchedMoviesService(friend._id);
        dispatch(
          addFriend({
            id: friend.friends._id,
            name: friend.friends.userName,
            friendshipId: friend._id,
            avatar: friend.friends.avatarId,
          }),
        );
        const watchlistMovies = await Promise.all(
          friendWatchlist.map(async (movie: any) => {
            const res = await getMovie(movie.movieId);
            return res;
          }),
        );

        const watchedMovies = await Promise.all(
          friendWatched.map(async (movie: any) => {
            const res = await getMovie(movie.movieId);
            return res;
          }),
        );
        dispatch(
          setFriendWatchlist({id: friend.friends._id, movies: watchlistMovies}),
        );
        dispatch(
          setFriendWatched({id: friend.friends._id, movies: watchedMovies}),
        );
      });
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (data: any) => {
    try {
      const response = await updateUserService(data);
      dispatch(setCurrentUser(response));
    } catch (error) {
      throw error;
    }
  };

  return {
    getAllRequests,
    searchUsers,
    sendFriendshipRequest,
    loadFriends,
    acceptFriendshipRequest,
    rejectFriendshipRequest,
    cancelFriendshipRequest,
    removeFriend,
    updateUser,
  };
}
