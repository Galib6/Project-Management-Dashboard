import { IBaseResponse, IBaseStrapiFilter, IdType } from '@modules/base/interfaces';

export interface IProjectFilter extends IBaseStrapiFilter {}
export interface IProject {
  id: IdType;
  attributes: {
    title: string;
    description: string;
    recentActivity: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    assignedMember: {
      name: string;
    }[];
  };
}

export interface IProjectCreate {
  data: {
    title: string;
    description: string;
    recentActivity: string;
    assignedMember: {
      name: string;
    }[];
  };
}

export interface IProjectUpdate {
  id: IdType;
  data: Partial<IProjectCreate>;
}

export interface IProjectResponse extends IBaseResponse {
  data: IProject;
}

export interface IProjectsResponse extends IBaseResponse {
  data: IProject[];
}
