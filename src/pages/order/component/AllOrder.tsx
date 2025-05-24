import Table from '@/components/Table';
import { allOrderHeader } from '../column/OrderHeader';
import { useEffect, useState } from 'react';
import TablePagination from '@/components/Table/Pagination';
import { ActionButton } from './ActionButton';
import { OrderStatus, ROW_PER_PAGE } from '@/configs';
import NumberFormatter from '@/utils/format_number_util';
import ModalOrderDetail from './ModalDetail';
import useOrderHook from '@/hooks/order/useOrderHook';
import ColorState from './StatusColorStyle';
import Search from '@/components/Forms/Search';
import { t } from 'i18next';
import { ITableSortConfig } from '@/types/table';
import HeaderOrderComponent from './HeaderOrderComponent';

const AllOrder: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { getOrderHook, isLoading, order, queryParams, totalPages, setQueryParams } = useOrderHook();
  const [selectedOrderId, setSelectedOrderId] = useState('');

  const handlePageChange = (page: number) => {
    getOrderHook({ ...queryParams, page });
  };

  const handleRowPerpage = (limit: number) => {
    getOrderHook({ ...queryParams, limit });
  };

  useEffect(() => {
    getOrderHook(queryParams);
  }, [queryParams.page, queryParams.limit, queryParams.search, queryParams.status]);
  const handleSearchChange = (searchTerm: string) => {
    console.log('Search input:', searchTerm);
    setQueryParams((prev) => ({
      ...prev,
      search: searchTerm,
      page: 1,
      status: prev.status,
    }));
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
      {showModal && <ModalOrderDetail show={showModal} setShow={setShowModal} _id={selectedOrderId} />}
      <div className="w-full p-4 py-4 md:grid md:grid-cols-3">
      <Search
        type="small"
        name="search"
        placeholder={t('search')}
        className="rounded-xl bg-contains_mainly_blue p-4"
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      </div>
      <Table
        onSort={handleTableSort}
        sortConfig={sortConfig}
        className="pt-2"
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

export default AllOrder;
