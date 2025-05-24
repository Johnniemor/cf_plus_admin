import api from '@/lib/axios';
import { IEmail, ISetPassword, IVerityToken, IRegister } from '@/types/user';
import { IChangePassword, IUser } from '@/types/user';

export default {
  login: (payload: { username: string; password: string }) => api.post('/auth/login', payload),

  register: (payload: IRegister) => api.post('/auth/signup', payload),

  forgotPassword: (payload: IEmail) => api.post('/auth/forget-password', payload),

  resetPassword: (payload: ISetPassword) => api.post('/auth/reset-password', payload),

  verifyEmail: (payload: IVerityToken) => api.post(`/auth/verify-email`, payload),

  verifyResetPasswordToken: (payload: IVerityToken) => api.post('/auth/verify-reset-password-token', payload),

  resendEmail: (payload: IEmail) => api.post('/auth/resend-verification-account', payload),

  me: () => api.get('/me'),

  logout: () => api.delete('logout'),

  updateProfile: (payload: IUser | { avatar: null }) => api.put('/user/update-profile', payload),

  upload: (formData: FormData) => {
    const config = { headers: { 'content-type': 'multipart/form-data' } };
    return api.post('/user/upload-avatar', formData, config);
  },

  changePassword: (payload: IChangePassword) => api.put('/change-password', payload),
};
