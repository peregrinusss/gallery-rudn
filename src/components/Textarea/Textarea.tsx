import { FC, TextareaHTMLAttributes } from "react";
import {
  ControllerRenderProps,
  FieldError,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import ErrorText from "../ErrorText";

type TextareaAttributes = TextareaHTMLAttributes<HTMLTextAreaElement>;

type Props = {
  label?: string;
  className?: string;
  defaultValue?: string | null;
  field?: ControllerRenderProps<any, any>;
  error?: FieldError;
} & TextareaAttributes;

const Textarea: FC<Props> = ({
  field,
  placeholder,
  label,
  error,
  className,
  rows = 3, // Указываем количество строк по умолчанию
  ...rest
}) => {
  return (
    <div className={twMerge("w-full", className)}>
      {label && (
        <label className="block text-base text-black font-normal mb-1">
          {label}
        </label>
      )}
      <textarea
        {...rest}
        {...field}
        rows={rows}
        className={`w-full bg-white border shadow-sm px-5 py-3 text-sm text-black placeholder:text-sm placeholder:text-[#9CA3AF] rounded-[20px] resize-none ${
          error ? "border-danger" : "border-gray"
        }`}
        placeholder={placeholder}
      ></textarea>
      <ErrorText error={error} />
    </div>
  );
};

export default Textarea;
