export declare interface IError {
  data: any;
  code: number | null;
  message: string | null;
  status: 'success' | 'error';
}

export interface IParams {
  limit?: number;
  page?: number;
  sort_by?: string;
  sort_type?: 'asc' | 'desc';
  search?: string;
  role?: string;
  month?: Date | null;
  status?: string;
  member?: string;
  date: Date;
}
