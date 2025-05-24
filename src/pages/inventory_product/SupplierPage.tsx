import Button from '@/components/Button';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import Table from '@/components/Table';
import TablePagination from '@/components/Table/Pagination';
import { TableAction } from '@/components/Table/TableAction';
import { iconAdd, iconFileOut } from '@/configs/icon';
import useSupplierHook from '@/hooks/product/useSuplierHook';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supplierHeaders } from './column/inventory';
import { useTranslation } from 'react-i18next';
import { ROW_PER_PAGE } from '@/configs';
import { ITableSortConfig } from '@/types/table';

const Supplier: React.FC = () => {
  const navigate = useNavigate();
  const { supplier, isLoading, getSupplier, queryParams, totalPages, deleteSupplier, setQueryParams } =
    useSupplierHook();

  const [showModal, setShowModal] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const { t } = useTranslation();

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

      getSupplier(newParams);
      return newParams;
    });
  };

  const getSortConfig = (): ITableSortConfig | undefined =>
    queryParams.sort_by
      ? { sortBy: queryParams.sort_by, sortType: (queryParams.sort_type || 'asc') as 'asc' | 'desc' }
      : undefined;

  const sortConfig = getSortConfig();

  const handlePageChange = (page: number) => {
    getSupplier({ ...queryParams, page });
  };

  const handleRowPerpage = (limit: number) => {
    getSupplier({ ...queryParams, limit });
  };

  const handleEdit = (id: string) => {
    navigate(`/product/supplier/edit/${id}`);
  };

  const openDeleteModal = (id: string) => {
    setSelectedSupplierId(id);
    setShowModal(true);
  };

  useEffect(() => {
    getSupplier(queryParams);
  }, [queryParams.page, queryParams.limit]);

  return (
    <div className="relative w-full">
      {showModal && (
        <ConfirmModal
          title="Do you want to edit?"
          textCancel="ຍົກເລີກ"
          textConfirm="ລົບຂໍ້ມູນ"
          show={showModal}
          setShow={setShowModal}
          message={t('product_supplier.message_delete_product', {
            productName: supplier.find((item) => item._id === selectedSupplierId)?.name,
          })}
          handleConfirm={() => {
            deleteSupplier(selectedSupplierId!);
            setShowModal(false);
          }}
        />
      )}
      <Table
        onSort={handleTableSort}
        sortConfig={sortConfig}
        className="pt-6"
        title={t('product_supplier.title_supplier')}
        headerAction={[
          <div key="actions" className="flex gap-4">
            <Button
              className="rounded-xl border-2 border-gray-300 bg-white text-periwinkleblue"
              children={
                <div className="text-sm font-normal text-periwinkleblue dark:text-periwinkleblue md:text-base md:font-bold">
                  {t('btn_export_data')}
                </div>
              }
              name="export"
              icon={<div className="hidden sm:block">{iconFileOut}</div>}
            />
            <Button
              onClick={() => navigate('/product/supplier/create')}
              children={
                <div className="text-sm font-normal md:text-base md:font-bold">
                  {t('product_supplier.btn_add_supplier')}
                </div>
              }
              icon={<div className="hidden sm:block">{iconAdd}</div>}
              className="rounded-xl bg-periwinkleblue"
            />
          </div>,
        ]}
        header={supplierHeaders(t)}
        data={supplier}
        body={supplier?.map((supplier, index) => (
          <tr className="border-b border-gray-300" key={index}>
            <td className="p-4 text-black dark:text-white">{supplier.email}</td>
            <td className="p-4 text-black dark:text-white">{supplier.name}</td>
            <td className="p-4 text-black dark:text-white">{supplier.contact_name}</td>
            <td className="p-4 text-black dark:text-white">{supplier.mobile_number}</td>
            <td className="p-4 text-black dark:text-white">{supplier.address}</td>
            <td className="p-4 text-black dark:text-white">{new Date(supplier.created_at).toLocaleString()}</td>
            <td className="p-4">
              <TableAction onEdit={() => handleEdit(supplier._id)} onDelete={() => openDeleteModal(supplier._id)} />
            </td>
          </tr>
        ))}
        loading={isLoading}
      >
        <TablePagination
          totalPages={totalPages}
          currentPage={queryParams.page}
          onPageChange={handlePageChange}
          options={ROW_PER_PAGE}
          rowsPerPage={queryParams.limit}
          onRowsPerPageChange={handleRowPerpage}
        />
      </Table>
    </div>
  );
};
export default Supplier;
