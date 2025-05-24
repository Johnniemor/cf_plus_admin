import user from '@/api/user';
import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import { iconMail } from '@/configs/icon';
import { IEmail } from '@/types/user';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import InboxEmail from './InboxEmail';
import LogoCF from '@/assets/logo/logo_cf.png';
import ImageForgot from '@/assets/auth/forgot_password.png';
import DarkModeSwitcher from '@/layout/Header/DarkModeSwitcher';
import { useTranslation } from 'react-i18next';
import SwitchLang from '@/components/SwitchLang';

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    watch,
  } = useForm<IEmail>();
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState();

  const email = watch('email');
  const { t } = useTranslation();

  const onSubmit = async (data: IEmail) => {
    try {
      const response = await user.forgotPassword(data);

      if (response.data) setResponse(response.data);
    } catch (error: any) {
    } finally {
      setSubmitted(true);
      toast.success('Email sent successfully! Please check your email.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-boxdark">
      {submitted ? (
        <InboxEmail
          email={email}
          message={t('sub_title_email_box')}
          action="forgotPassword"
          backAuth
          response={response}
        />
      ) : (
        <div className="flex">
          <div className="hidden w-4/6 lg:block">
            <div className="sticky top-0 flex h-screen items-center justify-center bg-[url('@/assets/auth/bg_auth.png')] bg-cover bg-center">
              <img src={ImageForgot} alt="CF+" loading="lazy" className="z-10 w-[800px] object-contain" />
              <div className="absolute z-1 hidden h-full w-full bg-[#24303fB0] dark:block" />
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-2xl px-6 py-10 lg:px-12">
            <div className="flex justify-end gap-4">
              <DarkModeSwitcher />
              <SwitchLang />
            </div>
            <div className="flex h-full items-center justify-center">
              <div className="mb-[10%] w-full">
                <div className="mb-10 flex items-center gap-2">
                  <div className="rounded-full bg-periwinkleblue p-3">
                    <img className="h-10 w-10 object-contain lg:h-14 lg:w-14" src={LogoCF} alt="CF+" />
                  </div>
                  <h1 className="text-xl font-semibold text-royalblue dark:text-white lg:text-2xl">
                    {t('login.title_login')}
                  </h1>
                </div>

                <h1 className="mb-2 mt-7 text-3xl font-bold text-black dark:text-white">
                  {t('forgot_password.title_forgot_password')}
                </h1>
                <p className="text-base text-[#797979]">{t('forgot_password.sub_title_forgot')}</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-6">
                    <Input
                      floating
                      name="email"
                      placeholder={t('placeholder_email')}
                      floatingName={t('forgot_password.floating_email')}
                      register={register}
                      rules={{
                        required: t('forgot_password.error_email'),
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: t("forgot_password.val_email"),
                        },
                      }}
                      errors={errors}
                    >
                      {iconMail}
                    </Input>
                  </div>
                  <div className="mt-10">
                    <Button
                      shape="rounded"
                      type="submit"
                      variant="info"
                      className="w-full bg-royalblue py-4 font-bold"
                      loading={isLoading || isSubmitting}
                    >
                      {t('forgot_password.btn_send')}
                    </Button>
                  </div>
                  <div className="mt-7 flex justify-center gap-1 text-center">
                    {t('forgot_password.label_back_to')}
                    <NavLink className="text-royalblue hover:underline dark:text-white" to="/auth">
                      {t('btn_login')}
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
