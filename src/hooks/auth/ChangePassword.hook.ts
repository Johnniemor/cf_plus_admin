import user from '@/api/user';
import { IChangePassword } from '@/types/user';
import { useState } from 'react';
import { toast } from 'react-toastify';

const useChangePasswordHook = () => {
  const [loading, setLoading] = useState(false);

  const changePassword = async (data: IChangePassword) => {
    setLoading(true);
    try {
      const response = await user.changePassword(data);
      toast.success('change password is success');
      return response;
    } catch (error) {
      toast.error('change password is failed');
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    changePassword,
    loading,
  };
};

export default useChangePasswordHook;
