import product from '@/api/product';
import { IUnit } from '@/types/inventory/unit.type';
import { IResponseParams } from '@/types/pagination';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useUnitHook = () => {
  const [units, setUnit] = useState<IUnit[]>([]);
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

  const getUnit = async (query: IResponseParams) => {
    setIsLoading(true);
    try {
      const response = await product.getProductUnit(query);

      if (response.data) {
        setUnit(response.data.data);
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
      console.error('Error fetching unit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUnitById = async (_id: string) => {
    setIsLoading(true);
    try {
      const response = await product.getProductUnitById(_id);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createUnit = async (data: IUnit) => {
    setIsLoading(true);

    try {
      const response = await product.createProductUnit(data);
      if (response) {
        navigate('/product/units');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUnit = async (_id: string, data: IUnit) => {
    setIsLoading(true);
    try {
      const response = await product.updateProductUnit(_id, data);

      if (response) {
        navigate('/product/units');
      }
      getUnit(queryParams);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUnit = async (_id: string) => {
    setIsLoading(true);
    try {
      const response = await product.deleteProductUnit(_id);
      getUnit(queryParams);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    units,
    isLoading,
    createUnit,
    getUnit,
    queryParams,
    setQueryParams,
    totalPages,
    updateUnit,
    deleteUnit,
    getUnitById,
  };
};

export default useUnitHook;
