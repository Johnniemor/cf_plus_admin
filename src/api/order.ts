import api from '@/lib/axios';
import { IUpdateOrderDetail, IUpdateOrderStatus } from '@/types/order/order';
import { IResponseParams } from '@/types/pagination';

export default {
  getOrder: (params: IResponseParams) => api.get('/cf-order', { params }),
  getOrderById: (id: string) => api.get(`/cf-order/detail/${id}`),
  updateOrderStatus: (data: IUpdateOrderStatus) => api.put(`/cf-order/update/status`, data),
  updateOrderDetail: (data: IUpdateOrderDetail) => api.put(`/cf-order/update/detail`, data),
  getCountOrder: () => api.get('/cf-order/counts'),
};
