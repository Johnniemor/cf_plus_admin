import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Components
import Button from '@/components/Button';
import Table from '@/components/Table';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import TablePagination from '@/components/Table/Pagination';
import { TableAction } from '@/components/Table/TableAction';

// Types and Config
import { IProductGroup, IProductGroupAction, IUpdateProductGroup } from '@/types/group/group';
import { ROW_PER_PAGE } from '@/configs';
import { iconAdd, iconCancel, iconEdit, iconTrash } from '@/configs/icon';
import { groupDetailHeader } from '../column/Header';

// Assets
import DefaultImage from '@/assets/logo/default_img.png';
import { IResponseParams } from '@/types/pagination';
import useGroupHook from '@/hooks/group/useGroupHook';

interface Props {
  groupData: any;
  productsGroup: any;
  queryParams: IResponseParams;
  totalPages: number;
  isLoading: boolean;
  onRemoveProducts: (id: IProductGroupAction) => Promise<void>;
  onSearchChange: (e: string) => void;
  onPageChange: (page: number) => void;
  onRowPerPageChange: (rows: number) => void;
  onAddProducts: () => Promise<void>;
}

const ProductListDetail = ({
  groupData,
  productsGroup,
  queryParams,
  totalPages,
  isLoading,
  onRemoveProducts,
  onPageChange,
  onRowPerPageChange,
  onAddProducts,
}: Props) => {
  const { t } = useTranslation();
  const { id } = useParams();

  const {
    reset,
    register,
    formState: { isDirty },
    handleSubmit,
  } = useForm<IUpdateProductGroup>();

  // State
  const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);
  const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false);
  const [selectDeleteProduct, setSelectDeleteProduct] = useState<string[]>([]);
  const [originalProductGroup, setOriginalProductGroup] = useState<IProductGroup[]>([]);
  const [productGroup, setProductGroup] = useState<IProductGroup[]>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const { updateGroupProductHook } = useGroupHook();
  const [productIds, setProductIds] = useState<string>();
  const quantityInv = productsGroup.map((item: any) => item.inventory_id.quantity);
  useEffect(() => {
    if (groupData) {
      reset({
        ...groupData,
        cf_code: groupData.cf_code,
        quantity: groupData.quantity,
      });

      setOriginalProductGroup(groupData.products);
      setProductGroup(groupData.products);
    }
  }, [groupData, reset]);

  // Methods
  const handleEdit = (id: string) => {
    console.log('handle edit : ', id);
    setProductIds(id);
  };

  const handleSelectDeleteProduct = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
    setSelectDeleteProduct((prev) => {
      const set = new Set(prev);
      e.target.checked ? set.add(productId) : set.delete(productId);
      return [...set];
    });
  };

  const handleDeleteAllToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allProductIds = groupData?.products_groupCF_ids ?? [];
      setSelectDeleteProduct(allProductIds);
    } else {
      setSelectDeleteProduct([]);
    }
  };

  const handleDelete = async () => {
    if (!id || selectDeleteProduct.length === 0) {
      toast.error('No products selected for deletion');
      return;
    }

    try {
      const formattedData: IProductGroupAction = {
        group_id: id,
        type: 'remove',
        products_groupCF_ids: selectDeleteProduct,
        products: [],
      };

      await onRemoveProducts(formattedData);
      setSelectDeleteProduct([]);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete products');
    } finally {
      setShowModalDeleteProduct(false);
      setEditingProductId(null);
    }
  };

  const handleUpdateProductGroup = async (data: IUpdateProductGroup) => {
    if (!id) {
      throw new Error('group_id is required');
    }

    try {
      const formatData: any = {
        group_id: id,
        product_group_id: productIds,
        cf_code: data.cf_code,
        price: data.price,
        quantity: data.quantity,
      };

      const originalProductGroups = originalProductGroup.find((v) => v._id === formatData.product_group_id);
      const isCfCodeChanged = formatData.cf_code !== undefined && formatData.cf_code !== originalProductGroups?.cf_code;
      const isQuantityChanged =
        formatData.quantity !== undefined &&
        originalProductGroups?.quantity !== undefined &&
        String(formatData.quantity) !== String(originalProductGroups.quantity);
      const isPriceChanged = formatData.price !== undefined && formatData.price !== originalProductGroups?.price;

      const updateData: any = {
        group_id: id,
        product_group_id: productIds,
      };
      if (isCfCodeChanged) updateData.cf_code = formatData.cf_code;
      if (isQuantityChanged) updateData.quantity = formatData.quantity;
      if (isPriceChanged) updateData.price = formatData.price;

      const res = await updateGroupProductHook(id, updateData);

      if (isQuantityChanged === true) {
        onAddProducts();
      }

      toast.success(t('group_post_detail.label_update_product_success'));
      setEditingProductId(null);
      return res;
    } catch (error) {
      console.error('Error updating product group:', error);
      throw error;
    } finally {
      setShowModalUpdateProduct(false);
    }
  };

  const getCalculatedQuantity = (pendingQty = 0, index: number) => {
    if (!productsGroup[index] || !productsGroup[index].unit_id || productsGroup[index].unit_id.amount === 0) {
      return 0;
    }

    return Math.floor(Number(pendingQty) / Number(productsGroup[index].unit_id.amount));
  };

  const handleDeleteSingleProduct = (productId: string) => {
    setSelectDeleteProduct([productId]);
    setShowModalDeleteProduct(true);
  };

  // Render methods
  const renderProductRow = (product: IProductGroup, index: number) => {
    const productId = String(product._id);

    return (
      <tr className="border-b border-gray-300" key={index}>
        <td className="p-4 px-4">
          <input
            className="h-5 w-5"
            type="checkbox"
            onChange={(e) => handleSelectDeleteProduct(e, productId)}
            checked={selectDeleteProduct.includes(productId)}
          />
        </td>
        <td className="whitespace-nowrap p-4">
          <img
            className="h-14 w-14 object-cover"
            src={(product.product?.photos?.[0] as string) ?? DefaultImage}
            alt={product.product?.name || 'Product Image'}
          />
        </td>
        <td className="p-4">
          {editingProductId === productId ? (
            <input
              className="h-12 w-full rounded-lg bg-gray-200 px-3 text-sm"
              {...register(`cf_code`)}
              defaultValue={product.cf_code ?? ''}
            />
          ) : (
            product.cf_code
          )}
        </td>
        <td className="p-4">
          {editingProductId === productId ? (
            <input
              className="h-12 w-full rounded-lg bg-gray-200 px-3 text-sm"
              {...register(`quantity`)}
              defaultValue={product.quantity ?? ''}
            />
          ) : (
            product.quantity
          )}
        </td>
        <td className="p-4">
          {editingProductId === productId ? (
            <input
              className="h-12 w-full rounded-lg bg-gray-200 px-3 text-sm"
              {...register(`price`)}
              defaultValue={product.price ?? ''}
            />
          ) : (
            product.price
          )}
        </td>
        <td className="p-4">{product.product?.name}</td>
        <td className="p-4">{getCalculatedQuantity(product.pending_qty ?? 0, index)}</td>
        <td className="p-4">
          {editingProductId === productId ? (
            <div className="flex items-center align-middle">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowModalUpdateProduct(true);
                }}
              >
                {iconEdit}
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setEditingProductId(null);
                }}
              >
                {iconCancel}
              </div>
            </div>
          ) : (
            <TableAction
              onEdit={() => {
                handleEdit(productId);
                setEditingProductId(productId);
              }}
              onDelete={() => handleDeleteSingleProduct(productId)}
            />
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
      {showModalDeleteProduct && (
        <ConfirmModal
          title={t('group_product_detail.title_remove_product_detail')}
          textCancel="ຍົກເລີກ"
          textConfirm="ລົບຂໍ້ມູນ"
          show={showModalDeleteProduct}
          setShow={setShowModalDeleteProduct}
          message="ທ່ານຕ້ອງການລົບຂໍ້ມຸນອອກຈາກລະບົບບໍ່?"
          handleConfirm={handleDelete}
        />
      )}
      {showModalUpdateProduct && (
        <ConfirmModal
          title={t('group_product_detail.title_update_product_detail')}
          textCancel="ຍົກເລີກ"
          textConfirm="ແກ້ໄຂສິນຄ້າ"
          show={showModalUpdateProduct}
          setShow={setShowModalUpdateProduct}
          message="ທ່ານຕ້ອງການແກ້ໄຂສິນຄ້າ?"
          handleConfirm={handleSubmit(handleUpdateProductGroup)}
        />
      )}

      <div className="w-full py-2">
        <div className="rounded-xl bg-white md:flex md:justify-between">
          <div className="w-full text-black dark:text-white">
            {/* <form onSubmit={handleSubmit(handleUpdateProductGroup)}> */}
            <Table
              isShowSelect
              className="pt-8"
              title={t('group_product_detail.title_product_detail')}
              headerAction={[
                <Button
                  key="delete-button"
                  onClick={() => setShowModalDeleteProduct(true)}
                  icon={iconTrash}
                  className="h-10 bg-white"
                >
                  <div className="text-red-500">{t('btn_delete')}</div>
                </Button>,
              ]}
              filterAction={[renderPagination()]}
              onChange={handleDeleteAllToggle}
              header={groupDetailHeader(t)}
              data={productGroup ?? []}
              body={<>{(productGroup || []).map(renderProductRow)}</>}
              loading={isLoading}
              children={renderPagination()}
            />
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListDetail;
