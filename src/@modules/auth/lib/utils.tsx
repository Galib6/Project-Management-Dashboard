import { storage } from '@lib/utils';
import { jwtDecode } from 'jwt-decode';
import { ITokenData } from './interfaces';

export function isJwtExpired(token: string): boolean {
  const tokenData: ITokenData = token ? jwtDecode(token) : null;
  if (!tokenData?.exp) return true;

  const expDate: Date = new Date(tokenData?.exp * 1000);
  if (expDate > new Date()) return false;

  return true;
}

// Utility function to check if the user is authenticated
export const checkAuth = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const token = storage?.getToken();
  const isExpired = isJwtExpired(token);

  if (isExpired) return false;

  const tokenData: ITokenData = token ? jwtDecode(token) : null;

  // Replace this logic with your actual authentication check
  const isAuthenticated: boolean = tokenData?.id ? true : false;
  return isAuthenticated;
};
