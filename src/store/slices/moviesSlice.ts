import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface moviesState {
  nowPlaying: IMovie[] | null;
  popular: IMovie[] | null;
  topRated: IMovie[] | null;
  upComing: IMovie[] | null;
  user: {
    watchlist: IMovie[];
    watched: IMovie[];
    list: {
      id: number;
      name: string;
      movies: IMovie[];
    }[];
  };
  friends: {
    avatar: string;
    friendshipId: string;
    id: string;
    name: string;
    watchlist: IMovie[];
    watched: IMovie[];
  }[];
}

const initialState: moviesState = {
  nowPlaying: null,
  popular: null,
  topRated: null,
  upComing: null,
  user: {
    watchlist: [],
    watched: [],
    list: [],
  },
  friends: [],
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setNowPlayingMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.nowPlaying = action.payload;
    },
    setPopularMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.popular = action.payload;
    },
    setTopRatedMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.topRated = action.payload;
    },
    setUpComingMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.upComing = action.payload;
    },
    setUserWatchlist: (state, action: PayloadAction<IMovie[]>) => {
      state.user.watchlist = action.payload;
    },
    addUserWatchlist: (state, action: PayloadAction<IMovie>) => {
      state.user.watchlist.push(action.payload);
    },
    removeUserWatchlist: (state, action: PayloadAction<number>) => {
      state.user.watchlist = state.user.watchlist.filter(movie => movie.id !== action.payload);
    },
    setUserWatched: (state, action: PayloadAction<IMovie[]>) => {
      state.user.watched = action.payload;
    },
    addUserWatched: (state, action: PayloadAction<IMovie>) => {
      state.user.watched.push(action.payload);
    },
    removeUserWatched: (state, action: PayloadAction<number>) => {
      state.user.watched = state.user.watched.filter(movie => movie.id !== action.payload);
    },
    setUserList: (state, action: PayloadAction<{ name: string; movies: IMovie[] }>) => {
      const id = Date.now();
      state.user.list.push({
        id,
        name: action.payload.name,
        movies: action.payload.movies,
      });
    },
    addUserList: (state, action: PayloadAction<{ name: string; movies: IMovie[] }>) => {
      const id = Date.now();
      state.user.list.push({
        id,
        name: action.payload.name,
        movies: action.payload.movies,
      });
    },
    removeUserList: (state, action: PayloadAction<number>) => {
      state.user.list = state.user.list.filter(list => list.id !== action.payload);
    },
    addMovieToList: (state, action: PayloadAction<{ listId: number; movie: IMovie }>) => {
      const list = state.user.list.find(l => l.id === action.payload.listId);
      if (list) {
        list.movies.push(action.payload.movie);
      }
    },
    removeMovieFromList: (state, action: PayloadAction<{ listId: number; movieId: number }>) => {
      const list = state.user.list.find(l => l.id === action.payload.listId);
      if (list) {
        list.movies = list.movies.filter(movie => movie.id !== action.payload.movieId);
      }
    },
    addFriend: (
      state,
      action: PayloadAction<{ id: string; name: string; friendshipId: string; avatar: string }>
    ) => {
      state.friends.push({
        id: action.payload.id,
        name: action.payload.name,
        watchlist: [],
        watched: [],
        friendshipId: action.payload.friendshipId,
        avatar: action.payload.avatar,
      });
    },
    setFriendWatchlist: (state, action: PayloadAction<{ id: string; movies: IMovie[] }>) => {
      const friend = state.friends.find(f => f.id === action.payload.id);
      if (friend) {
        friend.watchlist = action.payload.movies;
      }
    },
    addFriendWatchlist: (state, action: PayloadAction<{ id: string; movie: IMovie }>) => {
      const friend = state.friends.find(f => f.id === action.payload.id);
      if (friend) {
        friend.watchlist.push(action.payload.movie);
      }
    },
    removeFriendWatchlist: (state, action: PayloadAction<{ id: string; movieId: number }>) => {
      const friend = state.friends.find(f => f.id === action.payload.id);
      if (friend) {
        friend.watchlist = friend.watchlist.filter(movie => movie.id !== action.payload.movieId);
      }
    },
    setFriendWatched: (state, action: PayloadAction<{ id: string; movies: IMovie[] }>) => {
      const friend = state.friends.find(f => f.id === action.payload.id);
      if (friend) {
        friend.watched = action.payload.movies;
      }
    },
    addFriendWatched: (state, action: PayloadAction<{ id: string; movie: IMovie }>) => {
      const friend = state.friends.find(f => f.id === action.payload.id);
      if (friend) {
        friend.watched.push(action.payload.movie);
      }
    },
    removeFriendWatched: (state, action: PayloadAction<{ id: string; movieId: number }>) => {
      const friend = state.friends.find(f => f.id === action.payload.id);
      if (friend) {
        friend.watched = friend.watched.filter(movie => movie.id !== action.payload.movieId);
      }
    },
  },
});

export const {
  setNowPlayingMovies,
  setPopularMovies,
  setTopRatedMovies,
  setUpComingMovies,
  setUserWatchlist,
  addUserWatchlist,
  removeUserWatchlist,
  setUserWatched,
  addUserWatched,
  removeUserWatched,
  setFriendWatchlist,
  addFriendWatchlist,
  removeFriendWatchlist,
  setFriendWatched,
  addFriendWatched,
  removeFriendWatched,
  setUserList,
  addUserList,
  removeUserList,
  addMovieToList,
  removeMovieFromList,
  addFriend,
} = moviesSlice.actions;
export default moviesSlice.reducer;
