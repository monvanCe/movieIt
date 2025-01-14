import storage from '@src/utils/storage';

const whitelistPatterns = [/^\/3\/movie\/\d+$/, /^\/3\/person\/\d+$/];

export const cacherInterceptor = (axiosInstance: any) => {
  axiosInstance.interceptors.request.use(async (config: any) => {
    const urlPath = new URL(config.url).pathname;

    if (whitelistPatterns.some(pattern => pattern.test(urlPath))) {
      const cacheKey = `${config.url}-${JSON.stringify(config.params)}`;

      const cachedResponse = await storage.getItem(cacheKey);
      if (cachedResponse) {
        config.adapter = async () => {
          return {
            data: JSON.parse(cachedResponse),
            status: 200,
            statusText: 'OK',
            headers: {},
            config,
            request: {},
          };
        };
      }
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    async (response: any) => {
      const urlPath = new URL(response.config.url).pathname;
      if (
        whitelistPatterns.some(pattern => pattern.test(urlPath)) &&
        response.status === 200
      ) {
        const cacheKey = `${response.config.url}-${JSON.stringify(
          response.config.params,
        )}`;
        await storage.setItem(cacheKey, JSON.stringify(response.data));
      }
      return response;
    },
    (error: unknown) => {
      return Promise.reject(error);
    },
  );
};
