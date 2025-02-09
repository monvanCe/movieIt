import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface MovieListState {
  selectedList: 'watchlist' | 'watched';
  selectedFriend: string | null;
  ownerName: string;
  watchlist: IMovie[];
  watched: IMovie[];
}

const initialState: MovieListState = {
  selectedList: 'watchlist',
  selectedFriend: null,
  ownerName: 'me',
  watchlist: [],
  watched: [],
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
    setOwnerName: (state, action: PayloadAction<string>) => {
      state.ownerName = action.payload;
    },
    setWatchlist: (state, action: PayloadAction<IMovie[]>) => {
      state.watchlist = action.payload;
    },
    setWatched: (state, action: PayloadAction<IMovie[]>) => {
      state.watched = action.payload;
    },
  },
});

export const {
  setSelectedList,
  setSelectedFriend,
  setOwnerName,
  setWatchlist,
  setWatched,
} = movieListSlice.actions;
export default movieListSlice.reducer;
