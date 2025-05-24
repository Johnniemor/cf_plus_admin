import { IConnectFacebook } from '@/types/facebook/facebook';
import api from '@/lib/axios';
import { IResponseParams } from '@/types/pagination';

export default {
  connectFacebook: (payload: IConnectFacebook) => api.post('/facebook/connect', payload),

  getConnectedFacebook: (params: IResponseParams) => api.get('/facebook/', { params }),
};
