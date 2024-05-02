import { coreAxiosInstance } from '@lib/config';
import { ErrorHandler } from '@lib/utils';
import {
  IForgotPassword,
  ILoginResponse,
  IResetPassword,
  IResetPasswordCreate,
  IUserLogin,
  IUserRegister,
} from './interfaces';

const END_POINT: string = '/auth';

export const AuthService = {
  NAME: END_POINT,
  async login(payload: IUserLogin): Promise<ILoginResponse> {
    try {
      const res = await coreAxiosInstance.post(`${END_POINT}/local`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async register(payload: IUserRegister): Promise<ILoginResponse> {
    try {
      const res = await coreAxiosInstance.post(`${END_POINT}/local/register`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async forgotPassword(payload: { email: string }): Promise<IForgotPassword> {
    try {
      const res = await coreAxiosInstance.post(`${END_POINT}/forgot-password`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async ResetPassword(payload: IResetPasswordCreate): Promise<IResetPassword> {
    try {
      const res = await coreAxiosInstance.post(`${END_POINT}/reset-password`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
};
