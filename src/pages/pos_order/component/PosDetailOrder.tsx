import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import usePosOrderHook from '@/hooks/pos_order/usePosOrder';
import { IGetPosOrderDetail } from '@/types/pos_order/pos_order';
import Table from '@/components/Table';
import { posOrderDetailHeader } from '../column/PosOrderHeader';
import Button from '@/components/Button';
import { iconArrowBack } from '@/configs/icon';

const PosDetail: React.FC = () => {
  const { getPosOrderById, isLoading } = usePosOrderHook();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [posOrder, setPosOrder] = useState<IGetPosOrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosOrder = async () => {
      if (!id) {
        setError('Order ID is required');
        return;
      }

      try {
        const response = await getPosOrderById(id);
        setPosOrder(response.data);
      } catch (error) {
        console.error('Error fetching POS order:', error);
        setError('Failed to fetch order details');
      }
    };

    fetchPosOrder();
  }, [id]);

  const renderTableBody = () => {
    return posOrder?.order_items.map((item, index) => (
      <tr key={index} className="border-b border-gray-300 hover:bg-gray-100">
        <td className="p-4 text-black dark:text-white">
          {<img src={item.product_id.photos?.toString()} alt="photos" className="h-16 w-16" />}
        </td>
        <td className="p-4 text-black dark:text-white">{item.product_id.name}</td>
        <td className="p-4 text-black dark:text-white">{item.product_id.descriptions}</td>
        <td className="p-4 text-black dark:text-white">
          {item.price.toLocaleString('LAK', { style: 'currency', currency: 'LAK' })}
        </td>
        <td className="p-4 text-black dark:text-white">{item.product_id.currency ?? 'LAK'}</td>
        <td className="p-4 text-black dark:text-white">{item.quantity}</td>
        <td className="p-4 text-black dark:text-white">
          {item.price.toLocaleString('LAK', { style: 'currency', currency: 'LAK' })}
        </td>
        <td className="p-4 text-black dark:text-white">{item.product_id.unit_id.name}</td>
      </tr>
    ));
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="border-b-2 border-gray-300 pb-6">
        <Button
          variant="info"
          onClick={() => navigate(-1)}
          className="text-black"
          icon={iconArrowBack}
          shape="rounded"
          children={t('btn_back')}
        />
      </div>
      <Table
        filterAction={[
          <div className="pb-6">
            <h1>Name : {posOrder?.order.created_by.fullname}</h1>
            <h1> Date : {new Date(posOrder?.order.created_at ?? '').toLocaleDateString()}</h1>
            <h1> Slip : {posOrder?.order.slip_timestamps ?? 'N/A'}</h1>
            <h1>Total : {posOrder?.order.grand_total}</h1>
          </div>,
        ]}
        title={t('Order Details')}
        header={posOrderDetailHeader(t)}
        data={posOrder?.order_items || []}
        body={renderTableBody()}
        loading={isLoading}
        children={undefined}
      />
    </div>
  );
};

export default PosDetail;
