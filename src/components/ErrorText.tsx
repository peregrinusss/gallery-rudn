import React from "react";
import { FC } from "react";
import { FieldError } from "react-hook-form";

type Props = {
  error: FieldError | undefined;
};

const ErrorText: FC<Props> = ({ error }) => {
  return error && Object.keys(error).length ? (
    <span className="block text-danger text-[10px] text-center mt-[2px]">
      {typeof error.message !== "string"
        ? "Что-то пошло не так"
        : error.message}
    </span>
  ) : null;
};

export default ErrorText;
