import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Table from '@/components/Table';
import TablePagination from '@/components/Table/Pagination';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import useCategoriesHook from '@/hooks/product/useCategoryHook';
import { iconAdd, iconFileOut } from '@/configs/icon';
import { TableAction } from '@/components/Table/TableAction';
import { categoryHeader } from './column/inventory';
import { formatUTCDate } from '@/utils/date_format';
import DefaultImage from '@/assets/logo/pepsi.jpg';
import { useTranslation } from 'react-i18next';
import { ROW_PER_PAGE } from '@/configs';
import { ITableSortConfig } from '@/types/table';

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { categories, isLoading, getCategory, queryParams, totalPages, deleteCategory, setQueryParams } =
    useCategoriesHook();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
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

      getCategory(newParams);
      return newParams;
    });
  };

  const getSortConfig = (): ITableSortConfig | undefined =>
    queryParams.sort_by
      ? { sortBy: queryParams.sort_by, sortType: (queryParams.sort_type || 'asc') as 'asc' | 'desc' }
      : undefined;

  const sortConfig = getSortConfig();

  const handlePageChange = (page: number) => {
    getCategory({ ...queryParams, page });
  };

  const handleRowPerpage = (limit: number) => {
    getCategory({ ...queryParams, limit });
  };

  const handleEdit = (id: string) => {
    navigate(`/product/category/edit/${id}`);
  };

  const openDeleteModal = (id: string) => {
    setSelectedCategoryId(id);
    setShowModal(true);
  };
  useEffect(() => {
    getCategory(queryParams);
  }, [queryParams.page, queryParams.limit]);

  return (
    <div className="w-full">
      {showModal && (
        <ConfirmModal
          textCancel="ຍົກເລີກ"
          textConfirm="ລົບຂໍ້ມູນ"
          show={showModal}
          setShow={setShowModal}
          message={t('product_category.message_delete_product', {
            productName: categories.find((item) => item._id === selectedCategoryId)?.name,
          })}
          handleConfirm={() => {
            deleteCategory(selectedCategoryId!);
            setShowModal(false);
          }}
        />
      )}

      <Table
        onSort={handleTableSort}
        sortConfig={sortConfig}
        className="pt-6"
        title={t('product_category.title_category')}
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
              onClick={() => navigate('/product/category/create')}
              children={<div className="text-sm font-normal md:text-base md:font-bold"> {t('btn_add_product')}</div>}
              icon={<div className="hidden sm:block">{iconAdd}</div>}
              className="rounded-xl bg-periwinkleblue"
            />
          </div>,
        ]}
        header={categoryHeader(t)}
        data={categories}
        body={
          <>
            {categories.map((category, index) => (
              <tr className="border-b border-gray-300" key={index}>
                <td className="p-4 text-black dark:text-white">{index + 1}</td>
                <td className="whitespace-nowrap p-4">
                  <img
                    className="h-14 w-14 rounded-full object-cover"
                    src={category.image ?? DefaultImage}
                    alt={category.name}
                  />
                </td>
                <td className="p-4 text-black dark:text-white">{category.name}</td>
                <td className="p-4 text-black dark:text-white">{category.description}</td>

                <td className="p-4 text-black dark:text-white">{formatUTCDate(false)}</td>

                <td className="p-4">
                  <TableAction onEdit={() => handleEdit(category._id)} onDelete={() => openDeleteModal(category._id)} />
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

export default CategoryPage;
