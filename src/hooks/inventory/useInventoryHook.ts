import inventory_api from '@/api/inventory';
import { ICreateInventory, IInventory, IUpdateInventory, IUpdateQuantity } from '@/types/inventory/product';
import { IResponseParams } from '@/types/pagination';
import { useState } from 'react';
import { useNavigate, data } from 'react-router-dom';

const useInventoryHook = () => {
  const [inventory, setInventory] = useState<IInventory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState<IResponseParams>({
    limit: 10,
    page: 1,
    search: '',
    merchant_id: '',
  });

  const getInventoryHook = async (query: IResponseParams) => {
    try {
      setIsLoading(true);
      const filteredQuery = { ...query };
      if (!filteredQuery.merchant_id) {
        delete filteredQuery.merchant_id;
      }

      const response = await inventory_api.getInventory(filteredQuery);

      if (response.data) {
        setInventory(response.data.data);
        setQueryParams((prev) => ({
          ...prev,
          limit: query.limit,
          page: query.page,
          search: query.search,
          merchant_id: query.merchant_id || '',
        }));
        setTotalPages(response.data.countPage);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createInventory = async (data: ICreateInventory) => {
    try {
      const response = await inventory_api.createInventory(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateInventory = async (id: string, data: IUpdateInventory) => {
    try {
      const response = await inventory_api.updateInventory(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updatequantity = async (id: string, data: IUpdateQuantity) => {
    try {
      const response = await inventory_api.updateQuantity(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  return {
    inventory,
    isLoading,
    totalPages,
    queryParams,
    setQueryParams,
    getInventoryHook,
    createInventory
  };
};
export default useInventoryHook;
