import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import user from '@/api/user';
import { TOKEN_KEY } from '@/lib/axios';

import Button from '@/components/Button';
import Loader from '@/components/Common/Loader';

import IconSuccess from '@/assets/auth/success.png';
import IconFailed from '@/assets/auth/failed.png';
import FreeLayout from '@/layout/FreeLayout';
import { useTranslation } from 'react-i18next';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const { t } = useTranslation();

  const verifyEmail = async () => {
    const verification_token = searchParams.get('verification_token');
    if (!verification_token) return setIsLoading(false);
    try {
      const { data } = await user.verifyEmail({ verification_token });
      if (data) setIsVerified(true);
    } catch (error) {
      setIsVerified(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem(TOKEN_KEY)) {
      navigate('/');
      return;
    }
    verifyEmail();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
        <Loader />
      </div>
    );
  }

  return (
    <FreeLayout>
      <div className="bg-gray-50 rounded-2xl py-10 dark:bg-boxdark">
        <div className="text-center">
          <img
            src={isVerified ? IconSuccess : IconFailed}
            alt={isVerified ? 'Success' : 'Failed'}
            className="mx-auto mb-8 h-60 w-60 object-contain"
          />
          <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl">
            {isVerified ? t('verification.title_welcome') : t('verification.title_failed')}
          </h1>
          <p className="mb-8 text-base font-medium text-gray-600 dark:text-gray-300 lg:text-lg">
            {isVerified ? t('verification.content_successMessage') : t('verification.content_errorMessage')}
          </p>
          <Button onClick={() => navigate('/auth')}>{t('verification.btn_go_to_login')}</Button>
        </div>
      </div>
    </FreeLayout>
  );
};

export default VerifyEmail;
