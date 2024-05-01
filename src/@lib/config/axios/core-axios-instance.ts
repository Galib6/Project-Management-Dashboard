import { storage } from '@lib/utils';
import { IBaseResponse } from '@modules/base/interfaces';
import { notification } from 'antd/lib';

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const headers = {
  Authorization: `Bearer ${storage?.getToken()}`,
};
export const coreAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
  timeout: 60000,
  headers,
});
coreAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['Authorization'] = `Bearer ${storage?.getToken()}`;
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
    } else if (error.response?.data?.success === false) {
      error.response?.data?.errorMessages?.map((x: string) => {
        notification.error({
          message: x,
          duration: 1,
        });
      });
      return error?.response;
    }
    return error;
  },
);
