import api from '@/lib/axios';
import { IPayloadProduct, IProduct } from '@/types/inventory/product';
import ISupplier from '@/types/inventory/supplier';
import { IUnit } from '@/types/inventory/unit.type';
import { IResponseParams } from '@/types/pagination';

export default {
  createProduct: (formData: FormData) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return api.post('/product/create', formData, config);
  },

  getProduct: (params: IResponseParams) => api.get('/product/', { params }),

  getProductById: (id: string) => api.get(`/product/detail/${id}`),

  updateProduct: (id: string, data: IPayloadProduct) => {
    return api.put(`/product/edit/${id}`, data);
  },

  deleteProduct: (id: string) => api.delete(`/product/delete/${id}`),

  updatePhotos: (id: string, formData: FormData) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return api.put(`/product/edit/photos/${id}`, formData, config);
  },

  //product Unit
  createProductUnit: (payload: IUnit) => api.post('/unit/create', payload),
  getProductUnit: (params: IResponseParams) => {
    return api.get(`/unit/`, { params });
  },
  getProductUnitById: (_id: string) => api.get(`/unit/detail/${_id}`),

  deleteProductUnit: (_id: string) => api.delete(`/unit/delete/${_id}`),

  updateProductUnit: (id: string, payload: IUnit) => api.put(`/unit/edit/${id}`, payload),

  //product Category
  createCategory: (formData: FormData) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return api.post('/category/create', formData, config);
  },
  getCategoryProduct: (params: IResponseParams) => {
    return api.get(`/category/`, { params });
  },
  getCategoryProductById: (_id: string) => api.get(`/category/detail/${_id}`),

  deleteCategory: (_id: string) => api.delete(`/category/delete/${_id}`),

  updateCategory: (id: string, formData: FormData) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return api.put(`/category/edit/${id}`, formData, config);
  },

  //product supplier
  createSupplier: (payload: ISupplier) => api.post('/supplier/create', payload),
  getSupplierProduct: (params: IResponseParams) => {
    return api.get(`/supplier/`, { params });
  },
  getSupplierProductById: (_id: string) => api.get(`/supplier/detail/${_id}`),

  deleteSupplier: (_id: string) => api.delete(`/supplier/delete/${_id}`),

  updateSupplier: (id: string, payload: ISupplier) => api.put(`/supplier/edit/${id}`, payload),
};
