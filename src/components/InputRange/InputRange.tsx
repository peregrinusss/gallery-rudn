import React, { FC, InputHTMLAttributes, useEffect } from "react";
import ReactSlider from "react-slider";
import Input from "../Input/Input";
import { FieldError } from "react-hook-form";
import ErrorText from "../ErrorText";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

type Props = {
  className?: string;
  error?: FieldError;
  value: number;
  onChange: (newValue: number) => void;
} & InputAttributes;

const InputRange: FC<Props> = ({ className, error, value, onChange, ...rest }) => {
  const today = new Date().getFullYear();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  return (
    <div className={`${className}`}>
      <label htmlFor="yearInput" className="block mb-3 w-fit mx-auto">
        <Input
          type="number"
          id="yearInput"
          value={value}
          min="1901"
          max={today}
          onChange={handleInputChange}
          className="w-28 text-center"
        />
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
          value={value}
          onChange={onChange}
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
