import {authInteceptor} from '@src/middleware/authInterceptor';
import {cacherInterceptor} from '@src/middleware/cacherInterceptor';
import {loggerInterceptor} from '@src/middleware/loggerInterceptor';
import {paramInterceptor} from '@src/middleware/paramInterceptor';
import {transformerInterceptor} from '@src/middleware/transformerInterceptor';
import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

cacherInterceptor(axiosInstance);
paramInterceptor(axiosInstance);
transformerInterceptor(axiosInstance);
loggerInterceptor(axiosInstance);
authInteceptor(axiosInstance);

export default axiosInstance;
