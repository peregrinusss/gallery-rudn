import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  onChange?: (selectedOption: Option) => void;
}

const Select: React.FC<CustomSelectProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div className="relative inline-block w-64">
      <div
        className="bg-white border border-gray rounded-[20px] shadow-sm p-4 py-2 pr-10 text-left cursor-pointer focus:outline-none sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate">{selectedOption.label}</span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.96l3.71-3.73a.75.75 0 011.06-.02.75.75 0 01-.02 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-40 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => (
            <div
              key={option.value}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 "
              onClick={() => handleOptionClick(option)}
            >
              <span
                className={`block truncate ${
                  selectedOption.value === option.value
                    ? "font-semibold"
                    : "font-normal"
                }`}
              >
                {option.label}
              </span>
              {selectedOption.value === option.value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.293a1 1 0 00-1.416 0L8 12.586 4.712 9.298a1 1 0 10-1.424 1.414l4 4a1 1 0 001.424 0l8-8a1 1 0 000-1.419z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
