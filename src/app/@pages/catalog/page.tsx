"use client";
import BookPreview from "@/components/BookPreview/BookPreview";
import Input from "@/components/Input/Input";
import Image from "next/image";
import React from "react";
import { FiSearch } from "react-icons/fi";

// Страница авторизации
const Page = () => {

  // Фейковая дата книг
  const data = [
    { name: "Книга такая", author: "А.С. Пушкин" },
    { name: "Энциклопедия", author: "А.С. Пушкин" },
    { name: "Тайны прошлого", author: "Л.Н. Толстой" },
    { name: "Звёздное небо", author: "А.С. Пушкин" },
    { name: "Один день", author: "А.С. Пушкин" },
    { name: "Сказки далёких стран", author: "В.А. Жуковский" },
    { name: "Свет в окне", author: "М.Ю. Лермонтов" },
    { name: "Летний дождь", author: "А.С. Пушкин" },
    { name: "Приключения весны", author: "Н.В. Гоголь" },
  ];

  return (
    <div className="mt-4">
      <div className="relative h-[300px] rounded-[20px] overflow-hidden p-14 -mx-14">
        <div className="absolute z-20 w-full h-full left-0 top-0 bg-gradient-to-r from-black to-transparent"></div>
        <div className="flex flex-col gap-3 relative z-30">
          <h2 className="text-5xl text-primary font-semibold">
            Коллекция книг
          </h2>
          <span className="text-xl text-white font-normal">
            Здесь вы можете найти книгу на интересующую вас тему
          </span>
          <div className="relative w-full mt-10">
            <FiSearch className="absolute top-1/2 -translate-y-1/2 left-3 w-6 h-6 text-[#9CA3AF]" />
            <Input
              placeholder="Поиск"
              type="text"
              className="[&>input]:pl-12 [&>input]:text-white"
            />
          </div>
        </div>
        <div className="absolute left-0 top-0 w-full h-full z-10">
          <Image
            alt="book-preview"
            src="/preview.jpeg"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-10">
        {data.map((item, index) => (
          <BookPreview key={index} book={item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
