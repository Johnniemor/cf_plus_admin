import staff_api from '@/api/staff';
import { ICreateStaff, IStaff, IUpdateStaff } from '@/types/staff';
import { IResponseParams } from '@/types/pagination';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStaffHook = () => {
  const [staff, setStaff] = useState<IStaff[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [queryParams, setQueryParams] = useState<IResponseParams>({
    limit: 10,
    page: 1,
    search: '',
    deleted: false,
  });
  const navigate = useNavigate();

  const getStaffHook = async (query: IResponseParams) => {
    try {
      setIsLoading(true);
      const response = await staff_api.getStaff(query);
      if (response.data) {
        setStaff(response.data.data);
        setQueryParams({
          ...queryParams,
          page: response.data.currentPage,
          limit: response.data.limit,
        });
        setTotalPages(response.data.countPage);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getStaffHookById = async (id: string) => {
    try {
      const response = await staff_api.getStaffById(id);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createStaffHook = async (data: ICreateStaff) => {
    try {
      setIsLoading(true);
      const response = await staff_api.createStaff(data);
      if (response) {
        navigate('/employee');
      }
      setIsLoading(false);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateStaffHook = async (id: string, data: IUpdateStaff) => {
    try {
      setIsLoading(true);
      const response = await staff_api.updateStaff(id, data);
      if (response) {
        navigate('/employee');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteStaffHook = async (_id: string) => {
    try {
      setIsLoading(true);
      const response = await staff_api.deleteStaff(_id);
      if (response) {
        navigate('/employee');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStaffHook(queryParams);
  }, [queryParams.page, queryParams.limit, queryParams.search]);
  return {
    staff,
    isLoading,
    totalPages,
    queryParams,
    getStaffHook,
    deleteStaffHook,
    createStaffHook,
    updateStaffHook,
    getStaffHookById,
    setQueryParams,
  };
};

export default useStaffHook;
