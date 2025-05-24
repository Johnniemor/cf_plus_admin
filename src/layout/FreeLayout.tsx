import LogoCF from '@/assets/logo/logo_cf.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function FreeLayout(props: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-white px-6 dark:bg-boxdark md:px-20">
      <div className="container mx-auto bg-white dark:bg-boxdark">
        <div className="mb-10 flex cursor-pointer items-center gap-3 py-10" onClick={() => navigate('/')}>
          <div className="rounded-full bg-periwinkleblue p-3">
            <img src={LogoCF} alt="CF+" className="h-10 w-10 object-contain lg:h-14 lg:w-14" />
          </div>
          <h1 className="text-xl font-semibold text-royalblue dark:text-white lg:text-2xl">{t('login.title_login')}</h1>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default FreeLayout;
