import user from '@/api/user';
import Button from '@/components/Button';
import Input from '@/components/Forms/Input';
import { iconLocked, iconMail } from '@/configs/icon';
import { TOKEN_KEY } from '@/lib/axios';
import { setUser } from '@/redux/reducer/user';
import { ILogin } from '@/types/user';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageAuth from '@/assets/auth/login.png';
import LogoCF from '@/assets/logo/logo_cf.png';
import InboxEmail from './InboxEmail';
import DarkModeSwitcher from '@/layout/Header/DarkModeSwitcher';
import { useTranslation } from 'react-i18next';
import SwitchLang from '@/components/SwitchLang';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
  } = useForm<ILogin>();
  const [verifyEmail, setVerifyEmail] = useState(null);
  const { t } = useTranslation();

  const onSubmit = async (data: ILogin) => {
    try {
      const response = await user.login({ username: data.username, password: data.password });
      if (response?.data?.user) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        dispatch(setUser(response.data.user));
        toast.success('Sign in successfully');
        return navigate('/');
      } else {
        toast.error('Invalid login response');
      }
    } catch (error: any) {
      if (error.data?.need_verify) setVerifyEmail(error.data.email);
      toast.error(error?.message || error?.data || 'Network Error!');
    } finally {
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-boxdark">
      {verifyEmail ? (
        <InboxEmail
          email={verifyEmail}
          reset={() => setVerifyEmail(null)}
          message={t('sub_title_email_box')}
          action="resendEmail"
          backAuth
        />
      ) : (
        <div className="flex">
          <div className="hidden w-4/6 lg:block">
            <div className="sticky top-0 flex h-screen items-center justify-center bg-[url('@/assets/auth/bg_auth.png')] bg-cover bg-center">
              <img src={ImageAuth} alt="CF+" loading="lazy" className="z-10 w-[800px]" />
              <div className="absolute hidden h-full w-full bg-[#24303fB0] dark:block" />
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
                <h1 className="mb-2 text-2xl font-bold text-black dark:text-white"> {t('login.label_welcome')} 👋 </h1>
                <p className="mb-8 font-light text-[#797979]">{t('login.label_please_login')} </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <Input
                      floating
                      floatingName={t('login.floating_username')}
                      name="username"
                      placeholder={t('login.placeholder_login_email')}
                      register={register}
                      rules={{
                        required: t('login.error_user_or_email'),
                      }}
                      errors={errors}
                    >
                      {iconMail}
                    </Input>
                  </div>

                  <div className="mb-4">
                    <Input
                      floating
                      type="password"
                      name="password"
                      floatingName={t('login.floating_password')}
                      placeholder={t('login.placeholder_login_password')}
                      register={register}
                      rules={{ required: t('login.error_password') }}
                      errors={errors}
                    >
                      {iconLocked}
                    </Input>
                  </div>

                  <div className="text-right dark:text-white">
                    <span
                      onClick={() => navigate('forgot-password')}
                      className="cursor-pointer text-royalblue hover:underline dark:text-white"
                    >
                      {t('login.label_forgot_password')}
                    </span>
                  </div>
                  <div className="mt-9">
                    <Button
                      shape="rounded"
                      type="submit"
                      variant="info"
                      className="w-full bg-royalblue py-4 font-bold"
                      loading={isLoading || isSubmitting}
                    >
                      {t('login.btn_login')}
                    </Button>
                  </div>

                  <p className="mt-7 flex justify-center gap-1 text-center dark:text-white">
                    {t('login.label_do_not_account')}
                    <a
                      onClick={() => navigate('register')}
                      className="cursor-pointer text-royalblue underline dark:text-white"
                    >
                      {t('login.label_register')}
                    </a>
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

export default Login;
