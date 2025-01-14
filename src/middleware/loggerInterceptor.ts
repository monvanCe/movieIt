import * as AxiosLogger from 'axios-logger';

export const loggerInterceptor = (axios: any) => {
  axios.interceptors.request.use(AxiosLogger.requestLogger);
  axios.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);
};
