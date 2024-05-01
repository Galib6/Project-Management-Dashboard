export interface IBaseStrapiFilter {
  populate?: object | string;
  sort?: string;
  pagination?: {
    page: number;
    pageSize: number;
  };
  filters?:
    | {
        slug?: {
          $eq: string | string[] | undefined;
        };
        isActive?: {
          $eq: boolean;
        };
        name: {
          $contains: string;
        };
      }
    | any;
}

export interface IBaseFilter {
  query?: string;
  searchTerm?: string;
  title?: string;
  page?: number;
  limit?: number;
  name?: string;
  category?: string;
  filter?: string[];
  s?: object;
  sort?: string[];
  user?: string | number;
  scopes?: string[];
}

export interface IBaseResponse {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error: {
    status: number;
    name: string;
    message: string;
    details: any;
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: [] | {} | null;
}

export interface IBaseFilterPayload {
  data: any[];
  page?: number;
  limit?: number;
  total?: number;
}

export interface IBaseEntity {
  id?: IdType | any;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string | null;
  deletedBy?: any;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: null;
}

export type IdType = string | number;

export type IFormFinishType = 'save' | 'save_close';
export type IFormType = 'create' | 'update';
