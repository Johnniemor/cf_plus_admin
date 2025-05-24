// src/pages/ShopPage.tsx
import React, { useEffect, useState } from 'react';
import Table from '@/components/Table';
import { shopHeaders } from './column/Header';
import Button from '@/components/Button';
import TablePagination from '@/components/Table/Pagination';
import useConnectFacebookHook from '@/hooks/connect_facebook/connect_facebook';
import usePageHook from '@/hooks/page/usePageHook';
import StatusBadge from '@/components/Status/StatusBage';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { useNavigate } from 'react-router-dom';

const ShopPage: React.FC = () => {
  const { connectFacebook, isLoading } = useConnectFacebookHook();
  const { page, totalPages, queryParams, getPageHook, subScriptionHook, unSubScription } = usePageHook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    getPageHook(queryParams);
  }, []);

  const handleConnectFacebook = async () => {
    try {
      await connectFacebook();
      toast.success('connect with facebook success');
    } catch (error) {
      console.error('Failed to connect Facebook:', error);
    }
  };
  const toggleSubscription = async (id: string, isSubscribed: boolean) => {
    setIsSubmitting(true);
    try {
      let response;

      if (isSubscribed) {
        response = await unSubScription(id);
        if (response) {
          toast.success('Unsubscription successful');
        }
      } else {
        response = await subScriptionHook(id);
        if (response) {
          toast.success('Subscription successful');
        }
      }

      getPageHook(queryParams);
    } catch (error: any) {
      return toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenModal = (id: string) => {
    setSelectedSubId(id);
    setIsModalOpen(true);
  };

  const getSelectedPageName = () => {
    const selectedPage = page.find((item) => item.id === selectedSubId);
    return selectedPage?.subscript_webhook_at ? 'UnSubscription' : 'SubScription';
  };

  const isPageSubscribed = (id: string) => {
    return page.find((item) => item.id === id)?.subscript_webhook_at !== null;
  };

  const handleConfirm = async () => {
    if (!selectedSubId) return;

    setIsSubmitting(true);
    try {
      const isCurrentlySubscribed = isPageSubscribed(selectedSubId);
      await toggleSubscription(selectedSubId, isCurrentlySubscribed);
    } catch (error) {
      console.error('Error during subscription toggle:', error);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      {isModalOpen && (
        <ConfirmModal
          textCancel="ຍົກເລີກ"
          textConfirm="ຢືນຢັນ"
          show={isModalOpen}
          setShow={setIsModalOpen}
          message={`ທ່ານຕ້ອງການ: ${getSelectedPageName()} ຫຼື ບໍ່?`}
          handleConfirm={handleConfirm}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        />
      )}
      <div className="pt-6">
        <Table
          className="pt-6"
          title={t('manage_page_facebook.title_facebook')}
          headerAction={[
            <Button key="connect-fb" onClick={handleConnectFacebook}>
              {'Connect Facebook'}
            </Button>,
          ]}
          header={shopHeaders(t)}
          data={page}
          body={
            <>
              {page.map((page, index) => (
                <tr
                  className="border-b border-gray-300"
                  key={index}
                  onClick={() => {
                    navigate(`/page/message/${page.id}`);
                  }}
                >
                  <td className="p-4 text-black dark:text-white">{index + 1}</td>
                  <td className="p-4 text-black dark:text-white">
                    <img
                      className="h-14 w-14 rounded-full"
                      src={page.picture?.data?.url || '/src/assets/logo/default_img.png'}
                      alt="picture"
                    />
                  </td>
                  <td className="p-4 text-black dark:text-white">{page.name}</td>
                  <td className="p-4 text-black dark:text-white">{page.about}</td>
                  <td className="p-4 text-black dark:text-white">
                    {page.long_live_token_expired_at
                      ? new Date(page.long_live_token_expired_at).toLocaleDateString()
                      : '---'}
                  </td>
                  <td className="p-4 text-black dark:text-white">
                    <StatusBadge
                      status={`${page.available === true ? 'ເປິດ' : 'ປິດ'} `}
                      className={
                        page.available === true
                          ? 'w-[100px] rounded-full border-green-200 bg-green-50 py-2 text-center text-green-500'
                          : 'w-[100px] rounded-full border-red-200 bg-red-50 py-2 text-center text-red-500'
                      }
                    />
                  </td>
                  <td
                    className="p-4 text-black dark:text-white"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenModal(page.id);
                    }}
                  >
                    <StatusBadge
                      status={page.subscript_webhook_at ? 'SubScription' : 'UnSubScription'}
                      className={
                        page.subscript_webhook_at
                          ? 'w-full rounded-full border-green-200 bg-green-50 py-2 text-center text-green-500'
                          : 'w-full rounded-full border-red-200 bg-red-50 py-2 text-center text-red-500'
                      }
                    />
                  </td>
                  <td className="p-4 text-black dark:text-white">{new Date(page.created_at).toLocaleTimeString()}</td>
                </tr>
              ))}
            </>
          }
          loading={isLoading}
          children={<TablePagination totalPages={totalPages} currentPage={queryParams.page} onPageChange={() => {}} />}
        />
      </div>
    </div>
  );
};

export default ShopPage;
