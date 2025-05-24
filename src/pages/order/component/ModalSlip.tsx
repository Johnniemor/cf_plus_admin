import { iconCancel } from '@/configs/icon';
import { useTranslation } from 'react-i18next';

interface PropSlip {
  show: boolean;
  setShow: any;
  image: string;
}
const ModalSlip: React.FC<PropSlip> = ({ setShow, show, image }) => {
  const { t } = useTranslation();
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-9999 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 px-6 pt-20 outline-none">
      <div className="relative mx-auto my-6 w-[410px] max-w-full">
        <div className="relative z-10 flex w-full flex-col rounded-xl border border-stroke bg-white shadow-default outline-none focus:outline-none dark:border-strokedark dark:bg-boxdark">
          <div className="flex justify-between border-b-2 border-gray-300 p-4 pb-4">
            <h1 className="text-xl font-bold text-gray-600 dark:text-white">
              {t('cf_order_detail.title_slip_transfer')}
            </h1>
            <button onClick={() => setShow(false)}>
              <div className="text-royalblue dark:text-white">{iconCancel}</div>
            </button>
          </div>
          <div className="">
            <div className="flex justify-center px-4 pt-2 text-center md:px-10">
              <h1>{t('cf_order_detail.sub_title_check_account')}</h1>
            </div>
            <div className="flex justify-center py-4">
              <img src={image} alt="" className="h-[720px] object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSlip;
