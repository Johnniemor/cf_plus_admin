import Table from '@/components/Table';
import { groupHeader } from './column/Header';
import Button from '@/components/Button';
import { iconAdd } from '@/configs/icon';
import Search from '@/components/Forms/Search';
import { useNavigate } from 'react-router-dom';
import useGroupHook from '@/hooks/group/useGroupHook';
import TablePagination from '@/components/Table/Pagination';
import StatusBadge from '@/components/Status/StatusBage';
import { TableAction } from '@/components/Table/TableAction';
import { ITableSortConfig } from '@/types/table';
import { useEffect, useState } from 'react';
import ModalFeedImage from './component/ModalFeedImage';
import { useTranslation } from 'react-i18next';
import { ROW_PER_PAGE } from '@/configs';

const GroupPage: React.FC = () => {
  const navigate = useNavigate();
  const { totalPages, queryParams, isLoading, groups, getGroupHook, setQueryParams } = useGroupHook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const handlePageChange = (page: number) => {
    getGroupHook({ ...queryParams, page });
  };
  const handleSearchChange = (searchTerm: string) => {
    setQueryParams((prev) => ({ ...prev, search: searchTerm, page: 1 }));
  };
  const handleRowPerpage = (limit: number) => {
    getGroupHook({ ...queryParams, limit });
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

      getGroupHook(newParams);
      return newParams;
    });
  };

  const getSortConfig = (): ITableSortConfig | undefined =>
    queryParams.sort_by
      ? { sortBy: queryParams.sort_by, sortType: (queryParams.sort_type || 'asc') as 'asc' | 'desc' }
      : undefined;

  const sortConfig = getSortConfig();

  const handleEdit = (_id: string) => {
    navigate(`/group/update/${_id}`);
  };

  useEffect(() => {
    getGroupHook(queryParams);
  }, [queryParams.page, queryParams.limit, queryParams.search]);

  return (
    <div>
      <Table
        onSort={handleTableSort}
        sortConfig={sortConfig}
        className="pt-6"
        title={t('group.title_group')}
        headerAction={[
          <Button
            className="bg-blue rounded-lg"
            icon={iconAdd}
            children={t('group.btn_add_group')}
            onClick={() => navigate('/group/create')}
          />,
        ]}
        filterAction={[
          <div className="w-full py-4 md:grid md:grid-cols-3">
            <Search
              type="small"
              name="search"
              placeholder={t('search')}
              className="rounded-xl bg-contains_mainly_blue p-4"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>,
        ]}
        header={groupHeader(t)}
        data={groups}
        body={
          <>
            {groups.map((group, index) => (
              <tr
                onClick={() => navigate(`/group/detail/${group._id}`)}
                className="border-b border-gray-300"
                key={index}
              >
                <td className="p-4 text-black dark:text-white">{index + 1}</td>
                <td className="p-4 text-black dark:text-white">{group.name}</td>
                <td className="p-4 text-black dark:text-white">{group.description}</td>
                <td className="p-4 text-black dark:text-white">
                  <StatusBadge
                    status={`${group.available ? 'ເປິດ' : 'ປິດ'} `}
                    className={
                      group.available
                        ? 'w-[100px] rounded-full border-green-200 bg-green-50 py-2 text-center text-green-500'
                        : 'w-[100px] rounded-full border-red-200 bg-red-50 py-2 text-center text-red-500'
                    }
                  />
                </td>
                <td className="p-4 text-black dark:text-white">{new Date(group.start_at).toLocaleDateString()}</td>
                <td className="p-4 text-black dark:text-white">{new Date(group.expired_at).toLocaleDateString()}</td>
                <td className="p-4" onClick={(event) => event.stopPropagation()}>
                  <TableAction
                    onEdit={() => {
                      isLoading;
                      handleEdit(group._id);
                    }}
                  />
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
      <ModalFeedImage isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} groupId="" />
    </div>
  );
};

export default GroupPage;
