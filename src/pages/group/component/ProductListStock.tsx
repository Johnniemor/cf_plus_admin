import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Components
import Table from '@/components/Table';
import Button from '@/components/Button';
import Search from '@/components/Forms/Search';
import StatusBadge from '@/components/Status/StatusBage';
import TablePagination from '@/components/Table/Pagination';

// Types and Config
import { ROW_PER_PAGE } from '@/configs';
import { iconAdd } from '@/configs/icon';
import { groupProductHeader } from '../column/Header';
import { IGroup } from '@/types/group/group';
import { IProduct } from '@/types/inventory/product';
import { IResponseParams } from '@/types/pagination';
// Assets
import DefaultImage from '@/assets/logo/default_img.png';

interface Props {
  groupProduct: any;
  products: any;
  queryParams: IResponseParams;
  totalPages: number;
  isLoading: boolean;
  onAddProducts: (data: any) => Promise<void>;
  onSearchChange: (e: string) => void;
  onPageChange: (page: number) => void;
  onRowPerPageChange: (rows: number) => void;
}

const ProductListStock = ({
  groupProduct,
  products,
  queryParams,
  totalPages,
  isLoading,
  onAddProducts,
  onSearchChange,
  onPageChange,
  onRowPerPageChange,
}: Props) => {
  const { t } = useTranslation();
  const { id } = useParams();

  // State
  const [selectedProductBox, setSelectedProductBox] = useState<string[]>([]);

  // Methods
  const handleSelectGroupProduct = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    setSelectedProductBox((prev) => {
      const set = new Set(prev);
      e.target.checked ? set.add(productId) : set.delete(productId);
      return [...set];
    });
  };

  const handleAddProductGroup = async () => {
    const selectedProducts = products.filter((p: IProduct) => selectedProductBox.includes(p._id));

    if (selectedProducts.length === 0) {
      toast.error('Please add at least one product');
      return;
    }

    try {
      const formattedProducts = selectedProducts.map((product: IProduct) => {
        const quantity = product.inventory_id?.quantity ?? 0;
        const amount = product.unit_id?.amount ?? 1;

        return {
          product_id: product._id,
          cf_code: product.cf_code,
          price: Number(product.online_price),
          quantity: quantity,
        };
      });

      const formattedData = {
        group_id: id,
        type: 'add',
        products: formattedProducts,
      };

      await onAddProducts(formattedData);
      setSelectedProductBox([]);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSelectAllProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allProductIds = products.map((p: any) => p._id);
      setSelectedProductBox(allProductIds);
    } else {
      setSelectedProductBox([]);
    }
  };

  const isProductInGroup = (productId: string) => {
    return (
      selectedProductBox.includes(productId) ||
      groupProduct?.products.map((item: any) => item?.product?._id).includes(productId)
    );
  };

  // Render methods
  const renderProductRow = (product: IProduct, index: number) => {
    return (
      <tr className="border-b border-gray-300" key={index}>
        <td className="p-4 px-4">
          <input
            className="h-5 w-5"
            type="checkbox"
            // disabled={groupProduct?.products.map((item) => item?.product?._id).includes(product._id)}
            onChange={(e) => handleSelectGroupProduct(e, product._id)}
            checked={isProductInGroup(product._id)}
          />
        </td>
        <td className="whitespace-nowrap p-4">
          <img className="h-14 w-14 object-cover" src={product.photos?.toString() ?? DefaultImage} alt={product.name} />
        </td>
        <td className="p-4">{product.name}</td>
        <td className="p-4">{product.cf_code}</td>
        <td className="p-4">{product.online_price}</td>
        <td className="px-4 py-4 text-colorblack dark:text-white">
          <StatusBadge
            status={`${product.inventory_id?.quantity} `}
            className="w-[100px] rounded-full border-green-200 bg-green-50 py-2 text-center text-green-500"
          />
        </td>
        <td className="p-4">
          {isProductInGroup(product._id) ? (
            <h1>{t('group_product_detail.label_add_already')}</h1>
          ) : (
            <h1>{t('group_product_detail.label_add')}</h1>
          )}
        </td>
      </tr>
    );
  };

  const renderPagination = () => (
    <TablePagination
      totalPages={totalPages}
      currentPage={queryParams.page}
      onPageChange={onPageChange}
      rowsPerPage={queryParams.limit}
      options={ROW_PER_PAGE}
      onRowsPerPageChange={onRowPerPageChange}
    />
  );

  return (
    <div>
      <div className="w-full py-2">
        <div className="rounded-xl bg-white md:flex md:justify-between">
          <div className="w-full text-black dark:text-white">
            <Table
              isShowSelect
              className="pt-8"
              title={t('group_product_detail.title_product_list')}
              filterAction={[
                <div key="filter" className="w-full gap-4 md:flex md:flex-col md:items-center lg:flex-row">
                  <div className="w-full">
                    <Search
                      type="small"
                      name="search"
                      placeholder={t('search')}
                      className="w-full rounded-xl bg-contains_mainly_blue p-4"
                      onChange={(e) => onSearchChange(e.target.value)}
                    />
                  </div>
                  <div className="flex w-full justify-start md:justify-end">{renderPagination()}</div>
                </div>,
              ]}
              headerAction={[
                <Button key="add-button" onClick={handleAddProductGroup} icon={iconAdd} className="h-10">
                  {t('btn_add_product')}
                </Button>,
              ]}
              onChange={handleSelectAllProducts}
              header={groupProductHeader(t)}
              data={products}
              body={<>{products.map(renderProductRow)}</>}
              loading={isLoading}
              children={renderPagination()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListStock;
