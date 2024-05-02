import { MutationConfig, queryClient } from '@lib/config';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from './service';

//------------------ useUserCreate hook ---------------------------------
type IUseLogin = {
  config?: MutationConfig<typeof AuthService.login>;
};

export const useLogin = ({ config }: IUseLogin = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.login,
    onSettled: (data) => {
      if (!data?.jwt) return;
      queryClient.invalidateQueries({
        queryKey: [AuthService.NAME],
      });
    },
  });
};

//------------------ useUserCreate hook ---------------------------------
type IUseRegister = {
  config?: MutationConfig<typeof AuthService.register>;
};

export const useRegister = ({ config }: IUseRegister = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.register,
    onSettled: (data) => {
      if (!data?.jwt) return;
      queryClient.invalidateQueries({
        queryKey: [AuthService.NAME],
      });
    },
  });
};

//------------------ useUserCreate hook ---------------------------------
type IUseForgotPassword = {
  config?: MutationConfig<typeof AuthService.forgotPassword>;
};

export const useForgotPassword = ({ config }: IUseForgotPassword = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.forgotPassword,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [AuthService.NAME],
      });
    },
  });
};

//------------------ useUserCreate hook ---------------------------------
type IUseResetPassword = {
  config?: MutationConfig<typeof AuthService.ResetPassword>;
};

export const useResetPassword = ({ config }: IUseResetPassword = {}) => {
  return useMutation({
    ...config,
    mutationFn: AuthService.ResetPassword,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [AuthService.NAME],
      });
    },
  });
};
