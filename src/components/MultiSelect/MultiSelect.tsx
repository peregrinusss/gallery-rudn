import React, { useState, useRef, useEffect } from "react";

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
  onChange?: (selectedOptions: Option[]) => void;
};

const MultiSelect: React.FC<CustomSelectProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);

  // Добавление или удаление опции из выбранных
  const handleOptionClick = (option: Option) => {
    const alreadySelected = selectedOptions.some(
      (o) => o.value === option.value
    );
    const newSelectedOptions = alreadySelected
      ? selectedOptions.filter((o) => o.value !== option.value)
      : [...selectedOptions, option];
    setSelectedOptions(newSelectedOptions);
    if (onChange) onChange(newSelectedOptions);
  };

  // Закрытие списка при клике вне элемента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-full sm:w-64" ref={inputRef}>
      <div
        className="h-[37px] bg-white border border-gray rounded-[20px] shadow-sm p-4 py-2 pr-10 text-left cursor-pointer focus:outline-none sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate text-black">
          {selectedOptions.map((option) => option.label).join(", ") ||
            "Выбрать"}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-black">
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
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-200"
              onClick={() => handleOptionClick(option)}
            >
              <span
                className={`block truncate ${
                  selectedOptions.some((o) => o.value === option.value)
                    ? "font-semibold text-primary"
                    : "font-normal text-black"
                }`}
              >
                {option.label}
              </span>
              {selectedOptions.some((o) => o.value === option.value) && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
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

export default MultiSelect;
