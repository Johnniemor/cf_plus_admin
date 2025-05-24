import { useEffect, useState } from 'react';
import { ITab } from '@/types/component';

interface NavigationProps {
  tabs?: ITab[];
  defaultActiveTab?: string;
  onTabChange?: (tabName: string) => void;
  activeColor?: string;
  className?: string;
  mainTextClassName?: string;
  subTextClassName?: string;
}

const Tab = ({
  tabs = [],
  defaultActiveTab,
  onTabChange,
  activeColor = 'blue',
  className = '',
  mainTextClassName = 'text-sm font-medium',
  subTextClassName = 'text-xs mt-1 text-gray-500',
}: NavigationProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.name);

  const handleTabClick = (tabMain: string) => {
    setActiveTab(tabMain);
    onTabChange?.(tabMain);
  };

  useEffect(() => {
    if (defaultActiveTab) {
      setActiveTab(defaultActiveTab);
    }
  }, [defaultActiveTab]);

  const getActiveStyles = (isActive: boolean) => {
    return isActive
      ? `border-periwinkleblue dark:text-white text-periwinkleblue`
      : 'border-transparent text-black dark:text-white hover:text-gray-700 hover:border-gray-300';
  };
  const component = tabs.find((tab) => tab.name === activeTab)?.component;

  return (
    <div className={`w-full ${className} `}>
      <div className="border-b border-gray-200">
        <nav className="flex w-full">
          {tabs.map((tab: ITab) => (
            <div key={tab.name} onClick={() => handleTabClick(tab.name)} className="group flex-1 cursor-pointer">
              <div
                className={`border-b-4 px-1 py-4 text-center transition-all duration-300 ease-in-out ${getActiveStyles(activeTab === tab.name)} `}
              >
                <div
                  className={`${mainTextClassName}text-periwinkleblue relative inline-flex items-center font-normal transition-colors duration-300 ease-in-out`}
                >
                  {tab.name}
                  {tab.isShow && tab.count !== undefined && tab.count > 0 && (
                    <span className="absolute -right-5 -top-3 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900">
                      {tab.count}
                    </span>
                  )}
                </div>
                {tab.subText && <div className={subTextClassName}>{tab.subText}</div>}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="transition-opacity duration-300 ease-in-out">{component}</div>
    </div>
  );
};

export default Tab;
