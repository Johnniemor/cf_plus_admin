import Button from '@/components/Button';
import Search from '@/components/Forms/Search';
import Select from '@/components/Forms/Select';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import StatusBadge from '@/components/Status/StatusBage';
import Table from '@/components/Table';
import TablePagination from '@/components/Table/Pagination';
import { TableAction } from '@/components/Table/TableAction';
import { iconAdd, iconCopy, iconFileOut } from '@/configs/icon';
import useProductHook from '@/hooks/product/useProductHook';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { productHeader } from './column/inventory';
import { toast } from 'react-toastify';
import useCategoriesHook from '@/hooks/product/useCategoryHook';
import useSupplierHook from '@/hooks/product/useSuplierHook';
import useUnitHook from '@/hooks/product/useUnitHook';
import { ITableSortConfig } from '@/types/table';
import { useTranslation } from 'react-i18next';
import { ROW_PER_PAGE } from '@/configs';
import DefaultImage from '@/assets/logo/default_img.png';

const ProductPage: React.FC = () => {
  const { products, isLoading, getProduct, queryParams, totalPages, setQueryParams, deleteProductHook } =
    useProductHook();
  const { categories, getCategory, queryParams: queryCategory } = useCategoriesHook();
  const { supplier, getSupplier, queryParams: querySuplier } = useSupplierHook();
  const { units, getUnit, queryParams: queryUnit } = useUnitHook();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearchChange = (searchTerm: string) => {
    setQueryParams((prev) => ({ ...prev, search: searchTerm, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    getProduct({ ...queryParams, page });
  };

  const handleRowPerpage = (limit: number) => {
    getProduct({ ...queryParams, limit });
  };

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const supplierOptions = supplier.map((sup) => ({
    label: sup.name,
    value: sup._id,
  }));

  const unitOptions = units.map((unit) => ({
    label: unit.name,
    value: unit._id,
  }));

  const handleCategoryFilter = (categoryId: string) => {
    getProduct({ ...queryParams, category_id: categoryId, page: 1 });
  };

  const handleSupplierFilter = (supplierId: string) => {
    getProduct({ ...queryParams, supplier_id: supplierId, page: 1 });
  };

  const handleUnitFilter = (unitId: string) => {
    getProduct({ ...queryParams, unit_id: unitId, page: 1 });
  };

  const { control } = useForm();

  const handleEdit = (id: string) => {
    navigate(`/product/edit/${id}`);
  };
  const copyToClipboard = async ({ text }: { text: string }) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const openDeleteModal = (id: string) => {
    setSelectedProductId(id);
    setShowModal(true);
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

      getProduct(newParams);
      return newParams;
    });
  };

  const getSortConfig = (): ITableSortConfig | undefined =>
    queryParams.sort_by
      ? { sortBy: queryParams.sort_by, sortType: (queryParams.sort_type || 'asc') as 'asc' | 'desc' }
      : undefined;

  const sortConfig = getSortConfig();

  useEffect(() => {
    getCategory(queryCategory);
    getSupplier(querySuplier);
    getUnit(queryUnit);
    getProduct(queryParams);
  }, [queryParams.page, queryParams.limit, queryParams.search]);

  return (
    <div className="w-full">
      {showModal && (
        <ConfirmModal
          textCancel={t('btn_cancel')}
          textConfirm="ລົບຂໍ້ມູນ"
          show={showModal}
          setShow={setShowModal}
          message={t('product.message_delete_product', {
            productName: products.find((item) => item._id === selectedProductId)?.name,
          })}
          handleConfirm={() => {
            deleteProductHook(selectedProductId!);
            setShowModal(false);
          }}
        />
      )}

      <Table
        className="pt-6"
        title={t('product.title_manage_product')}
        filterAction={[
          <div key={'inventory'} className="w-full max-w-full gap-4 py-4 md:flex">
            <div className="w-full py-1 md:flex">
              <Search
                type="small"
                name="search"
                placeholder={t('search')}
                className="rounded-xl bg-contains_mainly_blue p-4"
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            <div className="w-full py-1 md:flex">
              <Select
                className="rounded-xl bg-contains_mainly_blue py-4"
                label=""
                name="category_id"
                options={categoryOptions}
                control={control}
                placeholder={t('product.label_choose_category')}
                onCreate="ບໍ່ມີລາຍການປະເພດສິນຄ້າ - ເພີ່ມລາຍການປະເພດສິນຄ້າ"
                onChange={handleCategoryFilter}
              />
            </div>

            <div className="w-full py-1 md:flex">
              <Select
                className="rounded-xl bg-contains_mainly_blue py-4"
                label=""
                name="unit_id"
                options={unitOptions}
                control={control}
                placeholder={t('product.label_choose_unit')}
                onCreate="ບໍ່ມີລາຍການປະເພດສິນຄ້າ - ເພີ່ມລາຍການປະເພດສິນຄ້າ"
                onChange={handleUnitFilter}
              />
            </div>

            <div className="w-full py-1 md:flex">
              <Select
                className="rounded-xl bg-contains_mainly_blue py-4"
                label=""
                name="supplier_id"
                options={supplierOptions}
                control={control}
                placeholder={t('product.label_choose_supplier')}
                onCreate="ບໍ່ມີລາຍການປະເພດສິນຄ້າ - ເພີ່ມລາຍການປະເພດສິນຄ້າ"
                onChange={handleSupplierFilter}
              />
            </div>
          </div>,
        ]}
        headerAction={[
          <div key={'inventory'} className="flex flex-col gap-4">
            <div className="flex justify-end gap-4">
              <Button
                className="rounded-xl border-2 border-gray-300 bg-white text-periwinkleblue"
                children={
                  <div className="text-sm font-normal text-periwinkleblue dark:text-periwinkleblue md:text-base md:font-bold">
                    {t('btn_export_data')}
                  </div>
                }
                name="export"
                icon={<div className="hidden text-periwinkleblue sm:block">{iconFileOut}</div>}
              />
              <Button
                onClick={() => navigate('/product/create')}
                children={<div className="text-sm font-normal md:text-base md:font-bold">{t('btn_add_product')}</div>}
                icon={<div className="hidden sm:block">{iconAdd}</div>}
                className="rounded-xl bg-periwinkleblue"
              />
            </div>
          </div>,
        ]}
        onSort={handleTableSort}
        sortConfig={sortConfig}
        header={productHeader(t)}
        data={products}
        body={
          <>
            {products.map((row, index) => (
              <tr key={index} className="border-b border-gray-400">
                <td className="cursor-pointer px-4 py-4" onClick={() => navigate(`/product/detail/${row._id}`)}>
                  <img
                    src={row?.photos?.toString() ?? DefaultImage}
                    alt="product image"
                    className="h-16 w-16 object-cover"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-colorblack dark:text-white">
                    {row.name}
                    <div className="cursor-pointer" onClick={() => copyToClipboard({ text: row.name })}>
                      {iconCopy}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#626161] dark:text-white">
                    {row.code}
                    <div className="cursor-pointer" onClick={() => copyToClipboard({ text: row.code })}>
                      {iconCopy}
                    </div>
                  </div>
                  <div>{row.cf_code}</div>
                </td>
                <td className="px-4 py-4 text-colorblack dark:text-white">{row.pos_price}</td>
                <td className="px-4 py-4 text-colorblack dark:text-white">{row.online_price}</td>
                <td className="px-4 py-4 text-colorblack dark:text-white">{row.cf_price}</td>
                <td className="px-4 py-4 text-colorblack dark:text-white">
                  <p> {row.category_id?.name || 'No product type available'}</p>
                  <p> {row.supplier_id?.name || 'No product type available'}</p>
                  {<p> {row.unit_id?.name || 'No product type available'}</p>}
                </td>
                <td className="px-4 py-4 text-colorblack dark:text-white">{row.descriptions}</td>

                <td className="px-4 py-4 text-colorblack dark:text-white">
                  <StatusBadge
                    status={`${row.inventory_id.sold_qty ?? 0} `}
                    className={
                      (row.inventory_id.sold_qty ?? 0) <= 0 || undefined
                        ? 'w-[100px] rounded-full border-amber-200 bg-amber-50 py-2 text-center text-amber-500'
                        : 'w-[100px] rounded-full border-amber-200 bg-amber-50 py-2 text-center text-amber-500'
                    }
                  />
                </td>
                <td className="px-4 py-4 text-colorblack dark:text-white">
                  <StatusBadge
                    status={`${row.inventory_id?.quantity} `}
                    className={
                      row.inventory_id?.quantity === row.inventory_id?.sold_qty
                        ? 'w-[100px] rounded-full border-red-200 bg-red-50 py-2 text-center text-red-500'
                        : row.inventory_id?.quantity > row.inventory_id?.sold_qty
                          ? 'w-[100px] rounded-full border-green-200 bg-green-50 py-2 text-center text-green-500'
                          : 'w-[100px] rounded-full border-yellow-200 bg-yellow-50 py-2 text-center text-yellow-500'
                    }
                  />
                </td>

                <td className="px-4 py-4 text-colorblack dark:text-white">
                  {new Date(row.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-4 text-colorblack dark:text-white">
                  <StatusBadge
                    status={`${row.available === true ? 'ເປິດ' : 'ປິດ'} `}
                    className={
                      row.available === true
                        ? 'w-[100px] rounded-full border-green-200 bg-green-50 py-2 text-center text-green-500'
                        : 'w-[100px] rounded-full border-red-200 bg-red-50 py-2 text-center text-red-500'
                    }
                  />
                </td>
                <td className="p-4">
                  <TableAction
                    onEdit={() => handleEdit(row._id)}
                    onDelete={() => {
                      openDeleteModal(row._id);
                    }}
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

export default ProductPage;
