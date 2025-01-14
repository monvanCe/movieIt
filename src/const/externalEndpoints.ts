export const nowPlayingApi = `/movie/now_playing`;
export const popularApi = `/movie/popular`;
export const topRatedApi = `/movie/top_rated`;
export const upComingApi = `/movie/upcoming`;

export const searchMoviesApi = (term: string) => `/search/movie?query=${term}`;

export const movieApi = (id: number) => `/movie/${id}`;

export const genresApi = `/genre/movie/list`;

export const genreMoviesApi = (genreId: number) => `/discover/movie?with_genres=${genreId}`;

export const similarMoviesApi = (id: number) => `/movie/${id}/similar`;

export const creditsApi = (id: number) => `/movie/${id}/credits`;

export const personPopularApi = `/person/popular`;

export const personApi = (id: number) => `/person/${id}`;

export const personMoviesApi = (id: number) => `/person/${id}/movie_credits`;

export const movieReviewsApi = (id: number) => `/movie/${id}/reviews`;

export const movieProvidersApi = (id: number) => `/movie/${id}/watch/providers`;
