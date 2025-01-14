import * as endPoints from '@src/const/externalEndpoints';

import {getRequest} from './api';

export const fetchPopularMovies = async () => {
  const popular: any = await getRequest('external', endPoints.popularApi);
  return popular.results;
};

export const fetchTopRatedMovies = async () => {
  const topRated: any = await getRequest('external', endPoints.topRatedApi);
  return topRated.results;
};

export const fetchUpComingMovies = async () => {
  const upComing: any = await getRequest('external', endPoints.upComingApi);
  return upComing.results;
};

export const fetchNowPlayingMovies = async () => {
  const nowPlaying: any = await getRequest('external', endPoints.nowPlayingApi);
  return nowPlaying.results;
};

export const fetchMovieDetail = async (movieId: number) => {
  const movieDetail: any = await getRequest(
    'external',
    endPoints.movieApi(movieId),
  );
  return movieDetail;
};

export const searchMovies = async (term: string) => {
  const searchResult: any = await getRequest(
    'external',
    endPoints.searchMoviesApi(term),
  );
  return searchResult.results;
};

export const fetchGenres = async () => {
  const genres: any = await getRequest('external', endPoints.genresApi);
  return genres.genres;
};

export const fetchGenreMovies = async (genreId: number) => {
  const genreMovies: any = await getRequest(
    'external',
    endPoints.genreMoviesApi(genreId),
  );
  return genreMovies.results;
};

export const fetchSimilarMovies = async (movieId: number) => {
  const similarMovies: any = await getRequest(
    'external',
    endPoints.similarMoviesApi(movieId),
  );
  return similarMovies.results;
};

export const fetchCredits = async (movieId: number) => {
  const credits: any = await getRequest(
    'external',
    endPoints.creditsApi(movieId),
  );
  return credits.cast;
};

export const fetchPersonDetail = async (personId: number) => {
  const personDetail: any = await getRequest(
    'external',
    endPoints.personApi(personId),
  );
  return personDetail;
};

export const fetchPersonMovies = async (personId: number) => {
  const personMovies: any = await getRequest(
    'external',
    endPoints.personMoviesApi(personId),
  );
  return personMovies.cast;
};

export const fetchMovieReviews = async (movieId: number) => {
  const reviews: any = await getRequest(
    'external',
    endPoints.movieReviewsApi(movieId),
  );
  return reviews.results;
};

export const fetchMovieProviders = async (movieId: number) => {
  const providers: any = await getRequest(
    'external',
    endPoints.movieProvidersApi(movieId),
  );
  return providers.results;
};
