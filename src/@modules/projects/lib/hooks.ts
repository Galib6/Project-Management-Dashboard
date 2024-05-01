import { MutationConfig, QueryConfig, queryClient } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';

import { IProjectFilter } from './interfaces';
import { ProjectService } from './service';

//---------------- useProjects hook ------------------------------------
type IUseProjects = {
  options: IProjectFilter;
  config?: QueryConfig<typeof ProjectService.find>;
};
export const useProjects = ({ options, config }: IUseProjects) => {
  return useQuery({
    ...config,
    queryKey: [ProjectService.NAME, options],
    queryFn: () => ProjectService.find(options),
  });
};

//----------------------- useProject hook --------------------------------------
type IUseProject = {
  id: string;
  config?: QueryConfig<typeof ProjectService.findById>;
};

export const useProject = ({ id, config }: IUseProject) => {
  return useQuery({
    ...config,
    queryKey: [id],
    queryFn: () => ProjectService.findById(id),
  });
};

//------------------ useProjectCreate hook ---------------------------------
type IUseProjectCreate = {
  config?: MutationConfig<typeof ProjectService.create>;
};

export const useProjectCreate = ({ config }: IUseProjectCreate = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProjectService.create,
    onSettled: (data) => {
      if (!data?.data?.id) return;
      queryClient.invalidateQueries({
        queryKey: [ProjectService.NAME],
      });
    },
  });
};

//------------------ useProjectUpdate hook ----------------------------------
type IUseProjectUpdate = {
  config?: MutationConfig<typeof ProjectService.update>;
};

export const useProjectUpdate = ({ config }: IUseProjectUpdate = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProjectService.update,
    onSettled: (data) => {
      if (!data?.data?.id) return;
      queryClient.invalidateQueries({
        queryKey: [ProjectService.NAME],
      });
    },
  });
};

//------------------ useProjectDelete hook ----------------------------------
type IUseProjectDelete = {
  config?: MutationConfig<typeof ProjectService.delete>;
};

export const useProjectDelete = ({ config }: IUseProjectDelete = {}) => {
  return useMutation({
    ...config,
    mutationFn: ProjectService.delete,
    onSettled: (data) => {
      if (!data?.data?.id) return;
      queryClient.invalidateQueries({
        queryKey: [ProjectService.NAME],
      });
    },
  });
};
