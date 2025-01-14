export const lowResImage = (path: string) =>
  path
    ? `https://image.tmdb.org/t/p/w200${path}`
    : 'https://storage.googleapis.com/movielt/assets/empty-movie.png';

export const highResImage = (path: string) =>
  path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : 'https://storage.googleapis.com/movielt/assets/empty-movie.png';

export const originalImage = (path: string) =>
  path
    ? `https://image.tmdb.org/t/p/original${path}`
    : 'https://storage.googleapis.com/movielt/assets/empty-movie.png';

export default {
  lowResImage,
  highResImage,
  originalImage,
};
