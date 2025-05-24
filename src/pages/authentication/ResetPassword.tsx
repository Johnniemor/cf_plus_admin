import user from '@/api/user';
import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import { iconLocked } from '@/configs/icon';
import { ISetPassword } from '@/types/user';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import LogoCF from '@/assets/logo/logo_cf.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TOKEN_KEY } from '@/lib/axios';
import ImageReset from '@/assets/auth/reset_password.png';
import { useTranslation } from 'react-i18next';
import SwitchLang from '@/components/SwitchLang';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    watch,
  } = useForm<ISetPassword>();
  const [searchParams] = useSearchParams();
  const recover_token = searchParams.get('recover_token');
  const { t } = useTranslation();

  const onSubmit = async (data: ISetPassword) => {
    try {
      if (!recover_token) return toast.error('An unexpected error occurred. Please try again.');
      const response = await user.resetPassword({ ...data, recover_token });
      if (response.data) {
        toast.success('Your password has been reset successfully');
        navigate('/auth');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const verifyToken = async () => {
    try {
      if (!recover_token) return navigate('/auth');
      const response = await user.verifyResetPasswordToken({ recover_token });
      if (!response?.data) navigate('/auth');
    } catch (error: any) {
      toast.error(error.message);
      navigate('/auth');
    }
  };

  useEffect(() => {
    if (localStorage.getItem(TOKEN_KEY)) {
      navigate('/');
      return;
    }
    verifyToken();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white dark:bg-boxdark">
      <div className="flex">
        <div className="hidden w-4/6 lg:block">
          <div className="sticky top-0 flex h-screen items-center justify-center bg-[url('@/assets/auth/bg_auth.png')] bg-cover bg-center">
            <img src={ImageReset} alt="CF+" loading="lazy" className="z-10 w-[800px] object-contain" />
            <div className="absolute z-1 hidden h-full w-full bg-[#24303fB0] dark:block" />
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-2xl items-center justify-center px-6 py-10 lg:px-12">
          <div className="w-full">
            <div className="mb-10 flex items-center gap-2">
              <div className="rounded-full bg-periwinkleblue p-3">
                <img className="h-10 w-10 object-contain lg:h-14 lg:w-14" src={LogoCF} alt="CF+" />
              </div>
              <h1 className="text-xl font-semibold text-royalblue dark:text-white lg:text-2xl">
                {t('login.title_login')}
              </h1>
            </div>

            <h1 className="mb-2 mt-7 text-3xl font-bold text-black dark:text-white">
              {t('reset_password.title_enter_new_pass')}
            </h1>
            <p className="text-base text-[#797979]">{t('reset_password.sub_title_new_pass')}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-6">
                <Input
                  floating
                  type="password"
                  name="password"
                  floatingName={t('reset_password.floating_password')}
                  placeholder={t('reset_password.placeholder_enter_pass')}
                  autoComplete="new-password"
                  register={register}
                  rules={{
                    required: `${t('reset_password.error_password')}`,
                    minLength: {
                      value: 8,
                      message: t('reset_password.val_min'),
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: `${t('reset_password.val_regax_password')}`,
                    },
                  }}
                  errors={errors}
                >
                  {iconLocked}
                </Input>
              </div>

              <div className="mb-6">
                <Input
                  floating
                  type="password"
                  name="confirm_password"
                  autoComplete="new-password"
                  floatingName={t('reset_password.floating_confirm_pass')}
                  placeholder={t('reset_password.placeholder_enter_confirm_pass')}
                  register={register}
                  rules={{
                    required: `${t('reset_password.error_confirm_password')}`,
                    validate: (value) => value === watch('password') || t('reset_password.error_password_do_not_match'),
                  }}
                  errors={errors}
                >
                  {iconLocked}
                </Input>
              </div>

              <div className="mt-9">
                <Button
                  shape="rounded"
                  type="submit"
                  variant="info"
                  className="w-full bg-royalblue py-4 font-bold"
                  loading={isLoading || isSubmitting}
                >
                  {t('reset_password.btn_reset_pass')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
