import {movieDataTransformer} from '@src/utils/transformers';

export interface AxiosRequestConfig {
  url?: string;
  method?: string;
  headers?: any;
  params?: any;
  data?: any;
}

export interface AxiosResponse {
  config: AxiosRequestConfig;
  headers: any;
  data: any;
}

export const transformerInterceptor = (axiosInstance: any) => {
  axiosInstance.interceptors.response.use((response: AxiosResponse) => {
    let newResponse = response;

    if (
      response?.data?.results &&
      response?.data?.results[0]?.['poster_path']
    ) {
      newResponse.data.results = response.data.results.map((movie: IMovie) =>
        movieDataTransformer(movie),
      );
    }

    if (response?.data?.['poster_path']) {
      newResponse.data = movieDataTransformer(response.data);
    }

    return newResponse;
  });
};
