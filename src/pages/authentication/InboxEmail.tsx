import user from '@/api/user';
import ImageCheckEmail from '@/assets/auth/check_email.png';
import { getSecondsCooldown, maskEmail } from '@/lib/helper';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import FreeLayout from '@/layout/FreeLayout';
import { useTranslation } from 'react-i18next';

type TInboxEmail = {
  email: string;
  message: string;
  action: 'resendEmail' | 'forgotPassword';
  response?: {
    sent_time: number;
    resend_at: Date;
  };
  backAuth?: boolean;
  reset?: any;
};

function InboxEmail(props: TInboxEmail) {
  const { message, email, action, backAuth, response, reset } = props;
  const [loading, setLoading] = useState(false);
  const [resendAt, setResendAt] = useState<Date | null>(response?.resend_at || null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [cooldown, setCooldown] = useState<number>(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (!resendAt) return;
    let intervalId: ReturnType<typeof setInterval>;
    const updateCooldown = () => {
      const secondsLeft = getSecondsCooldown(resendAt);
      setCooldown(secondsLeft);
      if (secondsLeft <= 0) clearInterval(intervalId);
    };

    updateCooldown();
    intervalId = setInterval(updateCooldown, 1000);
    return () => clearInterval(intervalId);
  }, [resendAt]);

  const resendEmail = async () => {
    try {
      setLoading(true);
      const result = await user[action]({ email });
      if (result.data?.resend_at) {
        setResendAt(result.data.resend_at);
      }
      toast.success("We've resent the verification email");
    } catch (error: any) {
      if (error.data?.info && error.data?.info === 'temp_locked') {
        setIsAvailable(false);
      }
      toast.error(error?.message || error?.data || 'Network Error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FreeLayout>
      <div className="flex flex-wrap lg:items-center">
        <div className="mt-30 w-full justify-items-center text-right lg:mt-0 lg:w-4/6">
          <img src={ImageCheckEmail} alt="CF+" className="w-full lg:w-[80%]" />
        </div>

        <div className="mt-12 w-full text-center lg:w-2/6 lg:text-left">
          <h1 className="mb-4 text-2xl font-bold text-black dark:text-white md:text-3xl">{t('check_email_box')}</h1>
          <p className="text-base dark:text-white md:text-lg">{message}</p>
          {email && (
            <p className="mt-2 font-medium dark:text-gray-400">
              {t('email_send_to')}: {maskEmail(email)}
            </p>
          )}
          {isAvailable && (
            <p className="mt-4">
              {cooldown > 0 ? (
                <span className="text-gray-500">
                  	
                  { t("wait_seconds", { cooldown })}

                </span>
              ) : (
                <span
                  onClick={resendEmail}
                  className={`cursor-pointer font-medium text-royalblue hover:underline dark:text-blue-400 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  {loading ? t('btn_sending') : t('btn_click_here_to_resend')}
                </span>
              )}
            </p>
          )}
          {backAuth && (
            <p className="mt-6">
              <NavLink
                to="/auth"
                className="cursor-pointer font-medium text-gray-600 hover:text-royalblue hover:underline hover:dark:text-white"
                onClick={reset && reset}
              >
                &larr; {t('btn_back_to_login')}
              </NavLink>
            </p>
          )}
        </div>
      </div>
    </FreeLayout>
  );
}

export default InboxEmail;
