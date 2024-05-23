"use client";
import BookPreview from "@/components/BookPreview/BookPreview";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import { imagePath } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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

  const [isAuthor, setIsAuthor] = useState(false);

  return (
    <div className="">
      <div className="">
        <h2 className="text-2xl text-black font-bold">Создание книги</h2>
        <div className="flex flex-col gap-4 mt-6">
          <Input label="Город" placeholder="Введите город" type="text" />
          <Input
            label="Континент"
            placeholder="Введите континент"
            type="text"
          />
          <Input label="Страна" placeholder="Введите страну" type="text" />
          <div className="border-t border-gray mt-2 pt-4">
            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
              <input
                className="relative border-gray float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="checkbox"
                value=""
                id="checkboxDefault"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setIsAuthor(event.target.checked);
                }}
              />
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer"
                htmlFor="checkboxDefault"
              >
                Автор известен
              </label>
            </div>
            {!isAuthor ? (
              <Input
                label="Организация"
                placeholder="Введите организацию"
                type="text"
                className="mt-4"
              />
            ) : (
              <div className="flex flex-col gap-4 mt-4">
                <Input
                  label="Фамилия автора"
                  placeholder="Введите фамилию автора"
                  type="text"
                />
                <Input
                  label="Имя автора"
                  placeholder="Введите имя автора"
                  type="text"
                />
                <Input
                  label="Отчество автора"
                  placeholder="Введите отчество автора"
                  type="text"
                />
              </div>
            )}
          </div>
          <Input
            label="Издательство"
            placeholder="Введите название издательства"
            type="text"
            className="border-t border-gray mt-2 pt-4"
          />
          <Input
            label="Федеральный округ"
            placeholder="Введите Федеральный округ"
            type="text"
          />
          <Input
            label="Субъект РФ"
            placeholder="Введите субъект РФ"
            type="text"
          />
        </div>
        <Button
          onClick={() => {}}
          variant="primary"
          className="ml-auto mt-6 xs:!w-fit !px-5"
        >
          Создать книгу
        </Button>
      </div>
    </div>
  );
};

export default Page;
