import Button from '@/components/Button';
import DatePicker from '@/components/Forms/DatePicker';
import Search from '@/components/Forms/Search';
import { OrderStatus } from '@/configs';
import { iconFileOut, iconCalendar } from '@/configs/icon';
import useOrderHook from '@/hooks/order/useOrderHook';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const HeaderOrderComponent: React.FC = () => {
  const { t } = useTranslation();
  const { getOrderHook, queryParams, setQueryParams } = useOrderHook();

  const currentStatus = OrderStatus.OnDelivery;
  const handleSearchChange = (searchTerm: string) => {
    console.log('Search input:', searchTerm);
    setQueryParams((prev) => ({
      ...prev,
      search: searchTerm,
      page: 1,
      status: currentStatus,
    }));
  };

  useEffect(() => {
    console.log('Fetching with search:', queryParams.search);
    getOrderHook({
      ...queryParams,
      page: queryParams.page || 1,
      limit: queryParams.limit || 10,
      status: currentStatus,
    });
  }, [queryParams.search, queryParams.page, queryParams.limit]);
  return (
    <div>
      <div className="w-full p-4 py-4 md:grid md:grid-cols-3">
        <div>
          <Search
            type="small"
            name="search"
            placeholder={t('search')}
            className="rounded-xl bg-contains_mainly_blue p-4"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div>
          {/* <DatePicker
            showIcon={false}
            icon={iconCalendar}
            className="rounded-lg bg-contains_mainly_blue"
            name={'transfer_time'}
            control={control}
            placeholder="ເລືອກວັນທີ "
          /> */}
        </div>
      </div>
    </div>
  );
};

export default HeaderOrderComponent;
