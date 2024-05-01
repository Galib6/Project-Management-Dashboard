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
  success: boolean;
  statusCode: number;
  message: string;
  errorMessages: string[];
  meta: {
    total: number;
    page: number;
    limit: number;
    skip: number;
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
