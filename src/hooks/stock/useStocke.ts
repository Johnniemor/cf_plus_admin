import { useState, useEffect } from 'react';
import { ICreateStock, IStockArray } from '@/types/stock';
import { IPaginatedResponse, IResponseParams } from '@/types/pagination';
import { data, useNavigate } from 'react-router-dom';
import import_stock from '@/api/import_stock';

const useStockHook = () => {
  const [stocks, setStocks] = useState<IStockArray>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [queryParams, setQueryParams] = useState<IResponseParams>({
    limit: 10,
    page: 1,
    search: '',
  });
  const [totalPages, setTotalPages] = useState(1);

  const fetchStocks = async (params: IResponseParams) => {
    setIsLoading(true);
    try {
      const response = await import_stock.getStock(params);
      if (response.data) {
        setStocks(response.data.data);
        setQueryParams({
          page: response.data.currentPage,
          limit: params.limit,
          start_date: response.data.start_date,
          end_date: response.data.end_date,
        });
        setTotalPages(response.data.countPage);
      }
    } catch (err) {
      setError('Failed to fetch stocks');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addStock = async (data: ICreateStock) => {
    setIsLoading(true);
    try {
      const response = await import_stock.createStock(data);
      if (response) {
        navigate('/stock');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteStock = async (ids: Array<string>) => {
    setIsDeleting(true);
    try {
      // await import_stock.deleteStock({ ids });
      const response = await import_stock.deleteStock({ ids });
      console.log(response);

      setStocks((prev) => prev.filter((stock) => !ids.includes(stock._id)));
    } catch (err) {
      console.error('Error deleting stock:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchStocks(queryParams);
  }, [queryParams.page, queryParams.limit]);

  return { stocks, isLoading, isDeleting, queryParams, setQueryParams, totalPages, fetchStocks, deleteStock, addStock };
};

export default useStockHook;
