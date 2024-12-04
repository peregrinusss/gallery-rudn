import React, { FC, InputHTMLAttributes } from "react";
import ReactSlider from "react-slider";
import Input from "../Input/Input";
import { FieldError } from "react-hook-form";
import ErrorText from "../ErrorText";
import { IoClose } from "react-icons/io5";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

type Props = {
  className?: string;
  error?: FieldError;
  value: number | null; // Поддержка null
  onChange: (newValue: number | null) => void; // Поддержка null
} & InputAttributes;

const InputRange: FC<Props> = ({
  className,
  error,
  value,
  onChange,
  ...rest
}) => {
  const today = new Date().getFullYear();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value ? Number(e.target.value) : null;
    onChange(newValue);
  };

  const handleSliderChange = (newValue: number) => {
    onChange(newValue);
  };

  const handleReset = () => {
    onChange(null);
  };

  return (
    <div className={`${className}`}>
      <label htmlFor="yearInput" className="block mb-3 w-fit mx-auto relative">
        <Input
          type="number"
          id="yearInput"
          value={value ?? ""} // Пустая строка для null
          min="1901"
          max={today}
          onChange={handleInputChange}
          className="w-28 text-center"
        />
        <div
          onClick={handleReset}
          className="absolute top-0 bottom-0 my-auto -right-2 w-6 h-6 p-1 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:opacity-70 transition-all"
        >
          <IoClose className="w-full h-full text-white" />
        </div>
      </label>
      <div className="relative">
        <span className="absolute top-3 -left-1 text-gray-dark text-sm">
          1901
        </span>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          min={1901}
          max={today}
          value={value ?? 1901} // Устанавливаем минимальное значение, если value равно null
          onChange={handleSliderChange}
          ariaLabel="Year slider"
        />
        <span className="absolute top-3 -right-1 text-gray-dark text-sm">
          {today}
        </span>
      </div>
      <ErrorText error={error} />
    </div>
  );
};

export default InputRange;
