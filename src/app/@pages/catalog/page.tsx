"use client";
import BookPreview from "@/components/BookPreview/BookPreview";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import {
  useGetBooksQuery,
  useGetFilterOptionsQuery,
} from "@/redux/app/apiSlice";
import { imagePath } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FC, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Collapse } from "react-collapse";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// Страница авторизации
const Page: FC = () => {
  const handleSelectChange = (selectedOption: {
    value: string;
    label: string;
  }) => {
    console.log("Selected option:", selectedOption);
  };

  // Состояние раскрвтия фильтров
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);
  };

  // Переменная для роутинга
  const router = useRouter();

  // Получения каталога книг с апи
  const { data, error, isLoading } = useGetBooksQuery({});

  const { data: fitlerOptions } = useGetFilterOptionsQuery({});

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
        <div
          className="cursor-pointer active:opacity-70 transition-all flex items-center gap-2"
          onClick={toggleOpen}
        >
          <span className="text-lg text-black font-semibold">Фильтр</span>
          <MdOutlineKeyboardArrowDown
            className={`text-black w-8 h-8 transition-all ${
              open && "rotate-180"
            }`}
          />
        </div>

        <Collapse isOpened={open}>
          <div className="flex flex-wrap items-center gap-6 mt-2">
            {fitlerOptions?.Author && (
              <div className="flex flex-col gap-1">
                <span className="text-base text-gray-dark font-normal">
                  Автор
                </span>
                <Select
                  options={fitlerOptions?.Author.map((item) => ({
                    value: item.idAuthor,
                    label: item.nameAuthor
                      ? `${item.nameAuthor} ${item.surname} ${item.patronymic}`
                      : item.entity,
                  }))}
                  onChange={handleSelectChange}
                />
              </div>
            )}
            {fitlerOptions?.Continent && (
              <div className="flex flex-col gap-1">
                <span className="text-base text-gray-dark font-normal">
                  Континент
                </span>
                <Select
                  options={fitlerOptions?.Continent.map((item) => ({
                    value: item.idContinent,
                    label: item.continent,
                  }))}
                  onChange={handleSelectChange}
                />
              </div>
            )}
            {fitlerOptions?.City && (
              <div className="flex flex-col gap-1">
                <span className="text-base text-gray-dark font-normal">
                  Город
                </span>
                <Select
                  options={fitlerOptions?.City.map((item) => ({
                    value: item.idCity,
                    label: item.city,
                  }))}
                  onChange={handleSelectChange}
                />
              </div>
            )}
            {fitlerOptions?.Country && (
              <div className="flex flex-col gap-1">
                <span className="text-base text-gray-dark font-normal">
                  Страна
                </span>
                <Select
                  options={fitlerOptions?.Country.map((item) => ({
                    value: item.idCountry,
                    label: item.country,
                  }))}
                  onChange={handleSelectChange}
                />
              </div>
            )}
            {fitlerOptions?.FederalDistrict && (
              <div className="flex flex-col gap-1">
                <span className="text-base text-gray-dark font-normal">
                  Федеральный округ
                </span>
                <Select
                  options={fitlerOptions?.FederalDistrict.map((item) => ({
                    value: item.idFederalDistrict,
                    label: item.federalDistrict,
                  }))}
                  onChange={handleSelectChange}
                />
              </div>
            )}
            {fitlerOptions?.SubjectRF && (
              <div className="flex flex-col gap-1">
                <span className="text-base text-gray-dark font-normal">
                  Субъект РФ
                </span>
                <Select
                  options={fitlerOptions?.SubjectRF.map((item) => ({
                    value: item.idSubjectRF,
                    label: item.subjectRF,
                  }))}
                  onChange={handleSelectChange}
                />
              </div>
            )}
          </div>
        </Collapse>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {data?.Records.length ? (
          data?.Records?.map((item, index) => (
            <div
              onClick={() => router.push(`catalog/${item.id}`)}
              key={item.id}
            >
              <BookPreview book={item} />
            </div>
          ))
        ) : (
          <span className="text-base text-black font-bold text-center">
            Книги не найдены
          </span>
        )}
      </div>
    </div>
  );
};

export default Page;
