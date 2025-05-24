import api from '@/lib/axios';
import { IMessage } from '@/types/message/message';
import { IResponseParams } from '@/types/pagination';

export default {
  createMessage: (payload: IMessage) => api.post('/message/create', payload),
  editMessage: (id: string, payload: IMessage) => api.put(`message/edit/${id}`, payload),
  deleteMessage: (id: string) => api.delete(`/message/delete/${id}`),
  getMessage: (params: IResponseParams) => api.get('/message/', { params }),
  getMessageById: (id: string) => api.get(`/message/detail/${id}`),
};
