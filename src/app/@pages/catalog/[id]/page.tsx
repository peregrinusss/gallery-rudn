"use client";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { HiPencil } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";

// Импорт Swiper стилей
import "swiper/css";
import "swiper/css/pagination";
import { BookDetails, CatalogPagesParams } from "@/types";
import { useGetBookByIdMutation } from "@/redux/app/apiSlice";
import { createImageSrc } from "@/utils/utils";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import UpdateBookForm from "@/components/UpdateBookForm/UpdateBookForm";

// Страница авторизации
const Page: FC<CatalogPagesParams> = ({ params }) => {
  // Получения id текущей книги
  const { id: bookId } = params;

  const { token } = useAuth(); // Получение токена

  // Получение переменной для навигации
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);

  // Получение книги с апи
  const [getBook] = useGetBookByIdMutation();
  const [book, setBook] = useState<BookDetails>();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const result = await getBook({ id: bookId }).unwrap();
        setBook(result);
      } catch (error) {
        console.error(error);
      }
    };

    if (bookId) {
      fetchBook();
    }

    // Инициализация Fancybox после загрузки компонента
    Fancybox.bind("[data-fancybox='gallery']");
  }, [bookId, getBook]);

  return (
    <div className="relative z-20">
      <div className="flex items-start justify-between gap-5">
        <div
          onClick={() => router.push("/catalog")}
          className="cursor-pointer active:opacity-70 transition-all flex items-center mb-4"
        >
          <MdKeyboardArrowLeft className="text-primary w-6 h-6" />
          <span className="text-lg text-primary font-bold">Назад</span>
        </div>

        {token &&
          (!isEdit ? (
            <div
              onClick={() => setIsEdit(true)}
              className="w-8 h-8 p-2 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:opacity-70 transition-all"
            >
              <HiPencil className="w-full h-full text-white" />
            </div>
          ) : (
            <div
              onClick={() => setIsEdit(false)}
              className="w-8 h-8 p-2 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:opacity-70 transition-all"
            >
              <IoClose className="w-full h-full text-white" />
            </div>
          ))}
      </div>

      {!isEdit ? (
        <>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl md:text-3xl text-black font-bold max-w-[800px]">
              {book?.name ? book?.name : "Неизвестная книга"}
            </h2>
            <div className="flex gap-3 flex-wrap">
              {book?.Authors && book?.Authors?.length > 0 ? (
                book?.Authors?.map((author, index) => (
                  <span
                    key={index}
                    className="text-base md:text-xl text-gray-dark font-normal"
                  >
                    {author?.entity
                      ? author.entity
                      : `${author.surname} ${author.name} ${
                          book?.Authors.length - 1 !== index && ", "
                        }`}
                  </span>
                ))
              ) : (
                <></>
              )}
            </div>
            <div className="my-1">
              <span className="text-base md:text-xl text-gray-dark font-normal">
                {book?.continent ?? ""}, {book?.country ?? ""},{" "}
                {book?.city ?? ""}
              </span>
            </div>
            <div className="my-1">
              <span className="text-base md:text-xl text-gray-dark font-normal">
                {book?.publisher ?? ""}, {book?.yearPublisher ?? ""}
              </span>
            </div>
          </div>
          <div className="flex flex-col-reverse xl:grid xl:grid-cols-2 mt-5 gap-3 xl:gap-10">
            <div className="w-full flex flex-col gap-2">
              <p className="text-lg text-black font-normal whitespace-pre-line">
                {book?.description}
              </p>
              <p className="text-lg text-black font-normal whitespace-pre-line">
                {book?.addInformation}
              </p>
            </div>
            <div className="relative  rounded-[20px]">
              {book?.Images && book?.Images?.length > 2 ? (
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    480: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                  }}
                  modules={[Pagination, A11y, Navigation]}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  loop
                  pagination={{ clickable: true }}
                  className="relative"
                >
                  <div className="swiper-button-prev absolute left-2 top-0 bottom-10 my-auto z-20 w-10 h-10 rounded-full bg-primary p-2 flex items-center justify-center active:opacity-70 transition-all cursor-pointer">
                    <MdKeyboardArrowLeft className="text-white w-full h-full" />
                  </div>
                  <div className="swiper-button-next absolute z-20 right-2 top-0 bottom-10 my-auto rotate-180 w-10 h-10 rounded-full bg-primary p-2 flex items-center justify-center active:opacity-70 transition-all cursor-pointer">
                    <MdKeyboardArrowLeft className="text-white w-full h-full" />
                  </div>
                  {book.Images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full h-[260px] md:h-[340px] rounded-[10px] 2xl:h-[400px] relative overflow-hidden shadow-md">
                        <a
                          href={createImageSrc(image.path)}
                          data-fancybox="gallery"
                        >
                          <Image
                            alt="book"
                            src={createImageSrc(image.path)}
                            className="rounded-[20px]"
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </a>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="flex items-center gap-2">
                  {book?.Images?.map((image, index) => (
                    <div
                      key={index}
                      className="w-full h-[260px] md:h-[300px] rounded-[10px] relative overflow-hidden shadow-md bg-white"
                    >
                      <a
                        href={createImageSrc(image.path)}
                        data-fancybox="gallery"
                      >
                        <Image
                          alt="book"
                          src={createImageSrc(image.path)}
                          className="rounded-[20px]"
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <UpdateBookForm bookId={bookId} setIsEdit={setIsEdit} />
      )}
    </div>
  );
};

export default Page;
