import Button from '@/components/Button';
import { iconCancel } from '@/configs/icon';
import { useEffect, useState } from 'react';
import useOrderHook from '@/hooks/order/useOrderHook';
import { IOrderdetail, IUpdateOrderStatus } from '@/types/order/order';
import NumberFormatter from '@/utils/format_number_util';
import Select from '@/components/Forms/Select';
import { useForm } from 'react-hook-form';
import { getNextStatuses, OrderStatus } from '@/configs';
import UpdateDetailModal from './ModalUpdateDetail';
import Loader from '@/components/Common/Loader';
import ModalSlip from './ModalSlip';
import { useTranslation } from 'react-i18next';

interface PropOrder {
  show: boolean;
  setShow: any;
  _id: string;
  onCancel?: () => void;
  onSubmit?: (data: IUpdateOrderStatus) => void;
}

export default function ModalOrderDetail({ setShow, _id, onCancel, onSubmit }: PropOrder) {
  const { getOrderById, isLoading } = useOrderHook();
  const [orderDetail, setOrderDetail] = useState<IOrderdetail | null>(null);
  const [status, setStatus] = useState('');
  const { control, handleSubmit } = useForm<IUpdateOrderStatus>();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showSlip, setShowSlip] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fectData = async () => {
      const res = await getOrderById(_id);
      setOrderDetail(res.data);
      setStatus(res.data.order.status);
    };
    fectData();
  }, [_id]);

  const handleFormSubmit = (data: IUpdateOrderStatus) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  const handleUpdateDetailClick = () => {
    setShowUpdateModal(true);
  };
  const handleShowSlip = () => {
    setShowSlip(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-9999 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 px-6 pt-20 outline-none">
        {isLoading && (
          <div className="absolute inset-0 z-99999 flex items-center justify-center">
            <Loader />
          </div>
        )}
        <div className="relative mx-auto my-6 max-h-screen w-[1200px] max-w-full">
          <div className="relative z-10 flex w-full flex-col rounded-xl border border-stroke bg-white shadow-default outline-none focus:outline-none dark:border-strokedark dark:bg-boxdark">
            <div className="flex justify-between border-b-2 border-gray-300 p-4 pb-4">
              <h1 className="text-xl font-bold text-gray-600 dark:text-white">{t('cf_order.title_detail')}</h1>
              <button onClick={() => setShow(false)}>
                <div className="text-royalblue dark:text-white">{iconCancel}</div>
              </button>
            </div>

            {/* {isLoading ? (
              <div className="p-4 text-center dark:text-white">
                <LoadingProgressBar />
              </div>
            ) : ( */}
            <>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                  <div>
                    <p className="py-2 dark:text-white">
                      {t('cf_order.label_order_number')}: {orderDetail?.order.cf_order_uid}
                    </p>
                    <p className="py-2 dark:text-white">
                      {t('cf_order.label_order_number')}: {orderDetail?.order.facebook_customer_id.display_name}
                    </p>
                    <div className="flex py-2 dark:text-white">
                      {t('cf_order.label_status')} :{' '}
                      {status === 'cancel' ? (
                        <div> &emsp;{orderDetail?.order.status}</div>
                      ) : (
                        <div className="w-[200px] px-4">
                          <Select
                            label=" "
                            name="status"
                            control={control}
                            options={getNextStatuses(orderDetail?.order.status as OrderStatus).map((status) => ({
                              value: status,
                              label: status,
                            }))}
                          />
                        </div>
                      )}
                    </div>
                    <p className="py-2 dark:text-white">
                      {' '}
                      {t('cf_order.label_delivery')}: {'Hong r loun'}
                    </p>
                    <p className="py-2 dark:text-white">
                      {t('cf_order.label_slip')}:{' '}
                      <Button
                        variant="success"
                        disabled={isLoading}
                        onClick={handleShowSlip}
                        children={<h1> {t('cf_order.btn_view_proof_of_transfer')}</h1>}
                      />
                    </p>
                  </div>
                  <div>
                    <p className="py-2 dark:text-white">
                      {t('cf_order.label_recipient_is_name')}: {orderDetail?.order.facebook_customer_id.display_name}
                    </p>
                    <p className="py-2 dark:text-white">
                      {' '}
                      {t('cf_order.label_address')}: {orderDetail?.order.facebook_customer_id.shipping}
                    </p>
                    <p className="py-2 dark:text-white">
                      {t('cf_order.label_phone_number')}: {orderDetail?.order.facebook_customer_id.mobile_number}
                    </p>
                    <p className="py-2 dark:text-white">
                      {t('cf_order.label_item_number')}: {orderDetail?.order._id}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end px-6 pb-6">
                  <Button onClick={handleUpdateDetailClick} disabled={isLoading}>
                    {t('cf_order.btn_update_order')}
                  </Button>
                </div>
                <div className="border-t-2 border-gray-200">
                  <div className="divide-y divide-gray-200">
                    <div className="overflow-x-auto">
                      <div className="min-w-[700px]">
                        <div className="grid grid-cols-7 items-center border-b-2 border-gray-200 px-4 py-3">
                          <h1 className="text-sm font-medium text-gray-600 dark:text-white">
                            {' '}
                            {t('cf_order.label_product_name')}
                          </h1>
                          <h1 className="text-sm font-medium text-gray-600 dark:text-white">
                            {' '}
                            {t('cf_order.label_cf_id')}
                          </h1>
                          <h1 className="text-sm font-medium text-gray-600 dark:text-white">
                            {' '}
                            {t('cf_order.label_image')}
                          </h1>
                          <h1 className="text-sm font-medium text-gray-600 dark:text-white">
                            {' '}
                            {t('cf_order.label_quantity')}
                          </h1>
                          <h1 className="text-sm font-medium text-gray-600 dark:text-white">
                            {' '}
                            {t('cf_order.label_unit')}
                          </h1>
                          <h1 className="text-sm font-medium text-gray-600 dark:text-white">
                            {' '}
                            {t('cf_order.label_total')}
                          </h1>
                        </div>

                        {orderDetail?.orderItems.map((item, index) => (
                          <div key={index} className="grid grid-cols-7 items-center border-b-2 border-gray-200 px-4">
                            <h1 className="text-sm font-medium text-gray-600 dark:text-white">{item.product.name}</h1>
                            <h1 className="text-sm font-medium text-gray-600 dark:text-white">
                              {item.product.cf_code}
                            </h1>
                            <div>
                              <img src={item.product.photos?.toString()} className="h-20 w-20" />
                            </div>
                            <h1 className="text-sm text-gray-600 dark:text-white">{item.quantity}</h1>
                            <h1 className="text-sm text-gray-600 dark:text-white">{item.unit.name}</h1>
                            <h1 className="text-sm text-gray-600 dark:text-white">
                              {NumberFormatter(item.product.online_price * item.quantity)}
                            </h1>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid justify-end p-4">
                  <h1>
                    {t('cf_order.label_quantity')}:{' '}
                    {orderDetail?.orderItems.reduce((total, item) => total + item.quantity, 0)}
                  </h1>
                  <h1>
                    {t('cf_order.label_total')}: {orderDetail?.order.grand_total}
                  </h1>
                </div>

                <div className="flex justify-end gap-4 border-t-2 border-gray-300 p-4">
                  {onCancel && (
                    <Button className="bg-red-500" onClick={() => setShow(false)} disabled={isLoading}>
                      {t('btn_cancel')}
                    </Button>
                  )}
                  {onSubmit && (
                    <Button className="px-14" type="submit" disabled={isLoading}>
                      {t('btn_verify')}
                    </Button>
                  )}
                </div>
              </form>
            </>
            {/* )} */}
          </div>
        </div>
      </div>
      {showUpdateModal && (
        <UpdateDetailModal
          show={showUpdateModal}
          setShow={setShowUpdateModal}
          order={orderDetail?.order._id}
          _id={_id}
        />
      )}
      {showSlip && (
        <ModalSlip
          show={showSlip}
          setShow={setShowSlip}
          image={orderDetail?.order.slip ?? '/src/assets/slip_transaction.png'}
        />
      )}
    </>
  );
}
