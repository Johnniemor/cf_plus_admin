import { IAddPost, IGroup, IProductGroup, IProductGroupAction, IUpdateProductGroup } from '@/types/group/group';
import { IResponseParams } from '@/types/pagination';
import api from '@/lib/axios';

export default {
  getGroup: (params: IResponseParams) => api.get('/setting-post/group', { params }),

  getGroupById: (_id: string) => api.get(`/setting-post/group/detail/${_id}`),

  createGroup: (payload: IGroup) => api.post('/setting-post/group/create', payload),

  updateGroup: (_id: string, payload: IGroup) => api.put(`/setting-post/group/edit/${_id}`, payload),

  updateGroupDetailProducts: (_id: string, payload: IProductGroup) =>
    api.put(`/setting-post/group/item/edit/${_id}`, payload),

  getGroupDetailProductById: (_id: string, group_id: string) =>
    api.get(`/setting-post/group/item/detail/${group_id}`, { params: { _id } }),

  addGroupProduct: (payload: IProductGroupAction) => api.put('/setting-post/group/item/add', payload),

  updateGroupProduct: (id: string, payload: IUpdateProductGroup) =>
    api.put(`/setting-post/group/item/edit/${id}`, payload),

  createPattern: (page_id: any) => api.post('/setting-post/group/set-pattern', page_id),

  getPattern: (page_id: any) => api.get('/setting-post/group/set-pattern', page_id),

  getNoCF: (params: IResponseParams) => api.get(`/setting-post/no-cfpost`, { params }),
};
