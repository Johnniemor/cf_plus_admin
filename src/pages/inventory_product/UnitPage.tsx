import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Table from '@/components/Table';
import TablePagination from '@/components/Table/Pagination';
import { iconAdd, iconFileOut } from '@/configs/icon';
import useUnitHook from '@/hooks/product/useUnitHook';
import { TableAction } from '@/components/Table/TableAction';
import { unitHeaders } from './column/inventory';
import { formatUTCDate } from '@/utils/date_format';

import { useTranslation } from 'react-i18next';
import { ROW_PER_PAGE } from '@/configs';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { ITableSortConfig } from '@/types/table';

const UnitPage: React.FC = () => {
  const navigate = useNavigate();
  const { units, isLoading, getUnit, queryParams, totalPages, deleteUnit, setQueryParams } = useUnitHook();
  const [showModal, setShowModal] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const { t } = useTranslation();

  const handlePageChange = (page: number) => {
    getUnit({ ...queryParams, page });
  };
  const handleRowPerpage = (limit: number) => {
    getUnit({ ...queryParams, limit });
  };

  const handleEdit = (id: string) => {
    navigate(`/product/units/edit/${id}`);
  };

  const openDeleteModal = (id: string) => {
    setShowModal(true);
    setSelectedUnitId(id);
  };

  useEffect(() => {
    getUnit(queryParams);
  }, [queryParams.page, queryParams.limit]);

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

      getUnit(newParams);
      return newParams;
    });
  };

  const getSortConfig = (): ITableSortConfig | undefined =>
    queryParams.sort_by
      ? { sortBy: queryParams.sort_by, sortType: (queryParams.sort_type || 'asc') as 'asc' | 'desc' }
      : undefined;

  const sortConfig = getSortConfig();

  return (
    <div className="relative w-full">
      {showModal && (
        <ConfirmModal
          textCancel="ຍົກເລີກ"
          textConfirm="ລົບຂໍ້ມູນ"
          show={showModal}
          setShow={setShowModal}
          message={t('product_unit.message_delete_product', {
            productName: units.find((item) => item._id === selectedUnitId)?.name,
          })}
          handleConfirm={() => {
            deleteUnit(selectedUnitId!);
            setShowModal(false);
          }}
        />
      )}

      <Table
        onSort={handleTableSort}
        sortConfig={sortConfig}
        className="pt-6"
        title={t('product_unit.title_unit')}
        headerAction={[
          <div key={'units'} className="flex gap-4">
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
              onClick={() => navigate('/product/units/create')}
              children={
                <div className="text-sm font-normal md:text-base md:font-bold">{t('product_unit.btn_add_unit')}</div>
              }
              icon={<div className="hidden sm:block">{iconAdd}</div>}
              className="rounded-xl bg-periwinkleblue"
            />
          </div>,
        ]}
        header={unitHeaders(t)}
        data={units}
        body={
          <>
            {units.map((unit, index) => (
              <tr className="border-b border-gray-300" key={index}>
                <td className="p-4 text-black dark:text-white">{index + 1}</td>
                <td className="p-4 text-black dark:text-white">{unit.name}</td>
                <td className="p-4 text-black dark:text-white">{unit.description}</td>
                <td className="p-4 text-black dark:text-white">{unit.amount}</td>
                <td className="p-4 text-black dark:text-white">{formatUTCDate(false)}</td>

                <td className="p-4">
                  <TableAction onEdit={() => handleEdit(unit._id)} onDelete={() => openDeleteModal(unit._id)} />
                </td>
              </tr>
            ))}
          </>
        }
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

export default UnitPage;
