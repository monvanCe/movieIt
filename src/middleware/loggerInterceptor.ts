import {AxiosRequestConfig} from 'axios';
import {AxiosResponse} from 'axios';
import * as AxiosLogger from 'axios-logger';

export const loggerInterceptor = (axios: any) => {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    console.log(
      '[Request]:',
      `${config.method!.toUpperCase()} ${config.url}`,
      config.headers || '',
      config.params || '',
      config.data || '',
    );
    return config;
  });
  axios.interceptors.response.use((response: AxiosResponse) => {
    console.log(
      '[Response]:',
      `${response.config.url}`,
      response.status,
      response.data,
    );
    return response;
  });
};
