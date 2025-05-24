import product from '@/api/product';
import ISupplier from '@/types/inventory/supplier';
import { IResponseParams } from '@/types/pagination';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSupplierHook = () => {
  const [supplier, setSupplier] = useState<ISupplier[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [queryParams, setQueryParams] = useState<IResponseParams>({
    limit: 10,
    page: 1,
    search: '',
    deleted: false,
    sort: 1,
    sort_type: 'desc',
    sort_by: 'name',
  });
  const navigate = useNavigate();

  const getSupplier = async (query: IResponseParams) => {
    setIsLoading(true);
    try {
      const response = await product.getSupplierProduct(query);
      if (response.data) {
        setSupplier(response.data.data);
        setQueryParams({
          page: response.data.currentPage || 1,
          limit: query.limit,
          search: query.search,
          deleted: query.deleted,
          sort: query.sort,
          sort_type: query.sort_type,
          sort_by: query.sort_by,
        });
        setTotalPages(response.data.countPage);
      }
    } catch (error) {
      console.error('Error fetching supplier:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSupplierById = async (_id: string) => {
    setIsLoading(true);
    try {
      const response = await product.getSupplierProductById(_id);

      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createSupplier = async (data: ISupplier) => {
    try {
      setIsLoading(true);
      const response = await product.createSupplier(data);
      if (response) {
        navigate('/product/supplier');
      }
      setIsLoading(false);
    } catch (error) {
      error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSupplier = async (_id: string, data: ISupplier) => {
    setIsLoading(true);
    try {
      const response = await product.updateSupplier(_id, data);
      if (response) {
        navigate('/product/supplier');
      }
      setIsLoading(false);
    } catch (error) {
      error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSupplier = async (_id: string) => {
    setIsLoading(true);
    try {
      const response = await product.deleteSupplier(_id);
      getSupplier(queryParams);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    supplier,
    isLoading,
    getSupplier,
    createSupplier,
    queryParams,
    totalPages,
    updateSupplier,
    deleteSupplier,
    getSupplierById,
    setQueryParams,
  };
};

export default useSupplierHook;
