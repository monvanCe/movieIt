export enum appTheme {
  Light = 'light',
  Dark = 'dark',
}

export enum storageKeys {
  appTheme = 'appTheme',
  appLanguage = 'appLanguage',
  auth = 'auth',
}

export enum movieTypes {
  nowPlaying = 'nowPlaying',
  popular = 'popular',
  topRated = 'topRated',
  upComing = 'upComing',
}

export enum requestTypes {
  send,
  accept,
  reject,
  cancelled,
  removing,
}

export enum notificationTypes {
  friendshipMovies = 'friendshipMovies',
  friendship = 'friendship',
}

export enum notificationActionTypes {
  accept = 'accept',
  reject = 'reject',
  cancelled = 'cancelled',
}

export enum movieActionTypes {
  towatched = 'towatched',
  watched = 'watched',
}
