import { useState } from 'react';
import { IOrderStatus, IUpdateOrderStatus } from '@/types/order/order';
import useOrderHook from '@/hooks/order/useOrderHook';
import { OrderStatus } from '@/configs';
import { toast } from 'react-toastify';
import ModalOrderDetail from './ModalDetail';
import TestState from './GobalManageState';
import Search from '@/components/Forms/Search';

const PayAlready: React.FC = () => {
  const { updateOrderStatus , setQueryParams } = useOrderHook();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const onUpdateOrder = async (data: IUpdateOrderStatus) => {
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
      <TestState status={OrderStatus.Verified} />
    </div>
  );
};
export default PayAlready;
