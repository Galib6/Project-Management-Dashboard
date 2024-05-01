import { coreAxiosInstance } from '@lib/config';
import { toolbox } from '@lib/utils';
import axios from 'axios';
import {
  IChangePass,
  IFlogin,
  ILoginResponse,
  IRegister,
  IRegisterResponse,
  IResetPassReq,
  IResetPassVerify,
  ISSOResponse,
  ISSOptions,
} from './interfaces';
const END_POINT = '/auth';

export const AuthService = {
  async login(payload: IFlogin): Promise<ILoginResponse> {
    try {
      const data = await coreAxiosInstance.post(`${END_POINT}/login`, payload);
      return data?.data;
    } catch (error) {}
  },
  async register(payload: IRegister): Promise<IRegisterResponse> {
    try {
      const data = await coreAxiosInstance.post(`${END_POINT}/register`, payload);
      return data?.data;
    } catch (error) {}
  },
  async validate(payload: { token: string }): Promise<ILoginResponse> {
    try {
      const data = await coreAxiosInstance.post(`${END_POINT}/sso/validate`, payload);
      return data?.data;
    } catch (error) {}
  },
  async changePass(payload: IChangePass) {
    try {
      const data = await coreAxiosInstance.post(`${END_POINT}/change-password`, payload);
      return data?.data;
    } catch (error) {}
  },
  async resetPassReq(payload: IResetPassReq) {
    try {
      const data = await coreAxiosInstance.post(`${END_POINT}/reset-password-request`, payload);
      return data?.data;
    } catch (error) {}
  },
  async resetPassVerify(payload: IResetPassVerify) {
    try {
      const data = await coreAxiosInstance.post(`${END_POINT}/reset-password-verify`, payload);
      return data?.data;
    } catch (error) {}
  },
};

export const SSOService = {
  async authReq(options: ISSOptions): Promise<ISSOResponse> {
    try {
      const SSOAxiosInstance = axios.create({
        baseURL: 'https://sign-one-api-staging.uniclients.dev/api/v1',
        timeout: 60000,
        headers: {
          'x-api-key': options?.['x-api-key'],
          'x-api-secret': options?.['x-api-secret'],
        },
      });
      const data = await SSOAxiosInstance.get(
        `/auth/auth-request?${toolbox.queryNormalizer({ redirectUrl: options?.redirectUrl })}`,
      );
      return data?.data;
    } catch (error) {}
  },
};
