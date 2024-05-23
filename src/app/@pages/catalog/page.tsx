"use client";
import BookPreview from "@/components/BookPreview/BookPreview";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import { imagePath } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FiSearch } from "react-icons/fi";

// Страница авторизации
const Page = () => {
  // Фейковая дата книг
  const data = [
    { id: "1", name: "Книга такая", author: "А.С. Пушкин" },
    { id: "2", name: "Энциклопедия", author: "А.С. Пушкин" },
    { id: "3", name: "Тайны прошлого", author: "Л.Н. Толстой" },
    { id: "4", name: "Звёздное небо", author: "А.С. Пушкин" },
    { id: "5", name: "Один день", author: "А.С. Пушкин" },
    { id: "6", name: "Сказки далёких стран", author: "В.А. Жуковский" },
    { id: "7", name: "Свет в окне", author: "М.Ю. Лермонтов" },
    { id: "8", name: "Летний дождь", author: "А.С. Пушкин" },
    { id: "9", name: "Приключения весны", author: "Н.В. Гоголь" },
  ];

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleSelectChange = (selectedOption: {
    value: string;
    label: string;
  }) => {
    console.log("Selected option:", selectedOption);
  };

  // Переменная для роутинга
  const router = useRouter();

  return (
    <div className="">
      <div className="relative rounded-[20px] overflow-hidden px-4 py-8 md:p-14 -mx-5 sm:mx-0 2xl:-mx-14">
        <div className="absolute z-20 w-full h-full left-0 top-0 bg-gradient-to-r from-black to-transparent"></div>
        <div className="flex flex-col gap-3 relative z-30">
          <h2 className="text-3xl md:text-5xl text-primary font-semibold">
            Коллекция книг
          </h2>
          <span className="text-base md:text-xl text-white font-normal">
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
            src={imagePath("/preview.jpeg")}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="mt-6">
        <span className="text-lg text-black font-semibold">Фильтр</span>
        <div className="flex items-center gap-3 mt-2">
          <Select options={options} onChange={handleSelectChange} />
          <Select options={options} onChange={handleSelectChange} />
          <Select options={options} onChange={handleSelectChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {data.map((item, index) => (
          <div onClick={() => router.push(`catalog/${item.id}`)} key={index}>
            <BookPreview book={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
