import React, { FC, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage: FC<Props> = ({ error, reset }) => {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-full relative">
      {/* <div className="bg-white py-2 md:py-5 absolute left-0 top-0 z-20 w-full shadow-sm"></div> */}
      <div className="bg-primary w-full h-fit relative py-12 px-5 rounded-[20px] flex flex-col items-center">
        <div className="w-fit md:ml-auto md:mr-24 relative z-20">
          <h2 className="text-3xl text-white font-medium text-center tb:text-left">
            Произошла ошибка!
          </h2>
          <span className="text-xl tb:text-2xl text-white font-medium block mt-12 text-center tb:text-left">
            Мы уже работаем <br /> над этим, спасибо <br /> за понимание! 🙏🏻
          </span>
          <Button
            onClick={() => router.push("/")}
            variant="primary"
            className="!w-fit !px-3 !py-2 mt-16 mx-auto !bg-[#A6B9FF]"
          >
            Вернуться на главную
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
