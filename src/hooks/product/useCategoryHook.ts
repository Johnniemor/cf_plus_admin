import product from '@/api/product';
import ICategory from '@/types/inventory/category';
import { IResponseParams } from '@/types/pagination';
import { set } from 'lodash';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useCategoriesHook = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
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

  const getCategory = async (query: IResponseParams) => {
    setIsLoading(true);
    try {
      const response = await product.getCategoryProduct(query);
      if (response.data) {
        setCategories(response.data.data);
        setQueryParams({
          page: response.data.currentPage,
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
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryById = async (_id: string) => {
    setIsLoading(true);
    try {
      const response = await product.getCategoryProductById(_id);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (data: ICategory) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      if (data.image) formData.append('image', data.image);

      const response = await product.createCategory(formData);
      if (response) navigate('/product/category');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = async (_id: string, data: ICategory): Promise<boolean> => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);

      if (data.image) {
        formData.append('image', data.image);
      }

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await product.updateCategory(_id, formData);

      if (response) {
        navigate('/product/category');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Update Error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (_id: string) => {
    setIsLoading(true);
    try {
      const response = await product.deleteCategory(_id);
      getCategory(queryParams);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    categories,
    getCategory,
    queryParams,
    totalPages,
    isLoading,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    setTotalPages,
    setQueryParams,
  };
};
export default useCategoriesHook;
