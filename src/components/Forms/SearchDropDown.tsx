import { iconSearch } from '@/configs/icon';
import React, { useState } from 'react';

type TOption = {
  value?: string;
  label?: string;
  icon?: string[] | string;
  quantity?: string | number;
  unitName?: string;
  cf_code?: string;
  price?: string | number;
  product_id?: string;
  stock?: number | string;
};

interface SearchDropdownProps {
  name: string;
  value: any;
  options: Array<TOption>;
  placeholder?: string;
  onSelect: (selectedValue: string | any) => void;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelQty?: string;
  labelUnit?: string;
  labelCfcode?: string;
  labelPrice?: string;
  labelStock?: string;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  options,
  placeholder = 'Search...',
  onSelect,
  className,
  name,
  labelQty,
  labelUnit,
  labelCfcode,
  labelPrice,
  labelStock,
  value,
}) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredOptions =
    searchTerm.trim() === ''
      ? []
      : options.filter(
          (option) =>
            option.value?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            option.cf_code?.toLowerCase().includes(searchTerm.toLowerCase()),
        );
  const handleSelect = (option: TOption) => {
    setSearchTerm(option.value || '');
    setIsOpen(false);
    setSelectedId(option.value || null);
    onSelect(option);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      handleSelect(filteredOptions[highlightedIndex]);
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all ${
          searchTerm ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {iconSearch}
      </div>
      <input
        name={name}
        type="text"
        className={`w-full rounded-md border-[1.5px] border-stroke bg-contains_mainly_blue pl-10 dark:border-form-strokedark dark:bg-form-input ${className}`}
        placeholder={searchTerm ? '' : placeholder}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(e.target.value.trim() !== '');
        }}
        onKeyDown={handleKeyDown}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="dark:text-boxdarke absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-md bg-white shadow-lg dark:bg-boxdark">
          {filteredOptions.map((option, index) => (
            <li
              key={option.value}
              // className={`p-2 ${option.value === selectedId ? 'cursor-not-allowed bg-gray-200' : 'cursor-pointer'} ${highlightedIndex === index ? 'bg-blue-100' : ''}`}
              className={`cursor-pointer p-2`}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <div className="flex items-center gap-4">
                <img src={option.icon?.toString()} alt="icon" className="h-14 w-14" />
                {option.value}
                <div>
                  {labelQty} {option.quantity}
                </div>
                <div>
                  {labelUnit} {option.unitName}
                </div>
                <div>
                  {labelCfcode} {option.cf_code}
                </div>
                <div>
                  {labelPrice} {option.price}
                </div>
                <div>
                  {labelStock} {option.stock}
                </div>
                <div>{option.product_id}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
