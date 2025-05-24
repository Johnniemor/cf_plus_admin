import message_api from '@/api/message';
import { IMessage, IPayloadMessage } from '@/types/message/message';
import { IResponseParams } from '@/types/pagination';
import { useState } from 'react';

const useMessageHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState<IMessage>({
    header: '',
    footer: '',
  } as IMessage);

  const [queryParams, setQueryParams] = useState<IResponseParams>({
    sort: 1,
    limit: 10,
    page: 1,
    search: '',
    page_id: '67cab024aaf2e6c141ef405a',
  });

  const getMessageHook = async (query: IResponseParams) => {
    try {
      const response = await message_api.getMessage(query);
      console.log('getMessage hook : ', response);
      if (response.data) {
        setMessage(response.data.data);
        setQueryParams({
          page: response.data.currentPage,
          limit: query.limit,
          search: query.search,
          page_id: query.page_id,
        });
        setTotalPages(response.data.countPage);
      }
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getMessageByIdHook = async (id: string) => {
    try {
      const response = await message_api.getMessageById(id);
      setMessage(response.data);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createMessageHook = async (data: IMessage) => {
    try {
      const response = await message_api.createMessage(data);
      console.log('response create message : ', response);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMessageHook = async (id: string, data: IMessage) => {
    try {
      const response = await message_api.editMessage(id, data);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMessageHook = async (id: string) => {
    try {
      const response = await message_api.deleteMessage(id);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    setIsLoading,
    totalPages,
    queryParams,
    getMessageByIdHook,
    createMessageHook,
    message,
    updateMessageHook,
    getMessageHook,
  };
};
export default useMessageHook;
