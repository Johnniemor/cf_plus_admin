import React from 'react';
import { Controller, Control } from 'react-hook-form';

interface SwitcherProps {
  name: string;
  control: Control<any>;
  label?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
}

const Switcher: React.FC<SwitcherProps> = ({
  name,
  control,
  label = '',
  id = 'toggle-switch',
  className = '',
  disabled = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={`flex items-center space-x-3 ${className}`}>
          <label
            htmlFor={id}
            className={`flex cursor-pointer select-none items-center ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
          >
            <div className="relative">
              <input
                type="checkbox"
                id={id}
                className="sr-only"
                checked={field.value}
                onChange={field.onChange}
                disabled={disabled}
              />
              <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]" />
              <div
                className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
                  field.value &&
                  '!right-1 !translate-x-full !bg-red-400 dark:!bg-yellow-300'
                }`}
              ></div>
            </div>
          </label>
          {label && <span className="font-medium">{label}</span>}
        </div>
      )}
    />
  );
};

export default Switcher;
