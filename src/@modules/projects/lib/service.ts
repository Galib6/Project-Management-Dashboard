import { coreAxiosInstance } from '@lib/config';
import { ErrorHandler, toolbox } from '@lib/utils';
import { IProjectCreate, IProjectFilter, IProjectResponse, IProjectUpdate, IProjectsResponse } from './interfaces';

const END_POINT: string = '/projects';

export const ProjectService = {
  NAME: END_POINT,
  async create(payload: IProjectCreate): Promise<IProjectResponse> {
    try {
      const res = await coreAxiosInstance.post(END_POINT, payload);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async find(options: IProjectFilter): Promise<IProjectsResponse> {
    try {
      const res = await coreAxiosInstance.get(`${END_POINT}?${toolbox.queryStringify(options)}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },

  async findById(id: string): Promise<IProjectResponse> {
    try {
      if (!id) return null;
      const res = await coreAxiosInstance.get(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async update(payload: IProjectUpdate): Promise<IProjectResponse> {
    try {
      const res = await coreAxiosInstance.put(`${END_POINT}/${payload.id}`, payload.data);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
  async delete(id: string): Promise<IProjectResponse> {
    try {
      const res = await coreAxiosInstance.delete(`${END_POINT}/${id}`);
      return Promise.resolve(res?.data);
    } catch (error) {
      throw ErrorHandler(error);
    }
  },
};
