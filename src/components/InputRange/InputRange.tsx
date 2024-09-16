// components/InputRange.tsx

import React, { FC, useState } from "react";
import ReactSlider from "react-slider";
import Input from "../Input/Input";

type Props = {
  className?: string;
};

const InputRange: FC<Props> = ({ className }) => {
  const [value, setValue] = useState<number>(1901);

  const handleChange = (newValue: number) => {
    if (newValue >= 1901 && newValue <= today) {
      setValue(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
  };

  const today = new Date().getFullYear();

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
          className="w-28 *:!text-center"
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
          onChange={handleChange}
          // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          ariaLabel="Year slider"
        />
        <span className="absolute top-3 -right-1 text-gray-dark text-sm">
          {today}
        </span>
      </div>
    </div>
  );
};

export default InputRange;
