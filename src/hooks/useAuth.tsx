import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {loginService} from '@src/service/internalServices';
import {setCurrentUser} from '@src/store/slices/authSlice';
import {useAppDispatch} from '@src/store/store';
import {initializeNotifications} from '@src/utils/notification';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const login = async () => {
    const userUniqueKey = await DeviceInfo.getUniqueId();
    const platform = Platform.OS === 'ios' ? 'IOS' : 'ANDROID';
    const appVersion = Number(process.env.EXPO_PUBLIC_APP_VERSION) || 1;

    const notificationId = await initializeNotifications();

    try {
      const response = await loginService(
        userUniqueKey,
        platform,
        notificationId ?? undefined,
        appVersion,
      );
      const user = {...response.user, token: response.token};
      dispatch(setCurrentUser(user));
    } catch (error) {
      throw error;
    }
  };

  return {login};
};
