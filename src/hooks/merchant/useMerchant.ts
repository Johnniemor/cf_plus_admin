import merchant_api from '@/api/merchant';
import { ICreateMerchant, IMerchant } from '@/types/merchant/merchant';
import { IResponseParams } from '@/types/pagination';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useMerchantHook = () => {
  const [merchant, setMerchant] = useState<IMerchant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState<IResponseParams>({
    limit: 10,
    page: 1,
    search: '',
    deleted: false,
    sort: 1,
    sort_type: 'desc',
    sort_by: 'name',
  });

  const getMerchantHook = async (query: IResponseParams) => {
    try {
      setIsLoading(true);
      const response = await merchant_api.getMerchant(query);
      if (response.data) {
        setMerchant(response.data.data);
        setQueryParams({
          ...queryParams,
          limit: response.data.limit,
          page: response.data.currentPage,
          sort: query.sort,
          sort_type: query.sort_type,
          sort_by: query.sort_by,
        });
        setTotalPages(response.data.countPage);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createMerchant = async (data: ICreateMerchant) => {
    try {
      console.log('@@@@@@@@@@@@@@@@@@@@@@', data);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('mobile_number', data.mobile_number);
      if (data.avatar) {
        formData.append('avatar', data.avatar);
      }

      const response = await merchant_api.createMerchant(formData);
      toast.success('create merchant success');
      navigate('/merchant');
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMerchant = async (id: string, data: ICreateMerchant) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('mobile_number', data.mobile_number);
      if (data.avatar) {
        formData.append('avatar', data.avatar);
      }

      const response = await merchant_api.updateMerchant(id, formData);
      toast.success('update merchant success');
      navigate('/merchant');
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    merchant,
    isLoading,
    totalPages,
    queryParams,
    getMerchantHook,
    createMerchant,
    updateMerchant,
    setQueryParams,
  };
};

export default useMerchantHook;
