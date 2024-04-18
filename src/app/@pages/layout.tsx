"use client";
import Button from "@/components/Button/Button";
import { imagePath } from "@/utils/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { LiaBookSolid } from "react-icons/lia";

// Лэйаут страниц
// (верхний уровень страниц, код страниц передается автоматически через children)
const Layout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname(); // получение пути текущей страницы

  // Конфигурация анимации появления контента на странице
  const variants = {
    hidden: { opacity: 0, y: 50 },
    enter: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="h-full relative container mx-auto px-5">
        {/* Шапка страницы везде кроме страницы авторизации */}
        {pathname.split("/").splice(-1)[0] !== "signin" && (
          <header className="py-7 flex justify-between items-center gap-20">
            <div className="relative overflow-visible">
              <Link
                href="/catalog"
                className="text-3xl font-bold text-black flex items-center gap-4 relative z-20"
              >
                <span>Выставка книг РУДН</span>
                <LiaBookSolid className="w-10 h-10 text-primary" />
              </Link>
              <Image
                alt="blur"
                src="/blur.png"
                width={400}
                height={200}
                className="absolute -left-10 -top-1/2 -translate-y-1/4 z-10 opacity-60"
              />
            </div>

            <Button
              onClick={() => {}}
              variant="primary"
              className="!w-fit flex-shrink-0 !px-10 !h-full"
            >
              Добавить книгу
            </Button>
          </header>
        )}

        <main className="pb-40">
          <motion.div
            key={pathname}
            initial="hidden"
            animate="enter"
            variants={variants}
            transition={{
              ease: "easeOut",
              duration: 0.2,
            }}
            className={``}
          >
            {children}
          </motion.div>
        </main>

        <div className="fixed bottom-0 bg-[#333] p-6 gap-2 rounded-t-[30px] mx-auto left-0 right-0 z-50">
          <span className="text-xl font-normal text-white">
            Временная навигация по страницам
          </span>
          <div className="flex gap-5">
            <Link href="/signin" className="text-success text-lg font-medium">
              Авторизация
            </Link>
            <Link href="/catalog" className="text-success text-lg font-medium">
              Каталог
            </Link>
          </div>
        </div>
      </div>

      {/* Фон */}
      <div className="fixed w-full h-full left-0 top-0 -z-10 bg-white">
        {pathname.split("/").splice(-1)[0] === "signin" && (
          <Image
            alt="background"
            src={imagePath("/bg.png")}
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
    </>
  );
};

export default Layout;
