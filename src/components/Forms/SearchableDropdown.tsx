import React, { useEffect, useRef, useState } from 'react';
import DefaultImage from '@/assets/logo/default_img.png';

type TOption = {
  value: string;
  label: string;
  photos?: string;
};

type SearchableDropdownProps = {
  options: Array<TOption>;
  label: string;
  id: string;
  selectedVal: string;
  handleChange: (val: string | null) => void;
  placeholder?: string;
  name: string;
  onSelect?: (option: TOption) => void;
};

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  label,
  id,
  selectedVal,
  handleChange,
  placeholder,
  name,
  onSelect,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.addEventListener('click', toggle);
    return () => document.removeEventListener('click', toggle);
  }, []);

  const selectOption = (option: TOption) => {
    setQuery('');
    handleChange(option.value);
    setIsOpen(false);
    // Call onSelect if provided
    if (onSelect) {
      onSelect(option);
    }
  };

  function toggle(e: MouseEvent) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;

    if (selectedVal) {
      const selectedOption = options.find((option) => option.value === selectedVal);
      return selectedOption ? selectedOption.label : '';
    }

    return '';
  };

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-full rounded-md border-[1.5px] border-stroke bg-contains_mainly_blue">
      <div className="w-full">
        <div className="w-full">
          <input
            className="w-full p-5"
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name={name}
            placeholder={placeholder ?? 'Search...'}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onClick={toggle}
          />
        </div>
        <div className={`arrow ${isOpen ? 'open' : ''}`}></div>
      </div>

      {isOpen && (
        <div className="options max-h-60 overflow-y-auto text-black">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                onClick={() => selectOption(option)}
                className={`option cursor-pointer p-3 hover:bg-gray-100 ${
                  option.value === selectedVal ? 'bg-gray-200' : ''
                }`}
                key={`${id}-${index}`}
              >
                <div className="align-center flex items-center gap-4">
                  <img
                    src={option.photos && option.photos.length > 0 ? option.photos : DefaultImage}
                    alt="photos"
                    className="h-14 w-14"
                  />
                  <p> {option.label}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
