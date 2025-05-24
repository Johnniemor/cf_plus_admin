import page_api from '@/api/page';
import { IAddPost } from '@/types/group/group';
import { IMessage } from '@/types/message/message';
import { IGetFeed, IPage } from '@/types/page/page';
import { IResponseParams } from '@/types/pagination';
import { useState } from 'react';
import { toast } from 'react-toastify';

const usePageHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPageGroup] = useState<IPage[]>([]);
  const [feed, setFeed] = useState<IGetFeed[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  const [queryParams, setQueryParams] = useState<IResponseParams>({
    sort: 1,
    limit: 10,
    page: 1,
    search: '',
  });

  const getPageHook = async (query: IResponseParams) => {
    setIsLoading(true);
    try {
      const response = await page_api.getPage(query);
      if (response.data) {
        setPageGroup(response.data.data);
        setQueryParams({
          page: response.data.currentPage,
          limit: query.limit,
          search: query.search,
        });
        setTotalPages(response.data.countPage);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getFeedHook = async (query: IResponseParams, page_id: string) => {
    if (!page_id) return;
    setIsLoading(true);
    try {
      const response = await page_api.getFeed({ ...query, page_id: page_id });
      if (response.data) {
        setSelectedPageId(page_id);
        setFeed(response.data.data);
        setQueryParams({
          ...query,
          page_id: page_id,
        });
      }
    } catch (error) {
      toast.error('ເພສຖືກປີດໃຊ້ງານຢູ່ ບໍ່ສາມາດເຂົ້າເຖີງໄດ້ ກະລຸນາເລືອກເພສໃໝ່');
    } finally {
      setIsLoading(false);
    }
  };

  const createPostHook = async (data: IAddPost) => {
    setIsLoading(true);
    try {
      const response = await page_api.createPost(data);
      await getPageHook(queryParams);
      setIsLoading(false);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const subScriptionHook = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await page_api.subScription(id);
      getPageHook(queryParams);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const unSubScription = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await page_api.unSubScription(id);
      getPageHook(queryParams);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getMessageByIdHook = async (query: IResponseParams) => {};

  const getMessgaeByIdHook = async (id: string) => {
    try {
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const createMessageHook = async (data: IMessage) => {};

  const updateMessageHook = async (id: string, data: IMessage) => {};

  const deleteMessageHook = async (id: string) => {};

  return {
    isLoading,
    setIsLoading,
    page,
    feed,
    totalPages,
    queryParams,
    getPageHook,
    getFeedHook,
    selectedPageId,
    setFeed,
    setSelectedPageId,
    createPostHook,
    subScriptionHook,
    unSubScription,
  };
};
export default usePageHook;
