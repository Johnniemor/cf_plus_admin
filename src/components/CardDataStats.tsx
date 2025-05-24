import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title?: string;
  total?: string | number;
  rate?: string | number;
  short?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  short,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>
      <h6 className="text-sm font-medium mb-[-12px] mt-1">{title}</h6>

      <div className="mt-4 flex items-end w-full">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white whitespace-nowrap">
            {total}
          </h4>
          <p
            className={`flex items-center gap-1 text-sm font-medium ${
              typeof short === 'undefined'
                ? ''
                : short
                  ? 'text-meta-7'
                  : 'text-meta-3'
            }`}
          >
            {typeof short === 'undefined' ? '' : short ? '' : '+'}
            {rate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
