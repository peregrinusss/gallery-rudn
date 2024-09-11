import { FC, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

// Типизация пропсов
type Props = {
  placeholder: string;
  type: "text" | "password" | "number";
  label?: string;
  className?: string;
} & InputAttributes;

// Компонент кастомного инпута
const Input: FC<Props> = ({ placeholder, type, label, className, ...rest }) => {
  return (
    <div className={twMerge("w-full", className)}>
      {label && (
        <label className="block text-base text-black font-normal mb-1">
          {label}
        </label>
      )}
      <input
        {...rest}
        className="w-full bg-white shadow-sm px-5 py-3 text-sm text-black placeholder:text-sm placeholder:text-[#9CA3AF] rounded-full"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
