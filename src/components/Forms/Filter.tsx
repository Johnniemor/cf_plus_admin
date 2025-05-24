import { FC, useState, useEffect } from 'react';

type TOptions = { key: string; value: string };

type TFilter = {
  label?: string;
  name: string;
  options: Array<string> | Array<TOptions>;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  loading?: boolean;
  className?: string;
};

const Filter: FC<TFilter> = ({
  label,
  name,
  options,
  defaultValue,
  disabled = false,
  onChange,
  loading = false,
  className,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue || '');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (onChange) onChange(value);
  };

  useEffect(() => {
    if (defaultValue) setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="mb-5.5">
      {label && (
        <label className="mb-2.5 block text-black dark:text-white" htmlFor={name}>
          {label}
        </label>
      )}

      <div className="relative z-20 min-w-40 bg-transparent dark:bg-form-input">
        {loading ? (
          <div className="px-5 py-3 text-gray-500 dark:text-gray-400">Loading...</div>
        ) : (
          <select
            value={selectedValue}
            onChange={handleChange}
            disabled={disabled}
            className={`relative z-20 w-full appearance-none rounded border border-stroke px-5 py-3 capitalize text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-meta-4 ${
              disabled ? 'bg-gray-3' : ''
            } ${className}`}
          >
            <option value="" disabled className="text-body dark:text-bodydark">
              {name}
            </option>
            {options.map((option, index) => (
              <option
                key={index}
                value={typeof option === 'string' ? option : option.value}
                className="text-body dark:text-bodydark"
              >
                {typeof option === 'string' ? option : option.key}
              </option>
            ))}
          </select>
        )}

        <span className="pointer-events-none absolute right-2 top-1/2 z-30 -translate-y-1/2">
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
    </div>
  );
};

Filter.displayName = 'Filter';

export default Filter;
