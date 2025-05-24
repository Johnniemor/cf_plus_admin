import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import LoadingProgressBar from '@/components/Loading/LoadingProgress';
import { iconArrowBack } from '@/configs/icon';
import useSupplierHook from '@/hooks/product/useSuplierHook';
import ISupplier from '@/types/inventory/supplier';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const CreateSupplier: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createSupplier, updateSupplier, getSupplierById } = useSupplierHook();
  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISupplier>({
    defaultValues: async () => {
      if (!id) return;
      const data = await getSupplierById(id);
      return data;
    },
  });
  const handleFormSubmit = async (data: ISupplier) => {
    setIsLoading(true);
    try {
      if (isEditMode && id) {
        await updateSupplier(id, data as ISupplier);
      } else {
        await createSupplier(data);
      }
    } catch (error) {
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
    <div className="relative w-full rounded-lg bg-white p-8 dark:bg-boxdark">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-full max-w-md">
            <LoadingProgressBar />
          </div>
        </div>
      )}
      <div className="pb-6">
        <Button
          variant="info"
          onClick={() => navigate(-1)}
          className="text-black"
          icon={iconArrowBack}
          shape="rounded"
          children={t('btn_back')}
        />
      </div>

      <div className="flex w-full justify-between pb-6">
        <h1 className="mb-6 text-2xl font-bold">
          {isEditMode ? t('product_supplier.title_edit_supplier') : t('product_supplier.title_create_supplier')}
        </h1>
      </div>

      <form className="space-y-4">
        <Input
          name="name"
          label={t('product_supplier.label_name')}
          register={register}
          errors={errors}
          rules={{ required: 'ກະລຸນາປ້ອນຊື່' }}
        />
        <Input
          name="contact_name"
          label={t('product_supplier.label_contact_name')}
          register={register}
          errors={errors}
          rules={{ required: 'ກະລຸນາປ້ອນສ້າງຊື່' }}
        />
        <Input
          name="mobile_number"
          label={t('product_supplier.label_phone_number')}
          register={register}
          errors={errors}
          rules={{ required: 'ກະລຸນາປ້ອນເບີໂທ' }}
        />
        <Input
          name="email"
          label={t('product_supplier.label_email')}
          register={register}
          errors={errors}
          rules={{ required: 'ກະລຸນາປ້ອນອີເມວ' }}
        />
        <Input
          name="address"
          label={t('onboarding.label_address')}
          register={register}
          errors={errors}
          rules={{ required: 'ກະລຸນາປ້ອນທີ່ຢູ່' }}
        />
      </form>

      <div className="flex justify-end py-20">
        <Button
          disabled={isLoading}
          onClick={handleSubmit((data) => {
            handleFormSubmit(data);
          })}
          children={isEditMode ? t('btn_edit_data') : t('btn_save_data')}
        />
      </div>
    </div>
  );
};

export default CreateSupplier;
