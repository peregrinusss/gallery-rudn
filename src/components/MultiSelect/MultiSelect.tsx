import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";

type Option = {
  value: string;
  label: string;
};

type SelectAttributes = InputHTMLAttributes<HTMLInputElement>;

type CustomSelectProps = {
  options: Option[];
  value: string[];
  onChange?: (selectedValues: string[]) => void;
} & SelectAttributes;

const MultiSelect: React.FC<CustomSelectProps> = ({
  options,
  value = [],
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  // Выбор опций при клике
  const handleOptionClick = (option: Option) => {
    const alreadySelected = value.includes(option.value);
    const newSelectedValues = alreadySelected
      ? value.filter((v) => v !== option.value)
      : [...value, option.value];

    if (onChange) {
      onChange(newSelectedValues);
    }
  };

  // Закрыть меню при клике снаружи
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

  // Фильтрация опций на основе поиска
  const filteredOptions = options.filter((option) =>
    option.label?.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  return (
    <div className="relative inline-block w-full sm:w-64" ref={inputRef}>
      <div
        className="bg-white border border-gray rounded-full shadow-sm px-5 py-[11px] pr-10 text-left cursor-pointer focus:outline-none sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="block truncate text-black">
          {value.length > 0
            ? options
                .filter((option) => value.includes(option.value))
                .map((option) => option.label)
                .join(", ")
            : "Выбрать"}
        </span>
        <div
          className={`absolute right-4 top-3 flex pointer-events-none text-black transition-all ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15.5C11.7374 15.5005 11.4772 15.449 11.2346 15.3486C10.9919 15.2482 10.7715 15.1009 10.586 14.915L5.29297 9.62102L6.70697 8.20702L12 13.5L17.293 8.20702L18.707 9.62102L13.414 14.914C13.2285 15.1001 13.0081 15.2476 12.7655 15.3482C12.5228 15.4487 12.2626 15.5003 12 15.5Z"
              fill="#030631"
            ></path>
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-40 mt-1 w-full bg-white shadow-lg max-h-60 rounded-[16px] py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent focus:outline-none sm:text-sm">
          {/* Поле для поиска */}
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full px-3 py-2 border border-gray-dark rounded-[10px] text-sm focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="cursor-pointer select-none relative py-2 pl-4 pr-9 hover:bg-indigo-600 hover:*:text-primary"
                onClick={() => handleOptionClick(option)}
              >
                <span
                  className={`block truncate transition-all ${
                    value.includes(option.value)
                      ? "font-medium text-primary"
                      : "font-normal text-black"
                  }`}
                >
                  {option.label}
                </span>
                {value.includes(option.value) && (
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
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 text-sm">
              Ничего не найдено
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
