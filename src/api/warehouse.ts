import api from '@/lib/axios';

export default {
  createWareHouse: (formData: FormData) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return api.post('/warehouse/create', formData, config);
  },
};
