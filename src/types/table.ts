import { ReactNode } from 'react';

export interface ITableHeader {
  id: string;
  name: string;
  sortable: boolean;
  width?: string | number;
}

export interface ITableSortConfig {
  sortBy: string;
  sortType: 'asc' | 'desc';
}

export interface ITable {
  header: ITableHeader[];
  data: any[];
  body: ReactNode;
  loading: boolean;
  children: ReactNode;
  onSort?: (id: string) => void;
  sortConfig?: ITableSortConfig;
  title?: string;
  headerAction?: ReactNode[];
  filterAction?: ReactNode[];
  className?: string;
  dataEmptyText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheck?: boolean;
  isShowSelect?: boolean;
}
