import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import Select from '@/components/Forms/Select';
import { ROLE_OPTIONS } from '@/configs';
import { iconArrowBack, iconConfirmPass, iconLocked } from '@/configs/icon';
import useMerchantHook from '@/hooks/merchant/useMerchant';
import useStaffHook from '@/hooks/staff/useStaff';
import { ICreateStaff, IUpdateStaff } from '@/types/staff';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateEmployee: React.FC = () => {
  const { createStaffHook, updateStaffHook, getStaffHookById } = useStaffHook();
  const { merchant, getMerchantHook, queryParams } = useMerchantHook();
  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm<ICreateStaff>({
    defaultValues: async () => {
      if (!id) return {} as ICreateStaff;
      const response = await getStaffHookById(id);
      return response.data;
    },
  });

  useEffect(() => {
    getMerchantHook(queryParams);
  }, [queryParams.page, queryParams.limit]);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
    }
  }, [id]);

  const onHandleSubmit = async (data: any) => {
    try {
      if (isEditMode && id) {
        const res = await updateStaffHook(id, data);
        toast.success('ແກ້ໄຂພະນັກງານສຳເລັດ');
        return res;
      } else {
        const res = await createStaffHook(data);
        toast.success('ເພີ່ມພະນັກງານສຳເລັດ');
        return res;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
          <div className="grid grid-cols-2 gap-4">
            <Select
              className="h-[55px] bg-white"
              label={t('employee.label_merchant')}
              name={'merchant_id'}
              defaultValue={'ເລືອກສາຂາ'}
              placeholder={t('employee.label_choose_branch')}
              options={merchant.map((item) => ({ value: item._id, label: item.name }))}
              control={control}
            />
            <Select
              className="h-[55px] bg-white"
              placeholder={t('employee.label_choose_status')}
              label={t('employee.label_role')}
              name={'role'}
              options={ROLE_OPTIONS}
              control={control}
            />
            <Input
              name="fullname"
              label={t('employee.label_full_name_employee')}
              register={register}
              errors={errors}
              rules={{ required: 'ກະລຸນາປ້ອນຊື່ເຕັມພະນັກງານ' }}
            />
            <Input
              name="username"
              label={t('employee.label_employee_name')}
              register={register}
              errors={errors}
              rules={{ required: 'ກະລຸນາປ້ອນຊື່ພະນັກງານ' }}
            />
            <div className="flex w-[20px] gap-8">
              <Input
                className="w-10"
                label="ເປີດ"
                type="radio"
                name="reset"
                value="true"
                errors={errors}
                register={register}
                defaultChecked={true}
              />
              <Input
                label="ປີດ"
                type="radio"
                name="reset"
                value="false"
                errors={errors}
                register={register}
                defaultChecked={false}
              />
            </div>
            {!id && (
              <>
                <Input
                  name="email"
                  label={t('employee.label_email_employee')}
                  register={register}
                  errors={errors}
                  rules={{ required: 'ກະລຸນາປ້ອນອີເມວພະນັກງານ' }}
                />

                <Input
                  label={t('label_password')}
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Enter your password..."
                  register={register}
                  rules={{
                    required: 'Please enter a password',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
                    },
                    validate: (value) => value.length >= 8 || 'Password must be at least 8 characters',
                  }}
                  errors={errors}
                />
                <Input
                  label={t('label_confirm_password')}
                  type="password"
                  name="confirm_password"
                  placeholder="Enter your password..."
                  register={register}
                  rules={{
                    required: 'Please enter a confirm password',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                    validate: (value) => value === watch('password') || 'Passwords do not match',
                  }}
                  errors={errors}
                />
              </>
            )}
          </div>
          <div className="flex justify-end gap-4 pt-6">
            <Button type="submit" children={isEditMode ? t('btn_edit_data') : t('btn_save_data')} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
