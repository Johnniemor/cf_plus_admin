import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Button from '@/components/Button';
import Textarea from '@/components/Forms/Textarea';
import { iconArrowBack } from '@/configs/icon';
import useMessageHook from '@/hooks/message/useMessageHook';
import { IMessage } from '@/types/message/message';
import Table from '@/components/Table';
import { NoCFHeader } from '@/pages/no_cf/column/HeaderColumn';
import useGroupHook from '@/hooks/group/useGroupHook';
import TablePagination from '@/components/Table/Pagination';
import StatusBadge from '@/components/Status/StatusBage';

const MessagePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams();
  const { getMessageByIdHook, createMessageHook, message } = useMessageHook();
  const { queryParams, isLoading, getNoCFHook, noCf, totalPages } = useGroupHook();
  console.log('ID : ', id);
  console.log('NO CF : ', noCf);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IMessage>();

  useEffect(() => {
    const fetchMessage = async () => {
      if (id) {
        try {
          const response = await getMessageByIdHook(id);
          if (response?.data) {
            setValue('header', response.data.header ?? '');
            setValue('footer', response.data.footer ?? '');
          }
        } catch (error) {
          throw error;
        }
      }
    };

    fetchMessage();
  }, [id, setValue]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          console.log(queryParams);
          const response = await getNoCFHook({
            ...queryParams,
            page_id: id,
          });
          return response;
        } catch (error) {
          console.error('Error fetching message:', error);
        }
      }
    };

    fetchData();
  }, [id]);

  const onHandleSubmit = async (data: IMessage) => {
    try {
      const messageData: IMessage = {
        ...data,
        page_id: id ?? '',
      };
      const res = await createMessageHook(messageData);
      toast.success(t('message_created_successfully'));
      navigate(-1);
      return res;
    } catch (error: any) {
      toast.error(error.message || t('error_creating_message'));
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto rounded-lg bg-white p-4 dark:bg-boxdark">
      <div>
        <Button onClick={handleBack} className="mb-4 text-black" icon={iconArrowBack} shape="rounded">
          {t('btn_back')}
        </Button>
        <div className="gap-6p-8 flex flex-col md:flex-row">
          <div className="w-full md:w-[60%]">
            <h1 className="pb-6 text-2xl font-bold">Message</h1>
            <div>
              <form onSubmit={handleSubmit(onHandleSubmit)} className="space-y-4">
                <Textarea
                  name="header"
                  value={watch('header') || ''}
                  label={t('header')}
                  register={register}
                  errors={errors}
                  placeholder={t('header_placeholder')}
                />
                <Textarea
                  name="footer"
                  value={watch('footer') || ''}
                  label={t('footer')}
                  register={register}
                  errors={errors}
                  placeholder={t('footer_placeholder')}
                />
                <div className="flex gap-6">
                  <Button type="submit">{t('CreateMessage')}</Button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="w-full md:w-[40%] md:px-[94px]">
              <div className="h-full w-full rounded-lg border border-gray-400 bg-contains_mainly_blue p-6 text-[14px] md:w-[363px]">
                <header>
                  <h1 className="text-black">🙏 {message?.header ?? ''}</h1>
                </header>
                <div>
                  <h1 className="text-black">📦 {t('products')}:</h1>
                  <h4 className="text-black">{t('product_details')}</h4>
                  <h4 className="text-black">{t('total_amount')}</h4>
                  <h4 className="text-black">{t('shipping_cost')}</h4>
                  <h4 className="text-black">{t('grand_total')}</h4>
                  <h4 className="text-black">{t('shipping_details')}</h4>
                </div>
                <footer>
                  <h1 className="text-black">⏰ {message?.footer ?? ''}</h1>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div className="bg-white p-8 dark:bg-boxdark md:flex-row">
        <Table
          header={NoCFHeader}
          data={noCf}
          body={
            <>
              {noCf.map((no_cf, index) => (
                <tr className="border-b border-gray-300" key={index}>
                  <td className="p-4 text-black dark:text-white">
                    {<img src={no_cf.full_picture} className="h-16 w-16" alt="full_picture" />}
                  </td>
                  <td className="p-4 text-black dark:text-white">{no_cf.f_page_id}</td>
                  <td className="p-4 text-black dark:text-white">{no_cf.message}</td>
                  <td className="p-4 text-black dark:text-white">
                    {' '}
                    <StatusBadge
                      status={`${no_cf.available === true ? 'ເປິດ' : 'ປິດ'} `}
                      className={
                        no_cf.available === true
                          ? 'w-[100px] rounded-full border-green-200 bg-green-50 py-2 text-center text-green-500'
                          : 'w-[100px] rounded-full border-red-200 bg-red-50 py-2 text-center text-red-500'
                      }
                    />
                  </td>
                  <td className="p-4 text-black dark:text-white">{new Date(no_cf.created_at).toLocaleDateString()}</td>
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

export default MessagePage;
