import TabComponent from '@/components/Tab';
import HeaderOrderComponent from './component/HeaderOrderComponent';
import AllOrder from './component/AllOrder';
import PendingStatePage from './component/ManagePendingState';
import PayAlready from './component/ManagePayState';
import PackProduct from './component/ManagePackProduct';
import SuccessfulDelivery from './component/ManageSuccessfulDilivery';
import CancelProduct from './component/ManageCancelProduct';
import { ITab } from '@/types/component';
import InProgressDelivery from './component/ManageOrderDelevery';
import CartState from './component/ManageCartState';
import useOrderHook from '@/hooks/order/useOrderHook';
import { useEffect, useState } from 'react';
import { ICountOrder } from '@/types/order/order';
import { useTranslation } from 'react-i18next';
import { OrderStatus } from '@/configs';
import Button from '@/components/Button';
import { iconFileOut } from '@/configs/icon';

const OrderPage: React.FC = () => {
  const { getOrderCount } = useOrderHook();
  const [count, setCount] = useState<ICountOrder>();
  const { t } = useTranslation();
  const [currentStatus, setCurrentStatus] = useState<OrderStatus | undefined>(undefined);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrderCount();
        setCount(res.data);
        return res;
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, []);

  const tabs: Array<ITab> = [
    { name: t('cf_order.tab_all'), component: <AllOrder /> },
    { name: t('cf_order.tab_cart'), component: <CartState />, count: count?.in_cart || 0, isShow: true },
    { name: t('cf_order.tab_not_paid'), component: <PendingStatePage />, count: count?.pending || 0, isShow: true },
    { name: t('cf_order.tab_transferred'), component: <PayAlready />, count: count?.verified || 0, isShow: true },
    { name: t('cf_order.tab_packing_preparing'), component: <PackProduct />, count: count?.packed || 0, isShow: true },
    {
      name: t('cf_order.tab_delivering'),
      component: <InProgressDelivery />,
      count: count?.on_delivery || 0,
      isShow: true,
    },
    { name: t('cf_order.tab_success'), component: <SuccessfulDelivery /> },
    { name: t('cf_order.tab_cancel'), component: <CancelProduct /> },
  ];

  const handleTabChange = (tabName: string) => {
    const index = tabs.findIndex((tab) => tab.name === tabName);
    if (index !== -1) {
      setActiveTabIndex(index);
    }
  };

  return (
    <div className="w-full rounded-lg bg-white dark:bg-boxdark">
      <div className="flex items-center justify-between border-b-2 border-gray-300 p-4">
        <div>
          <h1 className="text-2xl font-medium">{t('cf_order.title_order')}</h1>
        </div>
        <div>
          <Button
            className="rounded-xl border-2 border-gray-300 bg-white text-periwinkleblue"
            children={
              <div className="text-sm font-normal text-periwinkleblue dark:text-periwinkleblue md:text-base md:font-bold">
                {t('btn_export_data')}
              </div>
            }
            name="export"
            icon={<div className="hidden sm:block">{iconFileOut}</div>}
          />
        </div>
      </div>
      <div className="w-full">
        <TabComponent
          tabs={tabs}
          onTabChange={handleTabChange}
          defaultActiveTab={tabs[activeTabIndex]?.name}
          mainTextClassName="text-sm font-medium"
        />
      </div>
    </div>
  );
};

export default OrderPage;
