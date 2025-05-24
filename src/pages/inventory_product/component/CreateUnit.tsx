import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import LoadingProgressBar from '@/components/Loading/LoadingProgress';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useUnitHook from '@/hooks/product/useUnitHook';
import { iconArrowBack } from '@/configs/icon';
import { useNavigate, useParams } from 'react-router-dom';
import Textarea from '@/components/Forms/Textarea';
import { IUnit } from '@/types/inventory/unit.type';
import { useTranslation } from 'react-i18next';

const CreateUnit: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { createUnit, updateUnit, getUnitById } = useUnitHook();
  const { id } = useParams();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUnit>({
    defaultValues: async () => {
      if (!id) return { amount: 1 };
      const data = await getUnitById(id);
      return { ...data, amount: data.amount || 1 };
    },
  });

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
    }
  }, [id]);

  const handleFormSubmit = async (data: IUnit) => {
    setIsLoading(true);
    try {
      if (isEditMode && id) {
        await updateUnit(id, data as IUnit);
      } else {
        await createUnit(data);
      }
    } catch (error) {
      console.error('Error saving unit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full rounded-lg bg-white dark:bg-boxdark">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="w-full max-w-md">
            <LoadingProgressBar />
          </div>
        </div>
      )}

      <div className="border-b-2 border-gray-300 p-10 py-6">
        <Button
          variant="info"
          onClick={() => navigate(-1)}
          className="text-black"
          icon={iconArrowBack}
          shape="rounded"
          children={t('btn_back')}
        />
      </div>
      <div className="flex w-full justify-between border-b-2 border-gray-200 p-8">
        <h1 className="text-2xl font-bold">
          {isEditMode ? t('product_unit.title_edit_unit') : t('product_unit.title_create_unit')}
        </h1>
      </div>

      <div className="p-8">
        <form className="space-y-4">
          <Input
            name="name"
            label={t('product_unit.label_unit_name')}
            register={register}
            errors={errors}
            rules={{ required: 'ກະລຸນາປ້ອນຊື່ຫົວໜ່ວຍ' }}
          />
          <Input
            type="number"
            name="amount"
            label={t('product_unit.label_quantity')}
            register={register}
            errors={errors}
          />
          <Textarea name="description" label={t('description')} register={register} errors={errors} />
        </form>

        <div className="flex justify-end py-20">
          <Button
            disabled={isLoading}
            onClick={handleSubmit(handleFormSubmit)}
            children={isEditMode ? t('btn_edit_data') : t('btn_save_data')}
            className="transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateUnit;
