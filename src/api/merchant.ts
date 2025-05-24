import api from '@/lib/axios';

import { IResponseParams } from '@/types/pagination';

export default {
  getMerchant: (params: IResponseParams) => api.get('/merchant/', { params }),

  createMerchant: (formData: FormData) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return api.post('/merchant/create/', formData, config);
  },

  updateMerchant: (id: string, formData: FormData) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return api.post(`/merchant/edit/${id}`, formData, config);
  },
};
