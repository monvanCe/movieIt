import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface MovieListState {
  selectedList: 'watchlist' | 'watched';
  selectedFriend: string | null;
  movies: IMovie[];
}

const initialState: MovieListState = {
  selectedList: 'watchlist',
  selectedFriend: null,
  movies: [],
};

export const movieListSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {
    setSelectedList: (
      state,
      action: PayloadAction<'watchlist' | 'watched'>,
    ) => {
      state.selectedList = action.payload;
    },
    setSelectedFriend: (state, action: PayloadAction<string | null>) => {
      state.selectedFriend = action.payload;
    },
    setMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.movies = action.payload;
    },
  },
});

export const {setSelectedList, setSelectedFriend, setMovies} =
  movieListSlice.actions;
export default movieListSlice.reducer;
