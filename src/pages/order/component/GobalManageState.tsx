import Table from '@/components/Table';
import { allOrderHeader } from '../column/OrderHeader';
import StatusBadge from '@/components/Status/StatusBage';
import TablePagination from '@/components/Table/Pagination';
import { useEffect, useState } from 'react';
import { ActionButton } from './ActionButton';
import useOrderHook from '@/hooks/order/useOrderHook';
import { OrderStatus, ROW_PER_PAGE } from '@/configs';
import NumberFormatter from '@/utils/format_number_util';
import ModalOrderDetail from './ModalDetail';
import { toast } from 'react-toastify';
import { IOrderStatus } from '@/types/order/order';
import ColorState from './StatusColorStyle';
import { useTranslation } from 'react-i18next';
import { ITableSortConfig } from '@/types/table';

interface propData {
  status: OrderStatus;
}

const TestState: React.FC<propData> = ({ status }) => {
  const { getOrderHook, order, queryParams, totalPages, isLoading, updateOrderStatus, setQueryParams } = useOrderHook();
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const { t } = useTranslation();
  const handlePageChange = (page: number) => {
    getOrderHook({ ...queryParams, page });
  };

  const handleRowPerpage = (limit: number) => {
    getOrderHook({ ...queryParams, limit });
  };

  useEffect(() => {
    getOrderHook({ ...queryParams, status: status });
  }, [queryParams.page, queryParams.limit, queryParams.search]);

  const onUpdateOrder = async (data: IOrderStatus) => {
    try {
      if (selectedOrderId) {
        const orderItem: any = { _id: selectedOrderId };
        const res = await updateOrderStatus({
          ids: [orderItem._id],
          status: data.status,
        });

        toast.success('Order status updated successfully');
        setShowModal(false);

        getOrderHook({ ...queryParams, status: status });
        return res;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleTableSort = (id: string) => {
    setQueryParams((prev) => {
      const isSameColumn = prev.sort_by === id;
      const newSortType: 'asc' | 'desc' = isSameColumn && prev.sort_type === 'asc' ? 'desc' : 'asc';

      const newParams = {
        ...prev,
        sort: 1,
        sort_by: id,
        sort_type: newSortType,
        page: 1,
      };

      getOrderHook(newParams);
      return newParams;
    });
  };

  const getSortConfig = (): ITableSortConfig | undefined =>
    queryParams.sort_by
      ? { sortBy: queryParams.sort_by, sortType: (queryParams.sort_type || 'asc') as 'asc' | 'desc' }
      : undefined;

  const sortConfig = getSortConfig();

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
      <Table
        sortConfig={sortConfig}
        onSort={handleTableSort}
        header={allOrderHeader(t)}
        data={order}
        body={
          <>
            {order.map((order, index) => (
              <tr className="border-b border-gray-300" key={index}>
                <td className="p-4 text-black dark:text-white">{order.cf_order_uid}</td>
                <td className="p-4 text-black dark:text-white">{order.facebook_customer_id.display_name}</td>
                <td className="p-4 text-black dark:text-white">{new Date(order.created_at).toLocaleString()}</td>
                <td className="p-4 text-black dark:text-white">{NumberFormatter(order.grand_total)}</td>
                <td className="p-4 text-black dark:text-white">{order.shipping}</td>
                <td className="p-4 text-black dark:text-white">
                  {
                    <a
                      id={order._id}
                      onClick={() => {
                        setSelectedOrderId(order._id);
                        setShowModal(true);
                      }}
                    >
                      <ColorState status={order.status} />
                    </a>
                  }
                </td>
                <td className="p-4 text-black dark:text-white">{order.note}</td>
                <td className="p-4 text-black dark:text-white">{new Date(order.created_at).toLocaleString()}</td>
                <td className="p-4">
                  <ActionButton onNotification={() => {}} onDelete={() => {}} id={''} />
                </td>
              </tr>
            ))}
          </>
        }
        loading={isLoading}
        children={
          <TablePagination
            totalPages={totalPages}
            currentPage={queryParams.page}
            onPageChange={handlePageChange}
            rowsPerPage={queryParams.limit}
            options={ROW_PER_PAGE}
            onRowsPerPageChange={handleRowPerpage}
          />
        }
      />
    </div>
  );
};
export default TestState;
