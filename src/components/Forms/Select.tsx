import { FC } from 'react';
import { Controller } from 'react-hook-form';

type TOption = {
  label: string;
  value: string;
};

type TSelect = {
  label: string;
  name: string;
  options: Array<TOption | string>;
  control: any;
  rules?: any;
  error?: any;
  children?: React.ReactNode;
  defaultValue?: string | number | TOption;
  disabled?: boolean;
  className?: string;
  classLabel?: string;
  placeholder?: string;
  onCreate?: React.ReactNode;
  onCreateClick?: () => void;
  onChange?: (value: string) => void;
};

const Select: FC<TSelect> = ({
  label,
  name,
  options,
  control,
  rules,
  error,
  children,
  defaultValue,
  disabled = false,
  className = '',
  placeholder,
  onCreate,
  onCreateClick,
  classLabel,
  onChange,
}) => {
  return (
    <div className="w-full rounded-xl">
      <label className={`block ${classLabel} block text-primarySecond dark:text-gray-500 `}>{label}</label>

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        {children && <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">{children}</span>}
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <select
              {...field}
              disabled={disabled}
              onChange={(e) => {
                if (onChange) {
                  onChange(e.target.value);
                }

                if (e.target.value === 'create_new' && onCreateClick) {
                  onCreateClick();
                }
                field.onChange(e);
              }}
              value={defaultValue || field.value}
              className={`relative z-20 w-full appearance-none rounded border border-stroke bg-contains_mainly_blue px-5 py-3 capitalize text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-meta-4 ${error ? 'border-red-500' : ''} ${children ? 'pl-10.5' : ''} ${disabled ? 'bg-gray-3' : ''} ${className}`}
            >
              <option value="" className={`text-gray-500`}>
                {placeholder}
              </option>
              {options && options.length > 0 ? (
                options.map((data, index) =>
                  typeof data === 'string' ? (
                    <option key={index} value={data} className="text-body dark:text-bodydark">
                      {data}
                    </option>
                  ) : (
                    <option key={index} value={data.value} className="text-body dark:text-bodydark">
                      {data.label}
                    </option>
                  ),
                )
              ) : (
                <option value="create_new" className="text-gray-500" onClick={onCreateClick}>
                  {onCreate}
                </option>
              )}
            </select>
          )}
        />

        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

Select.displayName = 'Select';

export default Select;
