import { IBaseResponse, IdType } from '@modules/base/interfaces';
export interface ISession {
  id: string;
  phoneNumber: string;
  name: string;
  permissions: string;
  iat: number;
  exp: number;
}

export interface IFlogin {
  email: string;
  password: string;
}

export interface IRegister {
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'Customer';
  password: any;
  confirmPassword?: any;
}

export interface IChangePass {
  newPassword: any;
  oldPassword: any;
}

export interface IResetPassReq {
  email: string;
}

export interface IResetPassVerify {
  email: string;
  hash: string;
  otp: number;
  newPassword: any;
}

export interface ILoginResponse extends IBaseResponse {
  data: {
    token: string;
    refreshToken: string;
    user: {
      id: IdType;
    };
  };
}

export interface IRegisterResponse extends IBaseResponse {
  data: null;
}

export interface ISSOptions {
  redirectUrl: string;
  'x-api-key': string;
  'x-api-secret': string;
}

export interface ISSOResponse extends IBaseResponse {
  data: {
    webLoginUrl: string;
  };
}
