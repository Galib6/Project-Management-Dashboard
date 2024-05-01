import { MutationConfig } from '@lib/config';
import { storage } from '@lib/utils';
import { useMutation } from '@tanstack/react-query';
import { AuthService, SSOService } from './service';

//---------------- useLogin hook ------------------------------------
type IUseLogin = {
  config?: MutationConfig<typeof AuthService.login>;
};
export const useLogin = ({ config }: IUseLogin = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.login,
    onSettled: (res) => {
      if (res?.success) {
        storage.setToken(res?.data?.token);
      }
    },
  });
};

//---------------- useRegister hook ------------------------------------
type IUseRegister = {
  config?: MutationConfig<typeof AuthService.register>;
};
export const useRegister = ({ config }: IUseRegister = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.register,
    onSettled: (res) => {
      if (res?.success) {
        //   storage.setToken(res?.data?.token);
      } else {
      }
    },
  });
};

//---------------- useValidate hook ------------------------------------
type IUseValidate = {
  config?: MutationConfig<typeof AuthService.validate>;
};
export const useValidate = ({ config }: IUseValidate = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.validate,
  });
};

export const useLogout = () => {
  return storage.removeToken();
};

//---------------- useChangePasswordHook ------------------------------------
type IUseChangePassword = {
  config?: MutationConfig<typeof AuthService.changePass>;
};
export const useChangePassword = ({ config }: IUseChangePassword = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.changePass,
    onSettled: (res) => {
      if (res?.success) {
      } else {
      }
    },
  });
};

//---------------- useSSO Hook ------------------------------------
type IUseSSO = {
  config?: MutationConfig<typeof SSOService.authReq>;
};
export const useSSO = ({ config }: IUseSSO) => {
  return useMutation({
    ...config,
    mutationFn: SSOService.authReq,
  });
};
