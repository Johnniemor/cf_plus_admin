import { ITab } from '@/types/component';

interface NavigationProps {
  tabs: ITab[];
  currentTab: ITab;
  className?: string;
}

const TabMilestone = ({ tabs = [], className = '', currentTab }: NavigationProps) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="border-b border-gray-200">
        <nav className="relative flex w-full">
          {tabs.map((tab: ITab, index) => (
            <div key={tab.name} className="group flex-1 px-1 py-5 text-center">
              <div className={index <= tabs.indexOf(currentTab) ? 'text-periwinkleblue' : ''}>
                <p className="inline-flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-periwinkleblue text-lg text-white lg:text-xl">
                    {index + 1}
                  </span>
                  {tab.name}
                </p>
                {tab.subText && <div className="mt-1 text-xs text-gray-500">{tab.subText}</div>}
              </div>
            </div>
          ))}
          <div
            className="absolute bottom-0 h-1 rounded-md bg-periwinkleblue transition-all duration-300 ease-in-out"
            style={{
              width: `${(100 / tabs.length) * (tabs.findIndex((t) => t.name === currentTab.name) + 1)}%`,
            }}
          />
        </nav>
      </div>

      <div className="transition-opacity duration-300 ease-in-out">{currentTab.component}</div>
    </div>
  );
};

export default TabMilestone;
