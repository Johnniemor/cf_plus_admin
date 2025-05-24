import api from '@/lib/axios';

export default {
  getNotification: () => api.get('/notification'),
  getNotificationById: (id: string) => api.get(`/notification/detail/${id}`),
  updateNotification: (ids: Array<string>) => api.put(`/notification/read`, ids),
  getUnreadNotification: () => api.get('/notification/count-unread'),
};
