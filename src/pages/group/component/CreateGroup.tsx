import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import Select from '@/components/Forms/Select';
import { iconArrowBack } from '@/configs/icon';
import useGroupHook from '@/hooks/group/useGroupHook';
import usePageHook from '@/hooks/page/usePageHook';
import useProductHook from '@/hooks/product/useProductHook';
import { IGroup, IProductGroup } from '@/types/group/group';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'light-date';
import DropdownMenuWithImages from '@/components/Forms/ImageSelect';
import { useTranslation } from 'react-i18next';
import SearchDropdown from '@/components/Forms/SearchDropDown';
import InputText from '@/components/Forms/InputText';

const CreateGroup: React.FC = () => {
  const navigate = useNavigate();
  const { page, feed, setSelectedPageId, getFeedHook, getPageHook, queryParams, selectedPageId } = usePageHook();
  const { products, queryParams: queryProduct, getProduct } = useProductHook();
  const { createGroupHook, updateGroupHook, getGroupByIdHook } = useGroupHook();
  const [isSelectProduct, setIsSelectProduct] = useState<IProductGroup[]>([]);
  const [isAddForm, setIsAddForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useParams();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<IGroup>({
    defaultValues: async () => {
      if (!id) {
        return {
          available: true,
          start_at: '',
          expired_at: '',
          products: [],
        };
      }
      const data = await getGroupByIdHook(id);
      return {
        ...data,
        page_id: data.page_id._id,
        f_post_ids: Array.isArray(data.f_post_ids),
        start_at: format(new Date(data.start_at), '{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}'),
        expired_at: format(new Date(data.expired_at), '{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}'),
      };
    },
  });

  useEffect(() => {
    getProduct(queryProduct);
    getPageHook(queryParams);
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    if (selectedPageId) {
      getFeedHook(queryParams, selectedPageId);
    }
  }, [selectedPageId]);

  const pageId = watch('page_id');

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
      pending_qty: null,
    });

    setIsAddForm(true);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (isEditMode && id) {
        const res = await updateGroupHook(id, data);
        toast.success('Update group success');
        return res;
      } else {
        setIsSelectProduct([data]);
        const res = await createGroupHook(data);
        toast.success('Create group success');
        return res;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchGroupData = async () => {
      if (id) {
        setIsEditMode(true);
        const data = await getGroupByIdHook(id);
        reset(data);
      }
    };
    fetchGroupData();
  }, [id, reset]);
  return (
    <div className="rounded-lg bg-white dark:bg-boxdark">
      <div className="border-b-2 border-gray-300 p-6 px-8">
        <Button
          variant="info"
          onClick={() => navigate(-1)}
          className="h-[55px] text-black"
          icon={iconArrowBack}
          shape="rounded"
          children={t('btn_back')}
        />
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-medium">
          {isEditMode ? t('group.title_edit_group') : t('group.title_create_group')}
        </h1>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <div className="grid grid-cols-2 gap-4 pt-10">
              <Input
                label={t('group.label_group_name')}
                placeholder={t('group.label_group_name')}
                name="name"
                errors={errors}
                register={register}
                rules={{ required: `${t('group.label_validate_group_name')}` }}
              />
              <Select
                classLabel="mb-2.5"
                className="h-[55px] bg-white"
                placeholder={t('group.label_choose_page')}
                label={t('group.label_choose_page')}
                name={'page_id'}
                options={page?.map((item) => ({ value: item.id, label: item.name }))}
                control={control}
                error={errors.page_id?.message}
                onChange={(selected) => {
                  console.log('select page', selected);
                  setSelectedPageId(selected);
                }}
                rules={{ required: `${t('group.label_validate_choose_page')}` }}
              />
              {/* <Select
                placeholder={t('product.label_choose_supplier')}
                label={t('product.label_choose_supplier')}
                name={'supplier_id'}
                options={supplier.map((item) => ({ value: item._id, label: item.name }))}
                control={control}
                rules={{ required: 'ກະລຸນາເລືອກປະເພດຜູ້ຈັດຫາ' }}
              /> */}

              <DropdownMenuWithImages
                isSelectOption
                pageId={pageId}
                placeholder={t('group.placeholder_choose_feed')}
                classLabel="mb-2.5"
                label={t('group.label_choose_feed')}
                imageSize="large"
                control={control}
                error={errors.page_id?.message}
                name={`f_post_ids`}
                options={feed?.map((item) => ({
                  value: item.id,
                  imageUrl: item.full_picture,
                }))}
              />

              <Input
                label={t('description')}
                placeholder={t('description')}
                name="description"
                errors={errors}
                register={register}
              />

              <Input
                label={t('group.label_start_date')}
                type="datetime-local"
                name="start_at"
                errors={errors}
                register={register}
              />

              <Input
                label={t('group.label_end_date')}
                type="datetime-local"
                placeholder="ປ້ອນມື້ໝົດອາຍຸການໃຊ້ງານ"
                name="expired_at"
                errors={errors}
                register={register}
              />
              <div className="flex w-[20px] gap-8">
                <Input
                  className="w-10"
                  label={t('group.label_open')}
                  type="radio"
                  name="available"
                  value="true"
                  errors={errors}
                  register={register}
                  defaultChecked={true}
                />
                <Input
                  label={t('group.label_close')}
                  type="radio"
                  name="available"
                  value="false"
                  errors={errors}
                  register={register}
                  defaultChecked={false}
                />
              </div>
            </div>

            <div>
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
                <Button type="button" onClick={handleAddProduct} className="h-[55px] text-blue-500">
                  {t('btn_add_product')}
                </Button>
              </div>
            </div>

            <div className="flex justify-end pt-10">
              <Button
                className="h-[55px] w-[160px] px-10"
                type="submit"
                children={isEditMode ? t('btn_edit_data') : t('btn_save_data')}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
