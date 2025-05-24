import Table from '@/components/Table';
import { useTranslation } from 'react-i18next';
import { posOrderHeader } from './column/PosOrderHeader';
import usePosOrderHook from '@/hooks/pos_order/usePosOrder';
import { useEffect } from 'react';
import StatusBadge from '@/components/Status/StatusBage';
import Button from '@/components/Button';
import { iconAdd } from '@/configs/icon';
import { useNavigate } from 'react-router-dom';
import TablePagination from '@/components/Table/Pagination';
import { ROW_PER_PAGE } from '@/configs';
import { ITableSortConfig } from '@/types/table';

const PosOrderPage: React.FC = () => {
  const { t } = useTranslation();
  const { getAllPosOrder, posOrder, isLoading, queryParams, totalPages, setQueryParams } = usePosOrderHook();
  const navigate = useNavigate();
  useEffect(() => {
    getAllPosOrder(queryParams);
  }, [queryParams.page, queryParams.limit]);

  const handlePageChange = (page: number) => {
    getAllPosOrder({ ...queryParams, page });
  };
  const handleRowPerpage = (limit: number) => {
    getAllPosOrder({ ...queryParams, limit });
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

      getAllPosOrder(newParams);
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
      <Table
        onSort={handleTableSort}
        sortConfig={sortConfig}
        className="pt-6"
        title={t(t('pos_order.title_pos_order'))}
        headerAction={[
          <Button
            onClick={() => {
              navigate('/posOrder/create');
            }}
            icon={iconAdd}
            children={t('pos_order.btn_create_pos_order')}
          />,
        ]}
        header={posOrderHeader(t)}
        data={posOrder}
        body={
          <>
            {posOrder.map((pos_order, index) => (
              <tr
                onClick={() => {
                  navigate(`/posOrder/detail/${pos_order.pos_order_uid}`);
                }}
                className="border-b border-gray-300"
                key={index}
              >
                <td className="p-4 text-black dark:text-white">{pos_order.pos_order_uid}</td>
                {/* <td className="p-4 text-black dark:text-white">
                  <img
                    src={pos_order.created_by.avatar ?? 'src/assets/icon/facebook.png'}
                    className="h-[50px] w-[50px]"
                    alt=""
                  />
                </td> */}
                <td className="p-4 text-black dark:text-white">{pos_order.created_by.fullname}</td>
                {/* <td className="p-4 text-black dark:text-white">{pos_order.shipping}</td> */}
                <td className="p-4 text-black dark:text-white">{pos_order.count_item}</td>
                <td className="p-4 text-black dark:text-white">
                  {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'KIP' }).format(pos_order.grand_total)}
                </td>
                <td className="p-4 text-black dark:text-white">
                  <StatusBadge
                    status={pos_order.status ? 'success' : 'UnSubScription'}
                    className={
                      pos_order.status
                        ? 'w-full rounded-full border-green-200 bg-green-50 py-2 text-center text-green-500'
                        : 'w-full rounded-full border-red-200 bg-red-50 py-2 text-center text-red-500'
                    }
                  />
                </td>

                <td className="p-4 text-black dark:text-white">
                  {new Date(pos_order.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </>
        }
        loading={isLoading}
        children={
          <div>
            <TablePagination
              totalPages={totalPages}
              currentPage={queryParams.page}
              onPageChange={handlePageChange}
              rowsPerPage={queryParams.limit}
              options={ROW_PER_PAGE}
              onRowsPerPageChange={handleRowPerpage}
            />
          </div>
        }
      />
    </div>
  );
};

export default PosOrderPage;
