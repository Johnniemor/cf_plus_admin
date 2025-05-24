import Table from '@/components/Table';
import { useTranslation } from 'react-i18next';
import useInventoryHook from '@/hooks/inventory/useInventoryHook';
import { useEffect } from 'react';
import Button from '@/components/Button';
import { iconAdd, iconArrowBack } from '@/configs/icon';
import { TableAction } from '@/components/Table/TableAction';
import { useNavigate, useParams } from 'react-router-dom';
import Search from '@/components/Forms/Search';
import TablePagination from '@/components/Table/Pagination';
import { ROW_PER_PAGE } from '@/configs';
import { inventoryHeader } from '@/pages/inventory_product/column/inventory';
import DefaultImage from '@/assets/logo/default_img.png';

const InventoryPage: React.FC = () => {
  const { inventory, getInventoryHook, queryParams, setQueryParams, totalPages, isLoading } = useInventoryHook();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const param = useParams();
  const id = param.id;
  useEffect(() => {
    getInventoryHook({
      ...queryParams,
      merchant_id: id,
    });
  }, [queryParams.page, queryParams.limit, queryParams.search, queryParams.merchant_id]);
  const handleSearchChange = (searchTerm: string) => {
    setQueryParams((prev) => ({ ...prev, search: searchTerm, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    getInventoryHook({ ...queryParams, page });
  };

  const handleRowPerpage = (limit: number) => {
    getInventoryHook({ ...queryParams, limit });
  };
  const handleEdit = (id: string) => {
    navigate(`/inventory/edit/${id}`);
  };
  return (
    <div className="bg-white dark:bg-boxdark">
      <div className="border-b-2 border-gray-300 p-4">
        <Button
          variant="info"
          onClick={() => navigate(-1)}
          className="text-black"
          icon={iconArrowBack}
          shape="rounded"
          children={t('btn_back')}
        />
      </div>
      <Table
        className="pt-6"
        headerAction={[
          <Button
            icon={iconAdd}
            onClick={() => {
              navigate(`/inventory/create/${id}`);
            }}
            children={t('inventory.btn_create_inv')}
          />,
        ]}
        filterAction={[
          <div className="grid w-full grid-cols-3 py-4">
            <Search
              type="small"
              name="search"
              placeholder={t('search')}
              className="rounded-xl bg-contains_mainly_blue p-4"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>,
        ]}
        title={t('inventory.title_inventory')}
        header={inventoryHeader(t)}
        data={inventory}
        body={
          <>
            {inventory.map((inv, index) => (
              <tr key={index} className="border-b border-gray-400">
                <td className="px-4 py-4 text-colorblack dark:text-white">
                  <img
                    src={inv.product.photos?.toString() ? inv.product.photos.toString() : DefaultImage}
                    alt="inv.product.photos"
                    className="h-16 w-16"
                  />
                </td>
                <td className="px-4 py-4 text-colorblack dark:text-white">{inv.product.name}</td>
                <td className="px-4 py-4 text-colorblack dark:text-white">{inv?.product.cf_code}</td>
                <td className="px-4 py-4 text-colorblack dark:text-white">{inv?.product.code}</td>
                <td className="px-4 py-4 text-colorblack dark:text-white">{inv?.quantity}</td>
                <td className="px-4 py-4 text-colorblack dark:text-white">{inv?.sold_qty}</td>
                <td className="px-4 py-4 text-colorblack dark:text-white">{inv?.product.pos_price}</td>
                <td className="px-4 py-4 text-colorblack dark:text-white">{inv.product.cf_price}</td>
                <td className="px-4 py-4 text-colorblack dark:text-white">{inv?.product.online_price}</td>
                <td className="px-4 py-4 text-colorblack dark:text-white">
                  {new Date(inv?.created_at).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <TableAction onEdit={() => handleEdit(inv._id)} />
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

export default InventoryPage;
