import { FC, PropsWithChildren } from "react";

// Типизация пропсов
type Props = {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  variant: "primary" | "secondary" | "danger" | "link" | "tab";
};

// Компонент кастомной кнопки
const Button: FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  className,
  isLoading,
  variant,
  disabled,
}) => {
  // Стили в зависимости от варианта кнопки
  const buttonClasses = [
    "flex items-center justify-center py-4 px-[6px] w-full h-fit rounded-[20px] text-base font-medium border border-transparent active:opacity-[0.6] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-[0.6]",
    className,
    variant === "primary" && "text-white bg-primary",
    variant === "danger" && "text-danger bg-danger bg-opacity-10",
    variant === "link" &&
      "text-primary !text-sm !py-0 !px-1 !normal-case !w-fit",
    variant === "tab" &&
      "bg-primary text-white text-sm md:!text-base !px-5 !py-2 !font-normal rounded-[30px] md:!rounded-[15px] !normal-case !w-fit",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      disabled={disabled || isLoading}
      onClick={onClick}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;
