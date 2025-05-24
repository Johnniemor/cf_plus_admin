import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import LoadingProgressBar from '@/components/Loading/LoadingProgress';
import { iconArrowBack } from '@/configs/icon';
import { useNavigate, useParams } from 'react-router-dom';
import Textarea from '@/components/Forms/Textarea';
import ICategory from '@/types/inventory/category';
import ImageUpload from '@/components/UploadFile/ImageUpload';
import { toast } from 'react-toastify';
import useCategoriesHook from '@/hooks/product/useCategoryHook';
import { useTranslation } from 'react-i18next';

const CreateCategory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createCategory, updateCategory, getCategoryById } = useCategoriesHook();
  const [isEditMode, setIsEditMode] = useState(false);
  const [image, setFile] = useState<File | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICategory>({
    defaultValues: async () => {
      if (!id) return;
      const data = await getCategoryById(id);
      setFile(data.image ?? null);
      return data;
    },
  });
  useEffect(() => {
    if (image instanceof File) {
      if (image.size > 3) {
        setPreview(null);
      } else {
        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
    } else {
      setPreview(image);
    }
  }, [image]);
  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      if (isEditMode && id) {
        const response = await updateCategory(id, { ...data, image });
        if (response) {
          toast.success('Updated category successfully');
        } else {
          toast.error('Already have this name');
        }
      } else {
        await createCategory({ ...data, image });
        toast.success('Create category  successfully');
      }
    } catch (error: any) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
    }
  }, [id]);

  return (
    <div className="relative w-full rounded-lg bg-white py-8 dark:bg-boxdark">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-full max-w-md">
            <LoadingProgressBar />
          </div>
        </div>
      )}

      <div className="border-b-2 border-gray-300 px-8 pb-6">
        <Button
          variant="info"
          onClick={() => navigate(-1)}
          className="text-black"
          icon={iconArrowBack}
          shape="rounded"
          children={t('btn_back')}
        />
      </div>

      <div className="flex w-full justify-between border-b-2 border-gray-200 py-4">
        <h1 className="mx-8 my-3 text-2xl font-bold">
          {isEditMode ? t('product_category.title_edit_category') : t('product_category.title_create_category')}
        </h1>
      </div>

      <form className="space-y-4 px-8 py-6">
        <Input
          name="name"
          label={t('product_category.label_name_category')}
          register={register}
          errors={errors}
          rules={{ required: 'ກະລຸນາປ້ອນຊື່ປະເພດສິນຄ້າ' }}
          placeholder={t('product_category.label_name_category')}
        />
        <ImageUpload
          title={t('product_category.label_image_category')}
          name="image"
          label={t('title_upload_image')}
          setFile={(file) => setFile(file || null)}
          initialImage={preview}
        />

        <Textarea
          name={'description'}
          label={t('product_category.label_category_detail')}
          register={register}
          errors={errors}
          placeholder={t('product_category.label_category_detail')}
        />
      </form>

      <div className="flex justify-end px-6 py-20">
        <Button
          disabled={isLoading}
          onClick={handleSubmit((data) => {
            handleFormSubmit(data);
          })}
          children={isEditMode ? t('btn_edit_data') : t('btn_save_data')}
          className={`transition-colors`}
        />
      </div>
    </div>
  );
};

export default CreateCategory;
