import {useAppSelector, useAppDispatch} from '@src/store/store';
import {
  setWatchlist,
  setWatched,
  setOwnerName,
} from '@src/store/slices/movieListSlice';

export default function useMovieList() {
  const dispatch = useAppDispatch();
  const selectedFriend = useAppSelector(
    state => state.movieList.selectedFriend,
  );
  const friends = useAppSelector(state => state.movies.friends);
  const userWatchlist = useAppSelector(state => state.movies.user.watchlist);
  const userWatched = useAppSelector(state => state.movies.user.watched);

  const loadMovieList = () => {
    if (selectedFriend) {
      const friend = friends.find(f => f.id === selectedFriend);
      if (friend) {
        dispatch(setOwnerName(friend.name));
        dispatch(setWatchlist(friend.watchlist));
        dispatch(setWatched(friend.watched));
      }
    } else {
      dispatch(setOwnerName('me'));
      dispatch(setWatchlist(userWatchlist));
      dispatch(setWatched(userWatched));
    }
  };

  return {loadMovieList};
}
