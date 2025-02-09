interface ITheme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  primaryText: string;
  secondaryText: string;
  tertiaryText: string;
  error: string;
  warning: string;
  success: string;
  info: string;
  border: string;
  divider: string;
  iconPrimary: string;
  iconSecondary: string;
}

interface IRootStackParamList {
  MovieList: {
    title?: string;
  };
  MovieDetail: {
    movieId: number;
  };
  Home: undefined;
  Profile: undefined;
  Search: undefined;
  Notification: undefined;
  [key: string]: undefined | object;
}

interface IUser {
  [key: string]: any;
  _id: string;
  userId: string;
  isPremium: boolean;
  isAdmin: boolean;
  rollbackId: string;
  avatarId: number;
  language: string;
  userName: string;
  createdAt: string;
  token: string;
  bio: string;
}

interface IMovie {
  id: number;
  isAdult: boolean;
  backdropPath: string;
  genreIds: number[];
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

interface IChildren {
  children: React.ReactNode;
}

interface IOnPress {
  onPress: () => void;
}

interface IImages {
  images: string[];
  size?: number;
}

interface IText {
  text: string;
}

interface ITexts {
  texts: string[];
}

interface IOnPressWithParam {
  onPress: (param: any) => void;
}

interface IMovies {
  movies: IMovie[];
}

interface IIcon {
  icon: string;
}

interface IVisible {
  visible: boolean;
}

interface IToken {
  token: string;
}

interface INotification {
  _id: string;
  type: notificationTypes;
  from: IUser;
  to: IUser;
  status: string;
  message: string;
  createdAt: string;
  movie: any;
  updatedAt: string;
  image: string;
  subTitle: string;
  movieType?: string;
}
