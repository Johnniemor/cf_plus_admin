import { OrderStatus } from '@/configs';

export interface IPaginatedResponse<T> {
  [x: string]: number;
  total: any;
  count: number;
  countPage: number;
  currentPage: number;
  nextPage: number;
  previousPage: number;
}

export interface IResponseParams {
  page: number;
  limit: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  sort?: number;
  deleted?: boolean;
  available?: boolean;
  sort_type?: string;
  sort_by?: string;
  page_id?: string | undefined;
  before?: string;
  after?: string;
  group_id?: string;
  category_id?: string | null;
  supplier_id?: string | null;
  unit_id?: string | null;
  status?: string;
  start_date?: Date | string;
  end_date?: Date | string;
  merchant_id?: string;
}

export interface IDateParam {
  page: number;
  limit: number;
  search: string;
  start_date?: Date | string;
  end_date?: Date | string;
}
