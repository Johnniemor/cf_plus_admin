import TabMilestone from '@/components/Tab/TabMilestone';
import { ITab } from '@/types/component';
import Bank from './Bank';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import CreateWarehouse from './CreateWarehouse';

function Onboarding() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const tabs: Array<ITab> = [
    { name: t('onboarding.tab_title_1'), component: <CreateWarehouse next={() => setActiveTab(1)} /> },
    { name: t('onboarding.tab_title_2'), component: <Bank next={() => setActiveTab(2)} /> },
    { name: t('onboarding.tab_title_3'), component: <Bank next={() => setActiveTab(3)} /> },
    { name: t('onboarding.tab_title_4'), component: <Bank next={() => setActiveTab(4)} /> },
    { name: t('onboarding.tab_title_5'), component: <Bank /> },
  ];

  return (
    <div className="overflow-hidden rounded-lg bg-white dark:bg-boxdark">
      <TabMilestone tabs={tabs} currentTab={tabs[activeTab]} />
    </div>
  );
}

export default Onboarding;
