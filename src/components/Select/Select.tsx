import React, {
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { ControllerFieldState, ControllerRenderProps, FieldError } from "react-hook-form";
import ErrorText from "../ErrorText";

export type Option = {
  value: string;
  label: string;
};

type SelectAttributes = SelectHTMLAttributes<HTMLSelectElement>;

type CustomSelectProps = {
  options: Option[];
  onChange?: (selectedOption: Option) => void;
  field?: ControllerRenderProps<any, any>;
  fieldState?: ControllerFieldState;
  error?: FieldError | undefined;
} & SelectAttributes;

const Select: React.FC<CustomSelectProps> = ({
  options,
  onChange,
  field,
  error,
  fieldState,
  ...rest
}) => {
  // Состояния для управления открытием выпадающего списка
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Состояние для выбора элемента выпадающего списка
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  // Ссылка на DOM-элемент выпадающего списка
  const inputRef = useRef<HTMLDivElement>(null);

  // Обработчик клика по элементу выпадающего списка
  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  // Обработчик клика вне выпадающего списка для его закрытия
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative inline-block w-full sm:w-64" ref={inputRef}>
        <div
          className="bg-white border border-gray rounded-full shadow-sm px-5 py-[11px] pr-10 text-left cursor-pointer focus:outline-none sm:text-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block truncate text-black text-sm">
            {selectedOption ? selectedOption.label : "Выбрать"}
          </span>
          <div
            className={`absolute inset-y-0 right-4 flex items-center pointer-events-none text-black transition-all ${
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
            {options.map((option) => (
              <div
                key={option.value}
                className="cursor-pointer select-none relative py-2 pl-4 pr-9 hover:bg-indigo-600 hover:*:text-primary"
                onClick={() => handleOptionClick(option)}
              >
                <span
                  className={`block truncate transition-all ${
                    selectedOption?.value === option.value
                      ? "font-medium text-primary"
                      : "font-normal text-black"
                  }`}
                >
                  {option.label}
                </span>
                {selectedOption?.value === option.value && (
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
         <ErrorText error={error} />
      </div>
     
    </>
  );
};

export default Select;
