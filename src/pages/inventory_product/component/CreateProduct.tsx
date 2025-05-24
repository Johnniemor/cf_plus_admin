import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import Select from '@/components/Forms/Select';
import Textarea from '@/components/Forms/Textarea';
import ImageList from '@/components/UploadFile/ImageList';
import MultiUploadImage from '@/components/UploadFile/UploadFileMulti';
import { iconArrowBack } from '@/configs/icon';
import useCategoriesHook from '@/hooks/product/useCategoryHook';
import useProductHook from '@/hooks/product/useProductHook';
import useSupplierHook from '@/hooks/product/useSuplierHook';
import useUnitHook from '@/hooks/product/useUnitHook';
import { IPayloadProduct, IProduct } from '@/types/inventory/product';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateProduct: React.FC = () => {
  const { categories, getCategory, queryParams: queryCategory } = useCategoriesHook();
  const { supplier, getSupplier, queryParams: querySuplier } = useSupplierHook();
  const { units, getUnit, queryParams: queryUnit } = useUnitHook();
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const { createProductHook, updateProductHook, getProductById, updatePhotosProductHook } = useProductHook();
  const [preview, setPreview] = useState<string[] | null>(null);
  const [originalImages, setOriginalImages] = useState<string[] | null>(null);
  const [photos, setFile] = useState<File[] | []>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    watch,
  } = useForm<IPayloadProduct | {}>({
    defaultValues: async () => {
      if (!id) return {};
      const data = await getProductById(id);
      setFile(data.photos ?? []);
      setOriginalImages(data.photos ?? []);
      return {
        code: data.code,
        cf_code: data.cf_code,
        name: data.name,
        pos_price: data.pos_price,
        cf_price: data.cf_price,
        online_price: data.online_price,
        descriptions: data.descriptions,
        category_id: data.category_id._id,
        unit_id: data.unit_id._id,
        supplier_id: data.supplier_id._id,
        currency: data.currency || undefined,
        tag: data.tag,
        available: data.available,
        photos: data.photos,
      };
    },
  });

  useEffect(() => {
    getCategory(queryCategory);
    getSupplier(querySuplier);
    getUnit(queryUnit);
  }, []);

  const removeFile = (index: number) => {
    setFile((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
    setPreview((prevPreview) => {
      if (!prevPreview) return null;
      const updatedPreview = [...prevPreview];
      updatedPreview.splice(index, 1);
      return updatedPreview.length > 0 ? updatedPreview : null;
    });
  };
  const handleSelectAsPrimary = (index: number) => {
    if (preview && preview.length > 0) {
      const updatedPreview = [preview[index], ...preview.filter((_, i) => i !== index)];
      setPreview(updatedPreview);
      setFile((prevFiles) => {
        if (!prevFiles || prevFiles.length === 0) return prevFiles;
        const selectedFile = prevFiles[index];
        const updatedFiles = [selectedFile, ...prevFiles.filter((_, i) => i !== index)];
        return updatedFiles;
      });
    }
  };

  const handleOnSubmit = async (data: any) => {
    try {
      if (isEditMode && id) {
        const productResponse = await updateProductHook(id, data);

        if (photos.length > 0) {
          const photosResponse = await updatePhotosProductHook(id, { ...data, photos });
          return photosResponse;
        }

        return productResponse;
      } else {
        const response = await createProductHook({ ...data, photos });
        return response;
      }
    } catch (error: any) {
      toast.error(error?.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    if (photos && photos.length > 0) {
      if (photos[0] instanceof File) {
        const objectUrls: string[] = photos.map((file) => URL.createObjectURL(file));
        setPreview(objectUrls);
        return () => {
          objectUrls.forEach((url) => URL.revokeObjectURL(url));
        };
      } else {
        setPreview(photos as string[]);
      }
    } else {
      setPreview(null);
    }
  }, [photos]);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
    }
  }, [id]);

  return (
    <div className="relative w-full rounded-xl bg-white dark:bg-boxdark">
      <div className="border-b-2 border-gray-300 p-6">
        <Button
          variant="info"
          onClick={() => navigate(-1)}
          className="text-black"
          icon={iconArrowBack}
          shape="rounded"
          children={t('back')}
        />
      </div>
      <div className="flex w-full justify-between border-b-2 border-gray-300 p-8">
        <h1 className="w-full text-2xl font-bold">
          {' '}
          {isEditMode ? t('product.title_edit_product') : t('product.title_create_product')}
        </h1>
      </div>

      <form className="space-y-4 p-8" onSubmit={handleSubmit(handleOnSubmit)}>
        <Input
          name="name"
          label={t('product.label_product_name')}
          register={register}
          errors={errors}
          rules={{ required: 'ກະລຸນາປ້ອນຊື່ສິນຄ້າ' }}
        />
        <Input
          name="code"
          label={t('product.label_product_id')}
          register={register}
          errors={errors}
          rules={{ required: 'ກະລຸນາປ້ອນລະຫັດສິນຄ້າ' }}
        />
        <Input
          name="cf_code"
          label={t('product.label_cf_code')}
          register={register}
          errors={errors}
          rules={{ required: 'ກະລຸນາປ້ອນລະຫັດ CF' }}
        />
        <Input
          name="pos_price"
          type="number"
          label={t('product.label_pos_price')}
          register={register}
          errors={errors}
          rules={{ required: 'ກະລຸນາປ້ອນລາຄາວາງຂາຍ' }}
        />
        <Input
          name="online_price"
          type="number"
          label={t('product.label_online_price')}
          register={register}
          errors={errors}
          rules={{ required: 'ກະລຸນາປ້ອນລາຄາຂາຍສົ່ງ' }}
        />
        <Input
          name="cf_price"
          type="number"
          label={t('product.label_cf_price')}
          register={register}
          errors={errors}
          rules={{ required: 'ກະລຸນາປ້ອນລາຄາ CF' }}
        />
        <div className="justify-between gap-8 md:flex">
          <div className="w-full py-1">
            <Select
              placeholder={t('product.label_choose_category')}
              label={t('product.label_choose_category')}
              name={'category_id'}
              options={categories.map((item) => ({ value: item._id, label: item.name }))}
              control={control}
            />
          </div>

          <div className="w-full py-1">
            <Select
              placeholder={t('product.label_choose_supplier')}
              label={t('product.label_choose_supplier')}
              name={'supplier_id'}
              options={supplier.map((item) => ({ value: item._id, label: item.name }))}
              control={control}
              rules={{ required: 'ກະລຸນາເລືອກປະເພດຜູ້ຈັດຫາ' }}
            />
          </div>

          <div className="w-full py-1">
            <Select
              placeholder={t('product.label_choose_unit')}
              label={t('product.label_choose_unit')}
              name={'unit_id'}
              options={units.map((item) => ({ value: item._id, label: item.name }))}
              control={control}
            />
          </div>
        </div>
        <Textarea
          name={'descriptions'}
          value={watch('descriptions') || ''}
          label={t('product.label_detail_product')}
          register={register}
          errors={errors}
          placeholder={t('placeholder_product_detail')}
        />
        <MultiUploadImage
          title={t('product.label_add_image_detail')}
          name="photos"
          label={t('title_upload_image')}
          setFiles={(files) => {
            setFile(files);
          }}
          initialImages={preview}
          maxFiles={5}
          removeFile={(index: number) => removeFile(index)}
          handleSelectAsPrimary={handleSelectAsPrimary}
        />

        {isEditMode && originalImages && originalImages.length > 0 && (
          <ImageList images={originalImages} title="ຮູບພາບເດີມ" />
        )}

        <div className="flex justify-end py-20">
          <Button type="submit" children={isEditMode ? t('btn_edit_data') : t('btn_save_data')} disabled={!isDirty} />
        </div>
      </form>
    </div>
  );
};
export default CreateProduct;
