import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import { iconArrowBack } from '@/configs/icon';
import useGroupHook from '@/hooks/group/useGroupHook';
import { IGroup, IProductGroup, IProductGroupAction, IUpdateProductGroup } from '@/types/group/group';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useProductHook from '@/hooks/product/useProductHook';
import { useTranslation } from 'react-i18next';
import InputText from '@/components/Forms/InputText';
import SearchDropdown from '@/components/Forms/SearchDropDown';
import Input from '@/components/Forms/Input';

const CreateGroupDetail: React.FC = () => {
  const navigate = useNavigate();
  const { addGroupProductHook, getGroupHook, queryParams, getGroupByIdHook } = useGroupHook();
  const { products, getProduct } = useProductHook();
  const [isSelectProduct, setIsSelectProduct] = useState<IProductGroup[]>([]);
  const [groupId, setGroupId] = useState();
  const [groupProduct, setGroupProduct] = useState<IGroup | null>(null);
  const { t } = useTranslation();
  const params = useParams();
  const id = params.id;

  const fetchProduct = async () => {
    try {
      if (!id) {
        return;
      }
      const res = await getGroupByIdHook(id);
      setGroupProduct(res);
      setGroupId(res._id);
      return res;
    } catch (error: any) {
      toast.error(error?.message || error?.data || 'Network Error!');
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
    setValue,
    register,
  } = useForm<IProductGroupAction>({
    defaultValues: {
      type: 'add',
      products: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });
  const handleRemove = (index: number) => {
    remove(index);
    const updatedSelectProducts = [...isSelectProduct];
    updatedSelectProducts.splice(index, 1);
    setIsSelectProduct(updatedSelectProducts);
  };

  const handleAddProduct = (selectedProduct: any) => {
    append({
      quantity: null,
      cf_code: '',
      price: null,
      product_id: selectedProduct.product_id,
      _id: '',
    });
  };

  const onHandleSubmit = async (data: IProductGroupAction) => {
    try {
      if (!data.products || data.products.length === 0) {
        toast.error('Please add at least one product');
        return;
      }
      const formattedProducts = data.products.map((product: any) => ({
        product_id: product.product_id,
        cf_code: product.cf_code,
        price: Number(product.price),
        quantity: Number(product.quantity),
      }));

      const formattedData = {
        group_id: id,
        type: data.type,
        products: formattedProducts,
      };

      const response = await addGroupProductHook(formattedData);
      toast.success('Create product group success');
      return response;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setValue('group_id', groupId ?? '');
    getGroupHook(queryParams);
    getProduct(queryParams);

    return () => {
      reset();
    };
  }, [id]);

  return (
    <div className="rounded-lg bg-white p-8">
      <div>
        <div>
          <Button
            variant="info"
            onClick={() => navigate(-1)}
            className="text-black"
            icon={iconArrowBack}
            shape="rounded"
          >
            {t('btn_back')}
          </Button>
        </div>

        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="pt-6">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="py-6">
                  <SearchDropdown
                    className="bg-gray-100 p-5"
                    name={`products.${index}.product_id`}
                    value={`products.${index}.name`}
                    labelCfcode="CF code : "
                    labelPrice="Price : "
                    labelQty="Quantity : "
                    labelStock="Stock : "
                    options={products.map((item) => ({
                      label: item._id,
                      value: item.name,
                      icon: item.photos?.toString(),
                      quantity: item.unit_id.amount,
                      cf_code: item.cf_code,
                      price: item.cf_price,
                      stock: item.inventory_id.quantity,
                    }))}
                    onSelect={(payload) => {
                      const isDuplicate = fields.some((field) => field.product_id === payload.label);
                      if (isDuplicate) {
                        toast.error('This product has already been added.');
                        return;
                      }
                      setValue(`products.${index}.product_id`, payload.label);
                      setValue(`products.${index}.quantity`, payload.quantity);
                      setValue(`products.${index}.cf_code`, payload.cf_code);
                      setValue(`products.${index}.price`, payload.price);
                      setValue(`products.${index}.product.name`, payload.value);
                    }}
                    onChange={(e) => e.target.value}
                  />

                  <div className="grid grid-cols-2 items-end gap-4 pt-2 md:grid-cols-4">
                    <InputText
                      name={`products.${index}.quantity`}
                      label={t('group.label_product_quantity')}
                      type="number"
                      placeholder="ປ້ອນຈຳນວນສີນຄ້າ"
                      errors={errors}
                      // @ts-ignore
                      value={watch(`products.${index}.quantity`)}
                      onChange={(e) => setValue(`products.${index}.quantity`, Number(e.target.value))}
                    />
                    <InputText
                      label={t('cf_code')}
                      placeholder={t('cf_code')}
                      name={`products.${index}.cf_code`}
                      value={watch(`products.${index}.cf_code`)}
                      errors={errors}
                      onChange={(e) => setValue(`products.${index}.cf_code`, e.target.value)}
                    />
                    <InputText
                      label={t('group.label_product_price')}
                      type="number"
                      placeholder="ປ້ອນລາຄາສີນຄ້າ"
                      value={watch(`products.${index}.price`)}
                      name={`products.${index}.price`}
                      errors={errors}
                      onChange={(e) => setValue(`products.${index}.price`, Number(e.target.value))}
                    />
                    <Button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="h-[55px] w-[14vh] bg-red-500 md:w-[20vh]"
                    >
                      ລົບສີນຄ້າ
                    </Button>
                  </div>
                </div>
              );
            })}
            <div className="pt-10">
              <Button type="button" onClick={handleAddProduct} className="text-blue-500">
                {t('btn_add_product')}
              </Button>
            </div>
          </div>
          <div className="flex justify-end pt-8">
            <Button type="submit">{t('group.btn_add_product')}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupDetail;
