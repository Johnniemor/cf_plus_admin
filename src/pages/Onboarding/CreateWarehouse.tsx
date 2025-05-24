import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import UploadImage from '@/components/UploadFile/ImageUpload';
import { useState } from 'react';
import useWarehouseHook from '@/hooks/warehouse/wareHouseHook';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function CreateWarehouse(props: { next: () => void }) {
  const { createWareHouse, isLoading } = useWarehouseHook();
  const { t } = useTranslation();
  const [logo, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await createWareHouse({ ...data, logo });
      toast.success('Create shop successfully!');
      reset();
      props.next();
      return response;
    } catch (error) {
      console.error('Error creating warehouse:', error);
    }
  };

  return (
    <div className="bg-white p-6 dark:bg-boxdark">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            label={t('onboarding.label_shop_name')}
            name="name"
            register={register}
            errors={errors}
            placeholder={t('onboarding.placeholder_shop_name')}
            rules={{ required: t('onboarding.required_shop_name') }}
          />
        </div>

        <div className="mb-4">
          <Input
            label={t('onboarding.label_address')}
            name="address"
            register={register}
            errors={errors}
            placeholder={t('onboarding.placeholder_address')}
            rules={{ required: t('onboarding.required_address') }}
          />
        </div>

        <div className="mb-4">
          <Input
            label={t('onboarding.label_contact')}
            name="contact"
            register={register}
            errors={errors}
            placeholder={t('onboarding.placeholder_contact')}
            rules={{ required: t('onboarding.required_address') }}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">{t('onboarding.label_upload_logo')}</label>
          <UploadImage
            name="logo"
            label={t('onboarding.placeholder_upload_logo')}
            setFile={(file) => setFile(file || null)}
            initialImage=""
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="rounded-lg px-12" loading={isLoading}>
            {t('onboarding.btn_save')}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateWarehouse;
