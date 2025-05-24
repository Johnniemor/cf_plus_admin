import warehouse from '@/api/warehouse';
import { IWareHouse } from '@/types/warehouse/ware_house';
import { useState } from 'react';

const useWarehouseHook = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createWareHouse = async (data: IWareHouse) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('contact', data.contact);
      if (data.logo) formData.append('logo', data.logo);

      const response = await warehouse.createWareHouse(formData);
      console.log('response ware house : ', response);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    createWareHouse,
    isLoading,
  };
};

export default useWarehouseHook;
