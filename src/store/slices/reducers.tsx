import appConfigSlice from './appConfigSlice';
import authSlice from './authSlice';
import moviesSlice from './moviesSlice';
import notificationSlice from './notificationSlice';

export default {
  appConfig: appConfigSlice,
  movies: moviesSlice,
  auth: authSlice,
  notifications: notificationSlice,
};
