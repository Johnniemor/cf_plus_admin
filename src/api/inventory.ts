import api from '@/lib/axios';
import { ICreateInventory, IUpdateInventory, IUpdateQuantity } from '@/types/inventory/product';
import { IResponseParams } from '@/types/pagination';

export default {
  getInventory: (params: IResponseParams) => api.get('/inventory', { params }),
  getDetailInventory: (id: string) => api.get(`/inventory/detail/${id}`),
  createInventory: (payload: ICreateInventory) => api.post('/import-product/create', payload),
  updateInventory: (id: string, payload: IUpdateInventory) => api.put(`/inventory/edit/${id}`, payload),
  updateQuantity: (id: string, payload: IUpdateQuantity) => api.put(`/inventory/update/quantity/${id}`, payload),
};
