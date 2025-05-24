import { ICreateStock } from '@/types/stock';
import api from '@/lib/axios';
import { IDateParam, IPaginatedResponse, IResponseParams } from '@/types/pagination';
export default {
  getStock: (params: IResponseParams) => {
    return api.get(`/import-product/`, {
      params,
    });
  },

  createStock: (payload: ICreateStock) => api.post('/import-product/create', payload),

  deleteStock: (ids: Array<string>) => api.put('/import-product/revers', ids),

  searchProduct: (params: { search: string }) => api.get(`/product`, { params }),

  searchProductById: (productId: string) => api.get(`/product/detail/${productId}`),
};

// export default {
//     crateStock : (payload: ICreateStock) => api.post('/import-product/create', payload),
//     deleteStock: (id: string) => api.delete(`/import-product/delete/${id}`),
//     searchProduct: (params:{search:string}) => api.get(`/product`, {params}),
//     searchProductById: (productId: string) => api.get(`/product/detail/${productId}`),
// }
