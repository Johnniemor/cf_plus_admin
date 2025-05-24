import order_api from '@/api/order';
import { IOrder, IUpdateOrderDetail, IUpdateOrderStatus } from '@/types/order/order';
import { IResponseParams } from '@/types/pagination';
import { useState } from 'react';

const useOrderHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<IOrder[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const [queryParams, setQueryParams] = useState<IResponseParams>({
    sort: 1,
    limit: 10,
    page: 1,
    search: '',
    status: undefined,
    sort_type: 'desc',
    sort_by: 'created_at',
  });

  const getOrderHook = async (query: IResponseParams) => {
    setIsLoading(true);
    try {
      const cleanedQuery = {
        ...query,
        ...(query.status === undefined && { status: undefined }),
      };
      const response = await order_api.getOrder(cleanedQuery);
      if (response.data) {
        setOrder(response.data.data);
        setQueryParams({
          page: response.data.currentPage,
          limit: query.limit,
          search: query.search,
          sort: query.sort,
          sort_type: query.sort_type,
          sort_by: query.sort_by,
          status: query.status ?? undefined,
        });
        setTotalPages(response.data.countPage);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderCount = async () => {
    setIsLoading(true);
    try {
      const response = await order_api.getCountOrder();
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderById = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await order_api.getOrderById(id);
      await getOrderHook(queryParams);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (data: IUpdateOrderStatus) => {
    try {
      setIsLoading(true);
      const response = await order_api.updateOrderStatus(data);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderDetail = async (data: IUpdateOrderDetail) => {
    try {
      setIsLoading(true);
      const response = await order_api.updateOrderDetail(data);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    order,
    totalPages,
    queryParams,
    getOrderHook,
    getOrderById,
    setQueryParams,
    updateOrderStatus,
    updateOrderDetail,
    getOrderCount,
  };
};

export default useOrderHook;
