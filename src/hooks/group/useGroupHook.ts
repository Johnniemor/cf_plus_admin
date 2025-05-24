import group from '@/api/group';
import {
  IGroup,
  INoCf,
  IPattern,
  IPost,
  IProductGroup,
  IProductGroupAction,
  IUpdateProductGroup,
} from '@/types/group/group';
import { IResponseParams } from '@/types/pagination';
import { useState } from 'react';
import { useNavigate, data } from 'react-router-dom';

const useGroupHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroup] = useState<IGroup[]>([]);
  const [noCf, setNoCf] = useState<IPost[]>([]);
  const [pattern, setPattern] = useState<IPattern[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState<IResponseParams>({
    sort: 1,
    limit: 10,
    page: 1,
    search: '',
    available: true,
    // page_id: '',
    sort_type: 'desc',
    sort_by: 'name',
  });

  const getGroupHook = async (query: IResponseParams) => {
    setIsLoading(true);
    try {
      const response = await group.getGroup(query);
      if (response.data) {
        setGroup(response.data.data);
        setQueryParams({
          page: response.data.currentPage,
          limit: query.limit,
          search: query.search,
          available: query.available,
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

  const getGroupByIdHook = async (_id: string) => {
    // setIsLoading(true);
    try {
      const response = await group.getGroupById(_id);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getNoCFHook = async (query: IResponseParams) => {
    try {
      setIsLoading(true);
      const response = await group.getNoCF(query);

      if (response.data) {
        setNoCf(response.data);
        setQueryParams({
          page: response.data?.currentPage,
          limit: query.limit,
          search: query.search,
          page_id: query.page_id,
        });
        setTotalPages(response.data?.countPage);
      } else {
        console.log('No data found in the response');
      }
    } catch (error) {
      console.error('Error fetching noCF data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createGroupHook = async (data: IGroup) => {
    setIsLoading(true);
    try {
      const response = await group.createGroup(data);
      if (response.data) {
        navigate('/group');
        return response.data;
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateGroupHook = async (_id: string, data: IGroup) => {
    setIsLoading(true);
    try {
      const response = await group.updateGroup(_id, data);
      if (response.data) {
        navigate('/group');
        return response.data;
      }
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateGroupDetailProduct = async (_id: string, data: IProductGroup) => {
    setIsLoading(true);
    try {
      const response = await group.updateGroupDetailProducts(_id, data);
      if (response.data) {
        navigate(`/group/detail/${_id}`);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getGroupDetailProductByIdHook = async (_id: string, group_id: string) => {
    setIsLoading(true);
    try {
      const response = await group.getGroupDetailProductById(_id, group_id);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addGroupProductHook = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await group.addGroupProduct(data);
      if (response.data) {
        navigate(`/group/detail/${data.group_id}`);
      }
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateGroupProductHook = async (id: string, data: IUpdateProductGroup) => {
    setIsLoading(true);
    try {
      const response = await group.updateGroupProduct(id, data);
      if (response.data) {
        navigate(`/group/detail/${data.group_id}`);
      }
      return response;
    } catch (error) {}
  };

  const createPattern = async (page_id: string) => {
    setIsLoading(true);
    try {
      const response = await group.createPattern(page_id);
      return response;
    } catch (error: any) {
      throw error;
    }
  };

  const getPatternHook = async (page_id: string) => {
    setIsLoading(true);
    try {
      const response = await group.getPattern(page_id);
      console.log('pattern test : ', response);
      setPattern(response.data.data);
      return response;
    } catch (error: any) {
      throw error;
    }
  };

  return {
    isLoading,
    groups,
    pattern,
    createPattern,
    // createPostHook,
    totalPages,
    queryParams,
    getGroupHook,
    createGroupHook,
    setQueryParams,
    updateGroupHook,
    getGroupByIdHook,
    updateGroupDetailProduct,
    getGroupDetailProductByIdHook,
    addGroupProductHook,
    getPatternHook,
    getNoCFHook,
    setNoCf,
    noCf,
    updateGroupProductHook,
  };
};
export default useGroupHook;
