import Button from '@/components/Button';
import { iconCancel } from '@/configs/icon';
import { useForm } from 'react-hook-form';
import Input from '@/components/Forms/Input';
import { useEffect, useState } from 'react';
import { IOrderdetail, IUpdateOrderDetail } from '@/types/order/order';
import useOrderHook from '@/hooks/order/useOrderHook';
import Loader from '@/components/Common/Loader';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface UpdateDetailModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  order?: any;
  _id: string;
}

export default function UpdateDetailModal({ show, setShow, order, _id }: UpdateDetailModalProps) {
  const [orderDetail, setOrderDetail] = useState<IOrderdetail | null>(null);
  const { getOrderById, isLoading, updateOrderDetail } = useOrderHook();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateOrderDetail>();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getOrderById(_id);
      setOrderDetail(data);
      const temp = {
        id: _id,
        bank: data.order.bank,
        reference_code: data.order.reference_code,
        shipping: data.order.shipping,
        shipping_address: data.order.shipping_address,
        slip_timestamps: data.order.slip_timestamps,
      };
      reset(temp);
      return {
        id: _id,
        bank: data.order.bank,
        reference_code: data.order.reference_code,
        shipping: data.order.shipping,
        shipping_address: data.order.shipping_address,
        slip_timestamps: data.order.slip_timestamps,
      };
    };
    fetchData();
  }, [reset]);

  const handleClose = () => {
    setShow(false);
  };

  const handleFormSubmit = async (data: IUpdateOrderDetail) => {
    try {
      setIsSubmitting(true);
      const formatData: any = {
        id: _id,
        bank: data.bank,
        shipping: data.shipping,
        shipping_address: data.shipping_address,
        slip_timestamps: data.slip_timestamps,
      };

      if (orderDetail?.order.reference_code !== data.reference_code) {
        formatData.reference_code = data.reference_code;
      }

      const response = await updateOrderDetail(formatData);
      if (response) {
        handleClose();
      }
      return response;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div>
      <div className="fixed inset-0 z-999999 flex items-center justify-center bg-black bg-opacity-50 px-6">
        {(isLoading || isSubmitting) && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Loader />
          </div>
        )}
        <div className="w-[700px] rounded-lg bg-white p-6 shadow-lg dark:bg-boxdark">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
              {t('cf_order_detail.update_order_detail')}
            </h2>
            <button
              className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              onClick={handleClose}
            >
              <div className="text-royalblue dark:text-white">{iconCancel}</div>
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="">
              <div className="py-2">
                <Input label={t('cf_order_detail.bank')} name={'bank'} register={register} errors={errors} />
              </div>
              <div className="py-2">
                <Input
                  label={t('cf_order_detail.reference_code')}
                  name={'reference_code'}
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="py-2">
                <Input label={t('cf_order_detail.shipping')} name={'shipping'} register={register} errors={errors} />
              </div>
              <div className="py-2">
                <Input
                  label={t('cf_order_detail.shipping_address')}
                  name={'shipping_address'}
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="py-2">
                <Input
                  label={t('cf_order_detail.date')}
                  name={'slip_timestamps'}
                  type="date"
                  register={register}
                  errors={errors}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <Button
                type="button"
                className="cursor-pointer bg-gray-300 text-gray-700 hover:bg-gray-400"
                onClick={handleClose}
                disabled={isLoading || isSubmitting}
              >
                {t('btn_cancel')}
              </Button>
              <Button
                type="submit"
                className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                disabled={isLoading || isSubmitting}
              >
                {isSubmitting ? `${t('cf_order_detail.btn_save')}` : `${t('cf_order_detail.btn_save_change')}`}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
