import Table from '@/components/Table';
import { employeeHeaders } from './column/column';
import Button from '@/components/Button';
import { iconAdd } from '@/configs/icon';
import TablePagination from '@/components/Table/Pagination';
import { useNavigate } from 'react-router-dom';
import { TableAction } from '@/components/Table/TableAction';
import useStaffHook from '@/hooks/staff/useStaff';
import { useState } from 'react';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { useTranslation } from 'react-i18next';
import Search from '@/components/Forms/Search';
import { ROW_PER_PAGE } from '@/configs';
import { ITableSortConfig } from '@/types/table';

const Employee: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, staff, totalPages, queryParams, getStaffHook, deleteStaffHook, setQueryParams } = useStaffHook();
  const { t } = useTranslation();
  const handlePageChange = (page: number) => {
    getStaffHook({ ...queryParams, page });
  };

  const handleRowPerpage = (limit: number) => {
    getStaffHook({ ...queryParams, limit });
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const openDeleteModal = (id: string) => {
    setShowModal(true);
    setSelectedUnitId(id);
  };

  const handleEdit = (id: string) => [navigate(`/employee/update/${id}`)];

  const handleSearchChange = (searchTerm: string) => {
    setQueryParams((prev) => ({ ...prev, search: searchTerm, page: 1 }));
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

      getStaffHook(newParams);
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
        <ConfirmModal
          textCancel="ຍົກເລີກ"
          textConfirm="ລົບຂໍ້ມູນ"
          show={showModal}
          setShow={setShowModal}
          message={`ທ່ານຕ້ອງການລົບຫົວໜ່ວຍ: ${staff.find((item) => item.id === selectedUnitId)?.fullname || 'ບໍ່ມີຂໍ້ມູນ'} ອອກຈາກລະບົບບໍ່?`}
          handleConfirm={() => {
            deleteStaffHook(selectedUnitId!);
            setShowModal(false);
          }}
        />
      )}
      <Table
        onSort={handleTableSort}
        sortConfig={sortConfig}
        className="pt-6"
        title={t('employee.title_employee')}
        headerAction={[
          <Button
            onClick={() => {
              navigate('/employee/create');
            }}
            icon={iconAdd}
            className="bg-royalblue"
            children={t('employee.title_create_employee')}
          />,
        ]}
        filterAction={[
          <div className="grid w-full grid-cols-2 py-4">
            <div>
              <Search
                type="small"
                name="search"
                placeholder={t('search')}
                className="rounded-xl bg-contains_mainly_blue p-4"
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>,
        ]}
        header={employeeHeaders(t)}
        data={staff}
        body={
          <>
            {staff.map((emp, index) => (
              <tr className="border-b border-gray-300" key={index}>
                <td className="p-4 text-black dark:text-white">{index + 1}</td>
                <td className="p-4 text-black dark:text-white">{emp.fullname}</td>
                <td className="p-4 text-black dark:text-white">{emp.email}</td>
                <td className="p-4 text-black dark:text-white">{emp.role}</td>
                <td className="p-4 text-black dark:text-white">{emp.position}</td>
                <td className="p-4 text-black dark:text-white">
                  {emp.locked_at ? new Date(emp.locked_at).toLocaleDateString() : 'N/A'}
                </td>
                <td className="p-4 text-black dark:text-white">{new Date(emp.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  <TableAction
                    id={emp.id}
                    onEdit={() => {
                      handleEdit(emp.id);
                    }}
                    onDelete={() => openDeleteModal(emp.id)}
                  />
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

export default Employee;
