import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { iconConfirmPass, iconLocked, iconMail, iconPage, iconUser } from '@/configs/icon';
import Input from '@/components/Forms/Input';
import Button from '@/components/Button';
import { IRegister } from '@/types/user';
import user from '@/api/user';
import LogoCF from '@/assets/logo/logo_cf.png';
import ImageAuth from '@/assets/auth/login.png';
import InboxEmail from './InboxEmail';
import DarkModeSwitcher from '@/layout/Header/DarkModeSwitcher';
import { useTranslation } from 'react-i18next';
import SwitchLang from '@/components/SwitchLang';

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    watch,
    setError,
  } = useForm<IRegister>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [response, setResponse] = useState();
  const email = watch('email');
  const { t } = useTranslation();

  const onSubmit = async (data: IRegister) => {
    try {
      const response = await user.register(data);
      if (response.data) {
        toast.success(response.data.message);
        setResponse(response.data);
        setIsSuccess(true);
      }
    } catch (error: any) {
      if (error.data?.invalid_fields) {
        error.data.invalid_fields.map((item: keyof IRegister) =>
          setError(item, {
            type: 'manual',
            message: `That ${item} is already in use. Please enter a different ${item}.`,
          }),
        );
      }
      toast.error(error?.message || error?.data || 'Network Error!');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-boxdark">
      {isSuccess ? (
        <InboxEmail email={email} message={t('sub_title_email_box')} action="resendEmail" response={response} />
      ) : (
        <div className="flex">
          <div className="hidden w-4/6 lg:block">
            <div className="sticky top-0 flex h-screen items-center justify-center bg-[url('@/assets/auth/bg_auth.png')] bg-cover bg-center">
              <div className="absolute hidden h-full w-full bg-[#24303fB0] dark:block" />
              <img src={ImageAuth} alt="CF+" loading="lazy" className="z-10 w-[800px]" />
            </div>
          </div>
          <div className="mx-auto w-full max-w-2xl px-6 py-10 lg:px-12">
            <div className="flex justify-end gap-4">
              <DarkModeSwitcher />
              <SwitchLang />
            </div>
            <div className="flex h-full items-center justify-center">
              <div className="w-full">
                <div className="mb-10 flex items-center gap-2">
                  <div className="rounded-full bg-periwinkleblue p-3">
                    <img className="h-10 w-10 object-contain lg:h-14 lg:w-14" src={LogoCF} alt="CF+" />
                  </div>
                  <h1 className="text-xl font-semibold text-royalblue dark:text-white lg:text-2xl">
                    {t('login.title_login')}
                  </h1>
                </div>
                <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">
                  {t('register.title_register_account')}
                </h1>
                <p className="mb-8 font-light text-[#797979]"> {t('register.sub_title_register_account')}</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-5">
                    <Input
                      floating
                      name="email"
                      autoComplete="new-email"
                      floatingName={t('register.floating_email')}
                      placeholder={t('register.placeholder_email')}
                      register={register}
                      rules={{
                        required: `${t('register.error_email')}`,
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: t('register.val_email'),
                        },
                      }}
                      errors={errors}
                    >
                      {iconMail}
                    </Input>
                  </div>
                  <div className="mb-5">
                    <Input
                      floating
                      type="text"
                      name="username"
                      floatingName={t('register.floating_username')}
                      autoComplete="new-email"
                      placeholder={t('register.placeholder_username')}
                      register={register}
                      rules={{ required: `${t('register.error_username')}` }}
                      errors={errors}
                    >
                      {iconPage}
                    </Input>
                  </div>

                  <div className="mb-5">
                    <Input
                      floating
                      type="text"
                      name="fullname"
                      floatingName={t('register.floating_fullname')}
                      placeholder={t('register.placeholder_fullname')}
                      register={register}
                      rules={{ required: `${t('register.error_fullname')}` }}
                      errors={errors}
                    >
                      {iconUser}
                    </Input>
                  </div>
                  <div className="mb-5">
                    <Input
                      floating
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      placeholder={t('register.placeholder_password')}
                      floatingName={t('register.floating_password')}
                      register={register}
                      rules={{
                        required: `${t('register.error_password')}`,
                        minLength: {
                          value: 8,
                          message: `${t('register.val_min')}`,
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message: `${t('register.val_regax_password')}`,
                        },
                        validate: (value) => value.length >= 8 || `${t('register.val_min')}`,
                      }}
                      errors={errors}
                    >
                      {iconLocked}
                    </Input>
                  </div>

                  <div className="mb-5">
                    <Input
                      floating
                      type="password"
                      name="confirm_password"
                      placeholder={t('register.placeholder_confirm_password')}
                      floatingName={t('register.floating_confirm_password')}
                      register={register}
                      rules={{
                        required: `${t('register.error_confirm_password')}`,
                        minLength: {
                          value: 8,
                          message: `${t('register.val_min')}`,
                        },
                        validate: (value) =>
                          value === watch('password') || `${t('register.error_password_do_not_match')}`,
                      }}
                      errors={errors}
                    >
                      {iconConfirmPass}
                    </Input>
                  </div>
                  <div className="mt-10">
                    <Button
                      shape="rounded"
                      type="submit"
                      variant="info"
                      className="w-full bg-royalblue py-4 text-sm font-bold md:text-base"
                      loading={isLoading || isSubmitting}
                    >
                      {t('register.btn_sing_up')}
                    </Button>
                  </div>

                  <p className="mt-7 flex justify-center gap-1 text-center text-sm dark:text-white md:text-base">
                    {t('register.label_already_have_account')}
                    <NavLink to="/auth" className="text-sm text-royalblue underline dark:text-white md:text-base">
                      {t('register.label_login')}
                    </NavLink>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
