"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { MdKeyboardArrowLeft } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

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
    <div className="">
      <div className="flex flex-col sm:flex-row sm:items-end sm:gap-2">
        <h2 className="text-3xl text-black font-bold">Тайны прошлого</h2>
        <span className="text-xl text-gray-dark font-normal">Л.Н. Толстой</span>
      </div>
      <div className="flex flex-col-reverse xl:grid xl:grid-cols-2 mt-5 gap-3 xl:gap-10">
        <div className="w-full">
          <p className="text-base text-black font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis in unde debitis optio sequi voluptate? Qui sequi optio
            cupiditate et quod obcaecati fugiat odit, ab recusandae illo, labore
            rerum unde. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Commodi laboriosam similique quibusdam minima perferendis itaque
            consectetur nostrum est ipsam, fugiat inventore, numquam modi magni
            quasi cupiditate! Incidunt magni sit eum?
          </p>
        </div>
        <div className="relative">
          <Swiper
            spaceBetween={10}
            slidesPerView={2}
            breakpoints={{
              // когда ширина окна >= 0px
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              // когда ширина окна >= 480px
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
            <SwiperSlide>
              <div className="w-full h-[260px] md:h-[340px] 2xl:h-[400px]">
                <Image
                  alt="book"
                  src="/preview.jpeg"
                  className="rounded-[20px]"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-[260px] md:h-[340px] 2xl:h-[400px]">
                <Image
                  alt="book"
                  src="/book1.png"
                  className="rounded-[20px]"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-[260px] md:h-[340px] 2xl:h-[400px]">
                <Image
                  alt="book"
                  src="/book2.png"
                  className="rounded-[20px]"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-[260px] md:h-[340px] 2xl:h-[400px]">
                <Image
                  alt="book"
                  src="/book3.png"
                  className="rounded-[20px]"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Page;
