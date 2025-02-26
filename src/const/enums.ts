export enum appTheme {
  Light = 'light',
  Dark = 'dark',
}

export enum storageKeys {
  appTheme = 'appTheme',
  appLanguage = 'appLanguage',
  auth = 'auth',
  lastSeenMessage = 'lastSeenMessage',
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
  message = 'message',
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
