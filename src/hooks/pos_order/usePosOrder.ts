import pos_order from '@/api/pos_order';
import { IResponseParams } from '@/types/pagination';
import { ICreatePosOrder, IGetPosOrder } from '@/types/pos_order/pos_order';
import { useState } from 'react';
import { useNavigate, data } from 'react-router-dom';

const usePosOrderHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posOrder, setPosOrder] = useState<IGetPosOrder[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [queryParams, setQueryParams] = useState<IResponseParams>({
    sort: 1,
    limit: 20,
    page: 1,
    sort_type: 'desc',
    sort_by: 'pos_order_uid',
  });
  const navigate = useNavigate();

  const getAllPosOrder = async (query: IResponseParams) => {
    try {
      const response = await pos_order.getPosOrder(query);
      if (response.data) {
        setPosOrder(response.data.data);
        setQueryParams({
          page: response.data.currentPage,
          limit: query.limit,
          sort: query.sort,
          sort_type: query.sort_type,
          sort_by: query.sort_by,
        });
        setTotalPages(response.data.countPage);
      }
    } catch (error) {
      throw error;
    }
  };

  const getPosOrderById = async (id: string) => {
    try {
      const response = await pos_order.getPosOrderById(id);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const createPosOrder = async (data: ICreatePosOrder) => {
    try {
      const response = await pos_order.createPosOrder(data);
      navigate('/posOrder');
      return response;
    } catch (error) {
      throw error;
    }
  };
  return {
    isLoading,
    setIsLoading,
    posOrder,
    setPosOrder,
    totalPages,
    setTotalPages,
    queryParams,
    setQueryParams,
    getAllPosOrder,
    createPosOrder,
    getPosOrderById,
  };
};

export default usePosOrderHook;
