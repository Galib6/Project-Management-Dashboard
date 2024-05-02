import { IdType } from '@modules/base/interfaces';

export interface ILoginResponse {
  jwt: string;
  user: {
    id: IdType;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IUserRegister {
  name: string;
  identifier: string;
  password: string;
}

export interface IUserLogin {
  identifier: string;
  password: string;
}

export interface ITokenData {
  id: string;
  iat: number;
  exp: number;
}
