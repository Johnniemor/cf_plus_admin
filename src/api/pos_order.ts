import api from '@/lib/axios';
import { IResponseParams } from '@/types/pagination';
import { ICreatePosOrder } from '@/types/pos_order/pos_order';

export default {
  getPosOrder: (params: IResponseParams) => api.get('/pos-order/', { params }),
  getPosOrderById: (id: string) => api.get(`/pos-order/detail/${id}`),
  createPosOrder: (payload: ICreatePosOrder) => api.post('/pos-order/create', payload),
  updateStatus: (id: string) => api.put(`/order/update/status/${id}`),
  updateDetail: (id: string) => api.put(`/order/update/detail/${id}`),
};
