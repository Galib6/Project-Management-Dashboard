import { coreAxiosInstance } from '@lib/config';
import { ErrorHandler } from '@lib/utils';
import { ILoginResponse, IUserLogin, IUserRegister } from './interfaces';

const END_POINT: string = '/auth/local';

export const AuthService = {
  NAME: END_POINT,
  async login(payload: IUserLogin): Promise<ILoginResponse> {
    try {
      const res = await coreAxiosInstance.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async register(payload: IUserRegister): Promise<ILoginResponse> {
    try {
      const res = await coreAxiosInstance.post(`${END_POINT}/register`, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
};
