import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import ImageUpload from '@/components/UploadFile/ImageUpload';
import { iconArrowBack } from '@/configs/icon';
import useMerchantHook from '@/hooks/merchant/useMerchant';
import { ICreateMerchant } from '@/types/merchant/merchant';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateMerchant: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { createMerchant, updateMerchant } = useMerchantHook();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);
  const [avatar, setFile] = useState<File | null>(null);
  const { id } = useParams();
  useEffect(() => {
    if (avatar instanceof File) {
      if (avatar.size > 3) {
        setPreview(null);
      } else {
        const objectUrl = URL.createObjectURL(avatar);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
    } else {
      setPreview(avatar);
    }
  }, [avatar]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm<ICreateMerchant>({
    // defaultValues: async () => {
    //   if (!id) return {} as ICreateStaff;
    //   const response = await getStaffHookById(id);
    //   return response.data;
    // },
  });
  const onHandleSubmit = async (data: any) => {
    try {
      if (isEditMode && id) {
        const response = await updateMerchant(id, data);
        return response;
      } else {
        const response = await createMerchant({ ...data, avatar });
        return response;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
    }
  }, [id]);
  return (
    <div className="rounded-lg bg-white dark:bg-boxdark">
      <div>
        <div className="border-b-2 border-gray-300 p-6 px-8">
          <Button
            variant="info"
            onClick={() => navigate(-1)}
            className="text-black"
            icon={iconArrowBack}
            shape="rounded"
            children={t('btn_back')}
          />
        </div>
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-medium">
          {isEditMode ? t('employee.title_edit_employee') : t('employee.title_create_employee')}
        </h1>
        <form className="pt-10" onSubmit={handleSubmit(onHandleSubmit)}>
          <div>
            <div className="py-2">
              <Input
                name="name"
                label={t('merchant.label_branch_name')}
                register={register}
                errors={errors}
                rules={{ required: 'ກະລຸນາປ້ອນຊື່ເຕັມພະນັກງານ' }}
              />
            </div>
            <div className="py-2">
              <Input
                name="address"
                label={t('onboarding.label_address')}
                register={register}
                errors={errors}
                rules={{ required: 'ກະລຸນາປ້ອນຊື່ພະນັກງານ' }}
              />
            </div>
            <div className="py-2">
              <Input
                name="mobile_number"
                label={t('merchant.label_mobile_number')}
                register={register}
                errors={errors}
                rules={{ required: 'ກະລຸນາປ້ອນຊື່ພະນັກງານ' }}
              />
            </div>

            <ImageUpload
              title={t('product_category.label_image_category')}
              name="avatar"
              label={t('title_upload_image')}
              setFile={(file) => setFile(file || null)}
              initialImage={preview}
            />
          </div>
          <div className="flex justify-end gap-4 pt-6">
            <Button type="submit" children={isEditMode ? t('btn_edit_data') : t('btn_save_data')} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMerchant;
