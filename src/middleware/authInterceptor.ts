import {store} from '@src/store/store';

export const authInteceptor = (axios: any) => {
  axios.interceptors.request.use((config: any) => {
    const state = store.getState();
    const isInternalUrl = config.url.includes('themoviedb' as string);
    const token = !isInternalUrl
      ? state.auth.currentUser?.token
      : state.appConfig.externalApiKey;

    if (!isInternalUrl) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.params = {
        ...config.params,
        api_key: token,
      };
    }

    return config;
  });
};
