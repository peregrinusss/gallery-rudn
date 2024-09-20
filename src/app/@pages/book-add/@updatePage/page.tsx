"use client";
import BookPreview from "@/components/BookPreview/BookPreview";
import InputRange from "@/components/InputRange/InputRange";
import Search from "@/components/Search/Search";
import Select, { Option } from "@/components/Select/Select";
import {
  useGetBooksQuery,
  useGetFilterOptionsQuery,
} from "@/redux/app/apiSlice";
import { Book } from "@/types";
import { useQueryState } from "next-usequerystate";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Collapse } from "react-collapse";

const Page = () => {
  const [q, setQ] = useQueryState("q");

  // Переменная для роутинга
  const router = useRouter();

  // Получения каталога книг с апи
  const {
    data: booksData,
    isLoading,
    error,
  } = useGetBooksQuery({ query: q || "" });

  const { data: fitlerOptions } = useGetFilterOptionsQuery({});
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (booksData && booksData.Books) {
      setFilteredBooks(booksData.Books);
    }
  }, [booksData]);

  const handleSearchTasks = (value: string) => {
    if (!value) {
      setQ(null);
      return;
    }
    setQ(value);
  };

  const handleSelectChange = (selectedOption: Option) => {};

  // Состояние раскрытия фильтров
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);
  };

  // Обработка поискового запроса
  // useEffect(() => {
  //   if (booksData && booksData.Books) {
  //     const filtered = booksData.Books.filter((book) => {
  //       // Замена null значения на "Неизвестная книга"
  //       const bookName = book.name || "Неизвестная книга";
  //       return q ? bookName.toLowerCase().includes(q.toLowerCase()) : true;
  //     });
  //     setFilteredBooks(filtered);
  //   }
  // }, [booksData, q]);

  return (
    <div className="">
      <div className="flex flex-col gap-4 relative z-30">
        <Search
          setValue={handleSearchTasks}
          value={q ?? ""}
          placeholder="Поиск"
        />
      </div>
      <div className="mt-14">
        <div
          className="cursor-pointer active:opacity-70 transition-all flex items-center gap-2"
          onClick={toggleOpen}
        >
          <span className="text-xl text-primary font-semibold">Фильтр</span>
          <div className={`transition-all ${open && "rotate-180"}`}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15.5C11.7374 15.5005 11.4772 15.449 11.2346 15.3486C10.9919 15.2482 10.7715 15.1009 10.586 14.915L5.29297 9.62102L6.70697 8.20702L12 13.5L17.293 8.20702L18.707 9.62102L13.414 14.914C13.2285 15.1001 13.0081 15.2476 12.7655 15.3482C12.5228 15.4487 12.2626 15.5003 12 15.5Z"
                fill="#030631"
              ></path>
            </svg>
          </div>
        </div>

        <Collapse isOpened={open}>
          <div className="flex flex-wrap items-start gap-6 mt-2">
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
                  // onChange={handleSelectChange}
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
                  // onChange={handleSelectChange}
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
                  // onChange={handleSelectChange}
                />
              </div>
            )}
            {fitlerOptions?.FederalDistrict && (
              <div className="flex flex-col gap-1">
                <span className="text-base text-gray-dark font-normal">
                  Федеральный округ России
                </span>
                <Select
                  options={fitlerOptions?.FederalDistrict.map((item) => ({
                    value: item.idFederalDistrict,
                    label: item.federalDistrict,
                  }))}
                  // onChange={handleSelectChange}
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
                  // onChange={handleSelectChange}
                />
              </div>
            )}
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
                  // onChange={handleSelectChange}
                />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-base text-gray-dark font-normal">Год</span>
              <InputRange className="sm:w-64" />
            </div>
          </div>
        </Collapse>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {booksData?.Books?.length ? (
          booksData.Books?.map((item, index) => (
            <div
              onClick={() => router.push(`book/${item.id}`)}
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
