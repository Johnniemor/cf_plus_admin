import { useEffect, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';

type TOption = {
  value?: string;
  imageUrl: string;
  action?: string;
  share?: string;
};

type DropdownProps = {
  name: string;
  options: Array<TOption>;
  control: any;
  rules?: any;
  error?: any;
  onSelect?: (selectedOptions: TOption[]) => void;
  placeholder?: string;
  imageSize?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  classLabel?: string;
  label: string;
  height?: number;
  onChange?: (value: string) => void;
  pageId?: string;
  onImageSelect?: (imageUrls: string[], isRemoval?: boolean, removedUrl?: string) => void;
  isSelectOption?: boolean;
};

const DropdownMenuWithImages = ({
  options,
  onSelect,
  placeholder = 'Choose an option',
  imageSize = 'medium',
  disabled = false,
  className = '',
  name,
  classLabel,
  label,
  control,
  rules,
  height = 55,
  onChange,
  pageId,
  onImageSelect,
  isSelectOption,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<TOption[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedOptions([]);
  }, [pageId]);

  const getImageSizeClass = () => {
    switch (imageSize) {
      case 'small':
        return 'w-4 h-4';
      case 'large':
        return 'w-12 h-12';
      default:
        return 'w-6 h-6';
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: TOption, imageUrl: string, fieldOnChange: (value: any) => void) => {
    const isSelected = selectedOptions.some((selected) => selected.value === option.value);
    let updatedOptions;

    if (isSelected) {
      updatedOptions = selectedOptions.filter((selected) => selected.value !== option.value);
    } else {
      updatedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(updatedOptions);
    if (onSelect) onSelect(updatedOptions);

    if (onChange) onChange(updatedOptions.map((opt) => opt.value).join(', '));

    fieldOnChange(updatedOptions.map((opt) => opt.value));
    if (onImageSelect) {
      if (isSelected) {
        onImageSelect([], true, imageUrl);
      } else {
        onImageSelect([imageUrl], false);
      }
    }
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      <label className={`block ${classLabel} text-primarySecond dark:text-gray-500`}>{label}</label>
      <div className="relative z-999 bg-transparent dark:bg-form-input">
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={[]}
          render={({ field }) => (
            <div>
              <div
                style={{ height }}
                onClick={toggleDropdown}
                className={`flex w-full cursor-pointer items-center rounded border border-stroke px-5 ${
                  disabled ? 'cursor-not-allowed' : ''
                }`}
              >
                {selectedOptions.length > 0 && isSelectOption ? (
                  <div className="flex flex-wrap">
                    {selectedOptions.map((option) => (
                      <img
                        key={option.value}
                        src={option.imageUrl}
                        className={`${getImageSizeClass()} rounded-lg object-cover`}
                      />
                    ))}
                  </div>
                ) : (
                  <span>{placeholder}</span>
                )}
              </div>

              {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                  {options.length > 0 ? (
                    <ul className="max-h-60 overflow-y-auto py-1">
                      {options.map((option) => (
                        <li
                          onClick={() => handleSelect(option, option.imageUrl, field.onChange)}
                          className="flex cursor-pointer items-center px-3 py-2 hover:bg-gray-100"
                          key={option.value}
                          value={field.value}
                        >
                          <div key={option.value} className="flex gap-2">
                            <img src={option.imageUrl} alt="imageUrl" className="h-10 w-10 object-cover" />
                            <h1>{option.action}</h1>
                            <h1>{option.share}</h1>
                          </div>
                          {selectedOptions.some((selected) => selected.value === option.value) && (
                            <span className="ml-2 text-green-500">✔</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-3 py-2 text-gray-500">{placeholder}</div>
                  )}
                </div>
              )}
            </div>
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
    </div>
  );
};

export default DropdownMenuWithImages;
