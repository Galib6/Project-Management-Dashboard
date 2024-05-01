import { storage } from '@lib/utils';
import { IBaseResponse } from '@modules/base/interfaces';
import { notification } from 'antd/lib';

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ENV } from '../ENV';

const headers = {
  Authorization: `Bearer ${ENV.NEXT_PUBLIC_API_TOKEN}`,
};
export const coreAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
  timeout: 60000,
  headers,
});
coreAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['Authorization'] = `Bearer ${ENV.NEXT_PUBLIC_API_TOKEN}`;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
coreAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<IBaseResponse>) => {
    if (error?.response?.status === 401) {
      storage.clear();
    } else if (!!error.response?.data?.data === false) {
      notification.error({
        message: `${error.response?.data?.error.message} with status code ${error.response?.data?.error.status}`,
        duration: 1,
      });

      return error?.response;
    }
    return error;
  },
);
