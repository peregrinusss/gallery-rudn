"use client";
import Link from "next/link";
import { FC } from "react";

type Props = {};

// Корневая страница которая не используется
// TODO: сделать редирект на страницу каталога если авторизован и на страницу авторизации если не авторизован
const Home: FC<Props> = () => {
  return (
    <>
      <div className="absolute bottom-0">
        <span className="text-xl font-normal">
          Временная навигация по страницам
        </span>
        <div className="flex flex-col">
          <Link href="/signin" className="text-primary text-base font-medium">
            Авторизация
          </Link>
          <Link href="/catalog" className="text-primary text-base font-medium">
            Каталог
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
