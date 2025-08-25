'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Option {
  id: string;
  name: string;
}

interface MultiSelectCheckboxProps {
  options: Option[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export default function MultiSelectCheckbox({
  options,
  selectedValues,
  onChange,
  placeholder = 'Select items',
}: MultiSelectCheckboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (id: string) => {
    const newSelected = selectedValues.includes(id)
      ? selectedValues.filter((value) => value !== id)
      : [...selectedValues, id];
    onChange(newSelected);
  };

  const getDisplayValue = () => {
    if (selectedValues.length === 0) {
      return placeholder;
    }
    const selectedNames = selectedValues
      .map((id) => options.find((option) => option.id === id)?.name)
      .filter(Boolean);
    return selectedNames.join(', ');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate">{getDisplayValue()}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options.length === 0 ? (
            <div className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-700">
              No options available.
            </div>
          ) : (
            options.map((option) => (
              <div
                key={option.id}
                className="flex relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-gray-100"
                onClick={() => handleCheckboxChange(option.id)}
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  checked={selectedValues.includes(option.id)}
                  onChange={() => handleCheckboxChange(option.id)}
                  onClick={(e) => e.stopPropagation()} // Prevent closing dropdown when clicking checkbox
                />
                <span className="ml-3 block truncate font-normal">{option.name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
