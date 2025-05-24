// src/hooks/useConnectFacebook.ts
import { useState, useEffect } from 'react';
import connect_facebook from '@/api/connect_facebook';
import { initFacebookSDK } from '@/utils/fb_connect';
import { IConnectFacebook, IConnectFacebookLogin } from '@/types/facebook/facebook';
import { IResponseParams } from '@/types/pagination';
import { FACEBOOK_APP_ID } from '@/configs';

const useConnectFacebookHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSDKInitialized, setIsSDKInitialized] = useState(false);
  const [connectedFB, setConnectedFB] = useState<IConnectFacebook[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [queryParams, setQueryParams] = useState<IResponseParams>({
    sort: 1,
    limit: 10,
    page: 1,
    search: '',
  });

  const getConnectedFacebook = async (query: IResponseParams) => {
    setIsLoading(true);
    try {
      const response = await connect_facebook.getConnectedFacebook(query);
      if (response.data) {
        setConnectedFB(response.data.data);
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

  const handleFacebookLogin = () => {
    return new Promise<IConnectFacebookLogin>((resolve, reject) => {
      if (!isSDKInitialized) {
        reject(new Error('Facebook SDK not initialized'));
        return;
      }
      window.FB.login(
        (response: any) => {
          if (response.authResponse) {
            const { accessToken, userID } = response.authResponse;
            resolve({ accessToken, userID });
          } else {
            reject(new Error('User cancelled login or did not fully authorize'));
          }
        },
        { scope: 'public_profile,email,pages_show_list,pages_manage_metadata' },
      );
    });
  };

  const connectFacebook = async () => {
    setIsLoading(true);
    try {
      const { accessToken, userID } = await handleFacebookLogin();

      const pageData: IConnectFacebook = {
        access_token: accessToken,
        f_account_id: userID,
      };

      const response = await connect_facebook.connectFacebook(pageData);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initSDK = async () => {
      try {
        const res = await initFacebookSDK(FACEBOOK_APP_ID);
        setIsSDKInitialized(true);
        return res;
      } catch (error) {
        throw error;
      }
    };
    initSDK();
    getConnectedFacebook(queryParams);
  }, []);

  return {
    connectFacebook,
    handleFacebookLogin,
    isLoading,
    isSDKInitialized,
    queryParams,
    getConnectedFacebook,
    totalPages,
    connectedFB,
  };
};

export default useConnectFacebookHook;
