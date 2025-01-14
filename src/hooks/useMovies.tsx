import {fetchMovieDetail} from '@src/service/externalServices';
import {
  addOrUpdateMovieService,
  getUserWatchedMoviesService,
  getUserWatchlistService,
  sendFriendAddMovieRequestService,
  sendFriendAnswerMovieRequestService,
} from '@src/service/internalServices';
import {
  addFriendWatched,
  addFriendWatchlist,
  addUserWatched,
  addUserWatchlist,
  removeUserWatched,
  removeUserWatchlist,
} from '@src/store/slices/moviesSlice';
import {store} from '@src/store/store';

const dispatch = store.dispatch;

export default function useMovies() {
  const loadUserWatchList = async () => {
    const state = store.getState();
    const userWatchlist = state.movies.user.watchlist;
    if (userWatchlist.length) return;
    try {
      const response = await getUserWatchlistService();
      response.forEach(async (movie: any) => {
        const res = await fetchMovieDetail(movie.movieId);
        dispatch(addUserWatchlist(res));
      });
    } catch (error) {
      throw error;
    }
  };

  const loadUserWatched = async () => {
    const state = store.getState();
    const userWatched = state.movies.user.watched;
    if (userWatched.length) return;
    try {
      const response = await getUserWatchedMoviesService();
      response.forEach(async (movie: any) => {
        const res = await fetchMovieDetail(movie.movieId);
        dispatch(addUserWatched(res));
      });
    } catch (error) {
      throw error;
    }
  };

  const addMovieToWatchList = async (movie: IMovie) => {
    try {
      const response = await addOrUpdateMovieService({
        movieId: movie.id.toString(),
        type: 'towatched',
      });
      dispatch(removeUserWatched(movie.id));
      dispatch(addUserWatchlist(movie));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const addMovieToWatched = async (movie: IMovie) => {
    try {
      const response = await addOrUpdateMovieService({
        movieId: movie.id.toString(),
        type: 'watched',
      });
      dispatch(removeUserWatchlist(movie.id));
      dispatch(addUserWatched(movie));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const addMovieToFriendList = async (
    friendShipId: string,
    movieId: number,
    type: 'towatched' | 'watched',
  ) => {
    try {
      const response = await sendFriendAddMovieRequestService(
        friendShipId,
        movieId,
        type,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const answerFriendMovieRequest = async (
    RequestId: string,
    status: 'accept' | 'reject' | 'cancelled',
    movie: IMovie,
    type: 'towatched' | 'watched',
  ) => {
    try {
      const response = await sendFriendAnswerMovieRequestService({
        RequestId,
        status,
      });

      if (status === 'accept' && type === 'towatched') {
        dispatch(addFriendWatchlist({id: RequestId, movie: movie}));
      }

      if (status === 'accept' && type === 'watched') {
        dispatch(addFriendWatched({id: RequestId, movie: movie}));
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  const getMovie = async (movieId: number) => {
    try {
      const response = await fetchMovieDetail(movieId);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    loadUserWatchList,
    loadUserWatched,
    addMovieToWatchList,
    addMovieToWatched,
    addMovieToFriendList,
    getMovie,
    answerFriendMovieRequest,
  };
}
