import { ReactNode } from 'react';
import { RegisterOptions } from 'react-hook-form';

type TTextarea = {
  label?: string;
  name: string;
  placeholder?: string;
  value?: any;
  rows?: number;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  register?: any;
  errors?: any;
  rules?: RegisterOptions;
};

const Textarea = (props: TTextarea) => {
  const {
    label,
    name,
    value,
    placeholder,
    rows = 1,
    children,
    className = '',
    disabled,
    register,
    errors,
    rules,
  } = props;

  return (
    <div className="mb-5.5">
      {label && (
        <label
          className="mb-2.5 block text-black dark:text-white"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {children && (
          <span className="absolute left-4 top-7 transform -translate-y-1/2">
            {children}
          </span>
        )}
        <textarea
          className={`w-full rounded py-4 pr-10 text-black focus-visible:outline-none dark:bg-form-input dark:disabled:bg-meta-4 disabled:cursor-not-allowed dark:text-white focus:border-primary dark:focus:border-primary  ${children ? 'pl-11.5' : 'pl-3'} ${
            errors[name]
              ? 'border border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500'
              : 'border border-stroke dark:border-strokedark'
          } ${className}`}
          disabled={disabled}
          id={name}
          name={name}
          placeholder={placeholder || value}
          defaultValue={value}
          rows={rows}
          {...register(name, rules)}
        />
      </div>
      {errors[name] && (
        <span className="text-red-500 text-sm ml-2">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};

Textarea.displayName = 'Textarea';

export default Textarea;
