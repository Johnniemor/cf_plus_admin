import { useState } from 'react';
import { IOrderStatus } from '@/types/order/order';
import { OrderStatus } from '@/configs';
import useOrderHook from '@/hooks/order/useOrderHook';
import ModalOrderDetail from './ModalDetail';
import { toast } from 'react-toastify';
import TestState from './GobalManageState';

const SuccessfulDelivery: React.FC = () => {
  const { updateOrderStatus } = useOrderHook();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');

  const onUpdateOrder = async (data: IOrderStatus) => {
    try {
      if (selectedOrderId) {
        const orderItem: any = { _id: selectedOrderId };
        const res = await updateOrderStatus({
          ids: [orderItem._id],
          status: data.status,
        });
        setSelectedOrderId(res.data);
        toast.success('Order status updated successfully');
        setShowModal(false);
        return res;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {showModal && (
        <ModalOrderDetail
          show={showModal}
          setShow={setShowModal}
          _id={selectedOrderId}
          onCancel={() => {}}
          onSubmit={onUpdateOrder}
        />
      )}
      <TestState status={OrderStatus.Success} />
    </div>
  );
};

export default SuccessfulDelivery;
