"use client";
import BookPreview from "@/components/BookPreview/BookPreview";
import Search from "@/components/Search/Search";
import Select from "@/components/Select/Select";
import {
  useFilterCatalogMutation,
  useGetBooksQuery,
  useGetFilterOptionsQuery,
} from "@/redux/app/apiSlice";
import { Book, Books } from "@/types";
import { imagePath } from "@/utils/utils";
import {
  parseAsString,
  ParserBuilder,
  useQueryState,
  useQueryStates,
} from "next-usequerystate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// Страница авторизации
const Page: FC = () => {
  const [q, setQ] = useQueryState("q");

  // Переменная для роутинга
  const router = useRouter();

  // Получения каталога книг с апи
  const { data: booksData, isLoading, error } = useGetBooksQuery({});

  const { data: fitlerOptions } = useGetFilterOptionsQuery({});
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (booksData && booksData.Records) {
      setFilteredBooks(booksData.Records);
    }
  }, [booksData]);

  const handleSearchTasks = (value: string) => {
    if (!value) {
      setQ(null);
      return;
    }
    setQ(value);
  };

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

  // Обработка поискового запроса
  useEffect(() => {
    if (booksData && booksData.Records) {
      const filtered = booksData.Records.filter(book => {
        // Замена null значения на "Неизвестная книга"
        const bookName = book.name || "Неизвестная книга";
        return q ? bookName.toLowerCase().includes(q.toLowerCase()) : true;
      });
      setFilteredBooks(filtered);
    }
  }, [booksData, q]);

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
          <Search
            setValue={handleSearchTasks}
            value={q ?? ""}
            placeholder="Поиск"
          />
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
          <span className="text-xl text-primary font-semibold">Фильтр</span>
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
        {filteredBooks?.length ? (
          filteredBooks?.map((item, index) => (
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
