import api from '@/lib/axios';
import { IAddPost } from '@/types/group/group';
import { IMessage } from '@/types/message/message';
import { IResponseParams } from '@/types/pagination';

export default {
  getPage: (params: IResponseParams) => api.get('/page/', { params }),

  getFeed: (params: IResponseParams) => api.get('/page/feed', { params }),
  createPost: (payload: IAddPost) => api.put('/setting-post/group/post/add', payload),

  subScription: (id: string) => api.post(`/page/subscript/${id}`),
  unSubScription: (id: string) => api.delete(`/page/subscript/${id}`),

  createMessage: (payload: IMessage) => api.post('/message/create', payload),
  editMessage: (id: string, payload: IMessage) => api.put(`message/edit/${id}`, payload),
  deleteMessage: (id: string) => api.delete(`/message/delete/${id}`),
  getMessage: (params: IResponseParams) => api.get('/message/', { params }),
  getMessageById: (id: string) => api.get(`/message/detail/${id}`),
};
