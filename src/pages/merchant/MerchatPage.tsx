import Table from '@/components/Table';
import useMerchantHook from '@/hooks/merchant/useMerchant';
import { useEffect } from 'react';
import { merchantHeader } from './column/Header';
import { TableAction } from '@/components/Table/TableAction';
import Button from '@/components/Button';
import { iconAdd, iconEdit, iconHome, IconsMerchant } from '@/configs/icon';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TablePagination from '@/components/Table/Pagination';
import { ROW_PER_PAGE } from '@/configs';
import { ITableSortConfig } from '@/types/table';

const MerchantPage: React.FC = () => {
  const { merchant, getMerchantHook, queryParams, totalPages, setQueryParams } = useMerchantHook();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getMerchantHook(queryParams);
  }, [queryParams.page, queryParams.limit]);

  const handleCreate = () => {
    navigate('/merchant/create');
  };
  const handleEdit = (_id: string) => {
    navigate(`/merchant/edit/:${_id}`);
  };
  const handleInventory = (id: string) => {
    navigate(`/inventory/${id}`);
  };
  const handlePageChange = (page: number) => {
    getMerchantHook({ ...queryParams, page });
  };

  const handleRowPerpage = (limit: number) => {
    getMerchantHook({ ...queryParams, limit });
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

      getMerchantHook(newParams);
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
        title={t('merchant.title_merchant')}
        headerAction={[
          <Button
            children={t('merchant.btn_create_merchant')}
            onClick={handleCreate}
            icon={iconAdd}
            className="bg-royalblue"
          />,
        ]}
        header={merchantHeader(t)}
        data={merchant}
        body={
          <>
            {merchant.map((merchant, index) => (
              <tr className="border-b border-gray-300" key={index}>
                <td className="p-4 text-black dark:text-white">{index + 1}</td>
                <td className="p-4 text-black dark:text-white">
                  <img className="h-20 w-20 rounded-full" src={merchant.avatar} alt="avatar" />
                </td>
                <td className="p-4 text-black dark:text-white">{merchant.name}</td>
                <td className="p-4 text-black dark:text-white">{merchant.address}</td>
                <td className="p-4 text-black dark:text-white">{merchant.mobile_number}</td>
                <td className="p-4 text-black dark:text-white">{merchant.is_open ? 'ເປີດ' : 'ປິດ'}</td>
                <td className="p-4 text-black dark:text-white">{new Date(merchant.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  <button onClick={() => handleEdit(merchant._id)}>{iconEdit}</button>
                  <button onClick={() => handleInventory(merchant._id)}>
                    <div className="w-6 rounded-full text-red-600">{IconsMerchant}</div>
                  </button>
                </td>
              </tr>
            ))}
          </>
        }
        loading={false}
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

export default MerchantPage;
