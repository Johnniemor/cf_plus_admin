import { iconErrorInformation } from '@/configs/icon';
import { ReactNode, useState } from 'react';
import { RegisterOptions } from 'react-hook-form';
import _ from 'lodash';

type TInput = {
  type?: string;
  label?: string;
  name: string;
  placeholder?: string;
  value?: any;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  register?: any;
  errors?: any;
  rules?: RegisterOptions;
  autoComplete?: string;
  step?: string | number;
  min?: string | number;
  max?: string | number;
  floating?: boolean;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  height?: number;
  defaultChecked?: boolean;
  floatingName?: string;
};

const Input = (props: TInput) => {
  const {
    type = 'text',
    label,
    name,
    value,
    placeholder,
    children,
    className = '',
    disabled,
    register,
    errors,
    rules,
    autoComplete = 'off',
    step,
    min,
    max,
    readOnly = false,
    floating = false,
    height = 55,
    defaultChecked,
    floatingName,
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const inputType = type === 'password' && isVisible ? 'text' : type;
  return (
    <div className="relative w-full">
      {label && (
        <label className="mb-2.5 block text-gray-800 dark:text-gray-500" htmlFor={name}>
          {_.trim(label)}
        </label>
      )}
      <div className="relative">
        {children && <span className="absolute left-4 top-1/2 -translate-y-1/2 transform">{children}</span>}
        <input
          style={{ height }}
          className={`peer w-full rounded-lg py-2 pr-10 text-sm text-primarySecond focus:border-primary focus:placeholder-transparent focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed dark:bg-form-input dark:text-gray-200 dark:focus:border-primary dark:disabled:bg-meta-4 md:text-base ${children ? 'pl-11.5' : 'pl-3'} ${
            errors[name]
              ? 'border border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500'
              : 'border border-stroke dark:border-strokedark'
          } ${className}`}
          disabled={disabled}
          id={name}
          defaultChecked={defaultChecked}
          type={inputType}
          name={name}
          placeholder={placeholder || value}
          defaultValue={value}
          autoComplete={autoComplete}
          step={step}
          min={min}
          max={max}
          readOnly={readOnly}
          {...register(name, rules)}
        />
        {floating && !label && (
          <label
            htmlFor={floatingName}
            className="peer-focus:text-blue pointer-events-none absolute left-4 top-0 transform bg-white px-1 text-sm capitalize text-blue-600 opacity-0 transition-all duration-300 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-royalblue peer-placeholder-shown:opacity-0 peer-focus:-top-3 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:opacity-100 dark:bg-boxdark peer-placeholder-shown:dark:text-white"
          >
            {_.trim(floatingName)}
          </label>
        )}
        {!label && !floating && (
          <label
            htmlFor={floatingName}
            className={`pointer-events-none visible absolute left-4 top-1/2 shrink -translate-y-1/2 transform bg-white px-1 capitalize text-gray-500 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.5rem] peer-focus:text-sm peer-focus:text-blue-600 dark:bg-boxdark peer-placeholder-shown:dark:text-white`}
          >
            {_.trim(floatingName)}
          </label>
        )}
        {errors[name] ? (
          <div className="absolute inset-y-0 right-3 flex items-center text-slate-500">{iconErrorInformation}</div>
        ) : (
          type === 'password' && (
            <div
              className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-slate-500"
              onClick={() => setIsVisible(!isVisible)}
              aria-label="Toggle password visibility"
            >
              {isVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          )
        )}
      </div>
      {errors[name] && <span className="ml-2 text-sm text-red-500">{errors[name]?.message}</span>}
    </div>
  );
};

Input.displayName = 'Input';

export default Input;
