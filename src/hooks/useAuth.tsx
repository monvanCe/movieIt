import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {loginService} from '@src/service/internalServices';
import {setCurrentUser} from '@src/store/slices/authSlice';
import {useAppDispatch} from '@src/store/store';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const login = async () => {
    const userUniqueKey = await DeviceInfo.getUniqueId();
    const platform = Platform.OS === 'ios' ? 'IOS' : 'ANDROID';
    const appVersion = Number(process.env.EXPO_PUBLIC_APP_VERSION) || 1;

    //TODO: get notification token
    const notificationId = 'ss';

    try {
      // @ts-ignore
      const response = await loginService(
        userUniqueKey,
        platform,
        notificationId,
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
