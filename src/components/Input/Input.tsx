import { FC } from "react";
import { twMerge } from "tailwind-merge";

// Типизация пропсов
type Props = {
  placeholder: string;
  type: "text" | "password" | "number";
  label?: string;
  className?: string;
};

// Компонент кастомного инпута
const Input: FC<Props> = ({ placeholder, type, label, className }) => {
  return (
    <div className={twMerge("w-full", className)}>
      {label && <label className="block text-base font-normal mb-1">{label}</label>}
      <input
        className="w-full bg-transparent p-4 text-base text-blacks placeholder:text-base placeholder:text-[#9CA3AF] border border-gray rounded-[20px]"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
