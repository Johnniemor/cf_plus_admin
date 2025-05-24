import product from '@/api/product';
import { IPayloadProduct, IProduct } from '@/types/inventory/product';
import { IResponseParams } from '@/types/pagination';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useProductHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [queryParams, setQueryParams] = useState<IResponseParams>({
    limit: 10,
    page: 1,
    search: '',
    deleted: false,
    sort: 1,
    sort_type: 'asc',
    sort_by: 'cf_code',
  });
  const navigate = useNavigate();

  const getProduct = async (query: IResponseParams) => {
    setIsLoading(true);
    try {
      const cleanedQuery = {
        ...query,
        category_id: query.category_id || undefined,
        supplier_id: query.supplier_id || undefined,
        unit_id: query.unit_id || undefined,
      };

      const response = await product.getProduct(cleanedQuery);
      if (response.data) {
        setProducts(response.data.data);
        setQueryParams({
          page: response.data.currentPage,
          limit: query.limit,
          search: query.search,
          deleted: query.deleted,
          sort: query.sort,
          sort_type: query.sort_type,
          sort_by: query.sort_by,
          category_id: query.category_id,
          supplier_id: query.supplier_id,
          unit_id: query.unit_id,
        });
        setTotalPages(response.data.countPage);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const createProductHook = async (data: any) => {
    setIsLoading(true);
    try {
      console.log(data);
      const formData = new FormData();
      formData.append('code', data.code);
      formData.append('name', data.name);
      formData.append('descriptions', data.descriptions);
      formData.append('category_id', data.category_id);
      formData.append('supplier_id', data.supplier_id);
      formData.append('unit_id', data.unit_id);
      // formData.append('tag', data.tag);
      formData.append('cf_code', data.cf_code);
      formData.append('pos_price', data.pos_price.toString());
      formData.append('online_price', data.online_price.toString());
      formData.append('cf_price', data.cf_price.toString());

      if (data.photos) {
        for (let i = 0; i < data.photos.length; i++) {
          formData.append('photos', data.photos[i]);
        }
      }

      const response = await product.createProduct(formData);

      toast.success('create product success');
      navigate('/product/all');
      return response;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProductHook = async (_id: string, data: IPayloadProduct) => {
    setIsLoading(true);
    try {
      const updateData = {
        code: data.code,
        cf_code: data.cf_code,
        name: data.name,
        pos_price: data.pos_price,
        cf_price: data.cf_price,
        online_price: data.online_price,
        descriptions: data.descriptions,
        category_id: data.category_id,
        unit_id: data.unit_id,
        supplier_id: data.supplier_id,
        currency: data.currency,
        tag: data.tag,
        available: data.available,
        photos: data.photos,
      };

      const response = await product.updateProduct(_id, updateData);
      toast.success('update product success');
      getProduct(queryParams);
      navigate('/product/all');
      return response;
    } catch (error) {
      toast.error('Failed to update product');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePhotosProductHook = async (_id: string, data: IPayloadProduct) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (data.photos) {
        for (let i = 0; i < data.photos.length; i++) {
          const photo = data.photos[i];

          if (typeof photo === 'string') {
            formData.append('photos', photo);
          } else if (photo) {
            formData.append('photos', photo);
          }
        }
      }

      const response = await product.updatePhotos(_id, formData);

      toast.success('Update photos success');
      getProduct(queryParams);
      navigate('/product/all');
      return response;
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProductHook = async (_id: string) => {
    setIsLoading(true);
    try {
      const response = await product.deleteProduct(_id);
      getProduct(queryParams);
      return response;
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getProductById = async (_id: string) => {
    setIsLoading(true);
    try {
      const response = await product.getProductById(_id);
      getProduct(queryParams);
      console.log('TEst by id : ', response);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    products,
    queryParams,
    totalPages,
    getProduct,
    setQueryParams,
    getProductById,
    updateProductHook,
    createProductHook,
    deleteProductHook,
    updatePhotosProductHook,
  };
};

export default useProductHook;
