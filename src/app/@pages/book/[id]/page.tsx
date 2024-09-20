"use client";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { MdKeyboardArrowLeft } from "react-icons/md";

// Импорт Swiper стилей
import "swiper/css";
import "swiper/css/pagination";
import { BookDetails, CatalogPagesParams } from "@/types";
import {
  addBookArg,
  AuthorArg,
  useGetAuthorsQuery,
  useGetBookByIdMutation,
  useGetCitiesQuery,
  useGetCountriesQuery,
  useGetPublishersQuery,
  useGetSubrfQuery,
  useUpdateBookMutation,
} from "@/redux/app/apiSlice";
import { createImageSrc } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { Controller, useForm, useWatch } from "react-hook-form";
import Input from "@/components/Input/Input";
import Select from "@/components/Select/Select";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import Button from "@/components/Button/Button";
import { IoClose } from "react-icons/io5";

// Страница авторизации
const Page: FC<CatalogPagesParams> = ({ params }) => {
  // Получения id текущей книги
  const { id: bookId } = params;

  // Получение переменной для навигации
  const router = useRouter();

  // Получение книги с апи
  const [getBook] = useGetBookByIdMutation();
  const [book, setBook] = useState<BookDetails>();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const result = await getBook({ id: bookId }).unwrap();
        setBook(result);
        setExistingImages(result.Images.map((img) => createImageSrc(img.path)));
      } catch (error) {
        console.error(error);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId, getBook]);

  const { data: cities } = useGetCitiesQuery({});
  const { data: publishers } = useGetPublishersQuery({});
  const { data: countries } = useGetCountriesQuery({});
  const { data: subrfs } = useGetSubrfQuery({});
  const { data: authors } = useGetAuthorsQuery({});

  // обновление книги
  const { control, handleSubmit, reset, setValue } = useForm<addBookArg>();
  const { idCountry } = useWatch({ control });
  const [updateBook] = useUpdateBookMutation();
  const [bookImages, setBookImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

  useEffect(() => {
    if (book) {
      reset({
        addInfo: book.addInformation,
        description: book.description,
        idCity: book.idCity,
        idCountry: book.idCountry,
        idPublisher: book.idPublisher,
        name: book.name,
        year: book.yearPublisher,
      });
    }
  }, [book]);

  const handleAddBook = async (data: addBookArg) => {
    const formData = new FormData();

    // Append new data
    formData.append("json", JSON.stringify(data));

    // Append new images
    bookImages.forEach((file) => {
      formData.append("images[]", file);
    });

    // Append existing images that haven't been removed
    existingImages.forEach((img, index) => {
      if (!imagesToRemove.includes(img)) {
        formData.append(`images[]`, img);
      }
    });

    try {
      const res = await updateBook(formData).unwrap();

      enqueueSnackbar("Книга успешно обновлена", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("К сожалению, что-то пошло не так", { variant: "error" });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setBookImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleRemoveImage = (index: number, isExisting = false) => {
    if (isExisting) {
      const imgToRemove = existingImages[index];
      setImagesToRemove((prev) => [...prev, imgToRemove]);
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setBookImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="relative z-20">
      <div className="flex flex-col gap-2">
        <div
          onClick={() => router.back()}
          className="cursor-pointer active:opacity-70 transition-all flex items-center"
        >
          <MdKeyboardArrowLeft className="text-primary w-6 h-6" />
          <span className="text-lg text-primary font-bold">Назад</span>
        </div>
        <h2 className="text-xl md:text-3xl text-black font-bold">
          Изменение книги
        </h2>
      </div>
      <div className="mt-2 pt-4 flex flex-col gap-3">
        <Controller
          control={control}
          name="name"
          rules={{ required: "Заполните поле" }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              error={fieldState.error}
              label="Название"
              placeholder="Введите название книги"
              type="text"
              className="flex flex-col gap-1"
            />
          )}
        />
        <Controller
          control={control}
          name="year"
          rules={{ required: "Заполните поле" }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              error={fieldState.error}
              label="Год выпуска"
              placeholder="Введите год выпуска"
              type="text"
              className="flex flex-col gap-1"
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: "Заполните поле" }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              error={fieldState.error}
              label="Описание"
              placeholder="Введите описание"
              type="text"
              className="flex flex-col gap-1"
            />
          )}
        />
        <Controller
          control={control}
          name="addInfo"
          rules={{ required: "Заполните поле" }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              error={fieldState.error}
              label="Доп. информация"
              placeholder="Введите доп. информацию"
              type="text"
              className="flex flex-col gap-1"
            />
          )}
        />
        <div className="flex flex-col gap-1">
          <span className="block text-base text-black font-normal mb-1">
            Город
          </span>
          <Controller
            control={control}
            name="idCity"
            render={({ field, fieldState }) => (
              <Select
                options={(cities?.City || [])?.map((item) => ({
                  value: item.idCity,
                  label: item.city,
                }))}
                value={field.value!}
                onChange={field.onChange}
                error={fieldState.error}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="block text-base text-black font-normal mb-1">
            Издательство
          </span>
          <Controller
            control={control}
            name="idPublisher"
            rules={{ required: "Заполните поле" }}
            render={({ field, fieldState }) => (
              <Select
                options={(publishers?.Publisher || [])?.map((item) => ({
                  value: item.idPublisher,
                  label: item.publisher,
                }))}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="block text-base text-black font-normal mb-1">
            Страна
          </span>
          <Controller
            control={control}
            name="idCountry"
            rules={{ required: "Заполните поле" }}
            render={({ field, fieldState }) => (
              <Select
                options={(countries?.Country || [])?.map((item) => ({
                  value: item.idCountry,
                  label: item.country,
                }))}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
              />
            )}
          />
        </div>
        {idCountry?.toString() === "6" && (
          <div className="flex flex-col gap-1">
            <span className="block text-base text-black font-normal mb-1">
              Субъект РФ
            </span>
            <Controller
              control={control}
              name="idSRF"
              render={({ field, fieldState }) => (
                <Select
                  options={(subrfs?.SubjectRF || [])?.map((item) => ({
                    value: item.idSubjectRF,
                    label: item.subjectRF,
                  }))}
                  value={field.value!}
                  onChange={field.onChange}
                  error={fieldState.error}
                />
              )}
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <span className="block text-base text-black font-normal mb-1">
            Авторы
          </span>
          <Controller
            control={control}
            name="Author"
            render={({ field: { value, onChange } }) => (
              <MultiSelect
                options={(authors?.Author || [])?.map((item) => ({
                  value: item.idAuthor,
                  label:
                    item.entity !== null
                      ? item.entity
                      : item.name + " " + item.surname + " " + item.patronymic,
                }))}
                onChange={onChange}
                value={+value}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="block text-base text-black font-normal mb-1">
            Загрузить изображения
          </span>
          <div className="relative mt-2">
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              className="block text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none w-full h-full opacity-0 absolute"
            />
            <label
              htmlFor="file-upload"
              className="py-2 px-3 rounded-[20px] bg-primary cursor-pointer active:opacity-70 transition-all relative"
            >
              <span className="text-white text-sm font-medium">
                Выбрать фото
              </span>
            </label>
          </div>
        </div>

        {existingImages.length > 0 && (
          <div className="flex flex-col gap-4 mt-4">
            <h3 className="text-base text-black font-medium">
              Текущие изображения
            </h3>
            <div className="flex items-center gap-5 flex-wrap">
              {existingImages.map((image, index) => (
                <div key={index} className="relative w-fit">
                  <Image
                    src={image}
                    width={500}
                    height={500}
                    alt={`preview ${index}`}
                    className="w-40 h-40 object-cover rounded"
                  />
                  <button
                    onClick={() => handleRemoveImage(index, true)}
                    className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 bg-white shadow-xl"
                  >
                    <IoClose className="w-6 h-6 text-black" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {bookImages.length > 0 && (
          <div className="flex flex-col gap-4 mt-4">
            <h3 className="text-base text-black font-medium">
              Новые изображения
            </h3>
            <div className="flex items-center gap-5 flex-wrap">
              {bookImages.map((file, index) => (
                <div key={index} className="relative w-fit">
                  <Image
                    src={URL.createObjectURL(file)}
                    width={500}
                    height={500}
                    alt={`preview ${index}`}
                    className="w-40 h-40 object-cover rounded"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 bg-white shadow-xl"
                  >
                    <IoClose className="w-6 h-6 text-black" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <Button
          onClick={handleSubmit(handleAddBook)}
          variant="primary"
          className="ml-auto xs:!w-fit !px-5"
        >
          Обновить запись
        </Button>
      </div>
    </div>
  );
};

export default Page;
