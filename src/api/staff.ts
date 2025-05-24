import api from '@/lib/axios';
import { IResponseParams } from '@/types/pagination';
import { ICreateStaff, IUpdateStaff } from '@/types/staff';

export default {
  getStaff: (params: IResponseParams) => api.get('/staff/', { params }),

  getStaffById: (id: string) => api.get(`/staff/detail/${id}`),

  deleteStaff: (id: string) => api.delete(`/staff/delete/${id}`),

  createStaff: (payload: ICreateStaff) => api.post('/staff/create/', payload),

  updateStaff: (id: string, payload: IUpdateStaff) => api.put(`/staff/edit/${id}`, payload),
};
