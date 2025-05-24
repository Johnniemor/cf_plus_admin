import { iconAdd } from '@/configs/icon';
import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  error?: string;
  name: string;
}

const SelectOption = ({
  options,
  value,
  onChange,
  className = '',
  label = '',
  placeholder = 'Select an option',
  icon = iconAdd,
  disabled = false,
  error,
  name,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div className="relative w-full">
      {label && <label className="mb-2.5 block text-baselabelinput dark:text-white">{label}</label>}

      <button
        name={name}
        type="button"
        disabled={disabled}
        className={`relative w-full rounded-md border dark:border-strokedark ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-pointer bg-white'} px-4 py-4 text-left focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-form-input ${className}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`block truncate ${!selectedValue ? 'text-gray-400' : ''}`}>
          {selectedOption?.label || placeholder}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">{icon}</span>
      </button>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white shadow-lg ring ring-black ring-opacity-5">
          {options.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer px-4 py-4 hover:bg-blue-600 hover:text-white ${option.value === selectedValue ? 'bg-blue-600 text-white' : 'text-gray-900'}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectOption;
