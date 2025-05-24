import { useState, useCallback } from 'react';

interface SortableQueryParams {
  sort?: number;
  sort_by?: string;
  sort_type?: 'asc' | 'desc';
  page?: number;
  [key: string]: any; 
}

export interface ITableSortConfig {
  sortBy: string;
  sortType: 'asc' | 'desc';
}

export function useTableSort<T extends SortableQueryParams = SortableQueryParams>(
  initialParams: T,
  fetchData: (params: T) => void,
) {
  const [queryParams, setQueryParams] = useState<T>(initialParams);

  const handleTableSort = useCallback(
    (id: string) => {
      setQueryParams((prev) => {
        const isSameColumn = prev.sort_by === id;
        const newSortType: 'asc' | 'desc' = isSameColumn && prev.sort_type === 'asc' ? 'desc' : 'asc';

        const newParams = {
          ...prev,
          sort: 1,
          sort_by: id,
          sort_type: newSortType,
          page: 1,
        } as T;

        fetchData(newParams);
        return newParams;
      });
    },
    [fetchData],
  );

  const getSortConfig = useCallback(
    (): ITableSortConfig | undefined =>
      queryParams.sort_by
        ? { sortBy: queryParams.sort_by, sortType: (queryParams.sort_type || 'asc') as 'asc' | 'desc' }
        : undefined,
    [queryParams.sort_by, queryParams.sort_type],
  );

  return {
    queryParams,
    setQueryParams,
    handleTableSort,
    getSortConfig,
  };
}
