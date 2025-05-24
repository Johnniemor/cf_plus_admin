import { useState } from 'react';
import useOrderHook from '@/hooks/order/useOrderHook';
import { IOrderStatus } from '@/types/order/order';
import { OrderStatus } from '@/configs';
import { toast } from 'react-toastify';
import ModalOrderDetail from './ModalDetail';
import TestState from './GobalManageState';

const PackProduct: React.FC = () => {
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
      <TestState status={OrderStatus.Packed} />
    </div>
  );
};

export default PackProduct;
