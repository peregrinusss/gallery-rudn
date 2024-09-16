import { FC, InputHTMLAttributes } from "react";
import { ControllerFieldState, ControllerRenderProps, FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import ErrorText from "../ErrorText";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

// Типизация пропсов
type Props = {
  type: "text" | "password" | "number";
  label?: string;
  className?: string;
  defaultValue?: string | number | null;
  field?: ControllerRenderProps<any, any>;
  error?: FieldError;
} & InputAttributes;

// Компонент кастомного инпута
const Input: FC<Props> = ({
  field,
  placeholder,
  type,
  label,
  error,
  className,
  ...rest
}) => {
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
      <ErrorText error={error} />
    </div>
  );
};

export default Input;
