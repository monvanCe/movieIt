import * as externalServices from '@src/service/externalServices';
import {
  setNowPlayingMovies,
  setPopularMovies,
  setTopRatedMovies,
  setUpComingMovies,
} from '@src/store/slices/moviesSlice';

import {store} from '@src/store/store';

export const loadBannerMovies = async () => {
  const dispatch = store.dispatch;

  const nowPlaying = await externalServices.fetchNowPlayingMovies();
  const popular = await externalServices.fetchPopularMovies();
  const topRated = await externalServices.fetchTopRatedMovies();
  const upComing = await externalServices.fetchUpComingMovies();

  dispatch(setNowPlayingMovies(nowPlaying));
  dispatch(setPopularMovies(popular));
  dispatch(setTopRatedMovies(topRated));
  dispatch(setUpComingMovies(upComing));
};
