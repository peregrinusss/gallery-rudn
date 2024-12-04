"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import InputRange from "@/components/InputRange/InputRange";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import Select from "@/components/Select/Select";
import {
  addBookArg,
  useDeleteBookMutation,
  useGetAuthorsQuery,
  useGetBookByIdMutation,
  useGetCitiesQuery,
  useGetCountriesQuery,
  useGetPublishersQuery,
  useGetSubrfQuery,
  useUpdateBookMutation,
} from "@/redux/app/apiSlice";
import { BookDetails } from "@/types";
import { createImageSrc } from "@/utils/utils";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import React, { FC, useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import Textarea from "../Textarea/Textarea";
import { useRouter } from "next/navigation";

type Props = {
  bookId: string;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

// Форма создания книги
const UpdateBookForm: FC<Props> = ({ bookId, setIsEdit }) => {
  // Получение книги с апи
  const [getBook] = useGetBookByIdMutation();
  const [book, setBook] = useState<BookDetails>();
  const [deleteBook] = useDeleteBookMutation();

  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const result = await getBook({ id: bookId }).unwrap();
        setBook(result);
        setExistingImages(
          result.Images.map((img) => ({
            path: createImageSrc(img.path),
            idImg: img.idImg,
          }))
        );
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
  const [existingImages, setExistingImages] = useState<
    { path: string; idImg: number }[]
  >([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [imagesError, setImagesError] = useState<string | null>(null);

  useEffect(() => {
    if (book) {
      reset({
        addInfo: book.addInformation,
        description: book.description,
        idCity: book.idCity,
        idCountry: book.idCountry,
        idPublisher: book.idPublisher,
        name: book.name,
        year: +book.yearPublisher,
        idSRF: book.idSRF || null,
        Author: book.Authors.map((author) => author.idAuthor.toString()),
      });
    }
  }, [book]);

  const handleAddBook = async (data: addBookArg) => {
    if (bookImages.length === 0 && existingImages.length === 0) {
      setImagesError("Загрузите хотя бы одно изображение");
      return;
    } else {
      setImagesError(null);
    }

    const formData = new FormData();

    // Вставка idBibD в объект data
    const updatedData = { ...data, idBibD: bookId };

    // Append new data
    formData.append("json", JSON.stringify(updatedData));

    // Append new images
    bookImages.forEach((file) => {
      formData.append("newImages[]", file);
    });

    // Append existing images that haven't been removed
    existingImages.forEach((img: { path: string; idImg: number }, index) => {
      if (!imagesToRemove.includes(img.idImg.toString())) {
        formData.append(`oldImages[]`, img.idImg.toString());
      }
    });

    try {
      const res = await updateBook(formData).unwrap();

      const result = await getBook({ id: bookId }).unwrap();
      setBook(result);
      setExistingImages(
        result.Images.map((img) => ({
          path: createImageSrc(img.path),
          idImg: img.idImg,
        }))
      );

      enqueueSnackbar("Книга успешно обновлена", { variant: "success" });
      setIsEdit(false);
    } catch (e) {
      enqueueSnackbar("К сожалению, что-то пошло не так", { variant: "error" });
    }
  };

  const handleDeleteBook = async () => {
    const isConfirmed = window.confirm("Вы уверены, что хотите удалить книгу?");

    if (!isConfirmed) return;

    try {
      const res = await deleteBook({ idBibD: +bookId }).unwrap();

      enqueueSnackbar("Книга успешно удалена", { variant: "success" });
      router.back();
    } catch (e) {
      enqueueSnackbar("К сожалению, что-то пошло не так", { variant: "error" });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setBookImages((prevImages) => [...prevImages, ...filesArray]);

      if (filesArray.length > 0) {
        setImagesError(null);
      }
    }
  };

  const handleRemoveImage = (index: number, isExisting = false) => {
    if (isExisting) {
      // Удаляем существующее изображение по id
      const imgToRemove = existingImages[index];
      console.log(imgToRemove);

      setImagesToRemove((prev) => [...prev, imgToRemove.idImg.toString()]);
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Удаляем добавленное изображение по индексу
      setBookImages((prev) => prev.filter((_, index) => index !== index));
    }

    if (bookImages.length === 0 && existingImages.length === 0) {
      setImagesError("Загрузите хотя бы одно изображение");
      return;
    } else {
      setImagesError(null);
    }
  };

  return (
    <div className="mt-2 pt-4 flex flex-col gap-3">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Название"
            placeholder="Введите название книги"
            type="text"
            className="flex flex-col gap-1"
            value={field.value ?? ""}
          />
        )}
      />
      <div className="flex flex-col gap-1">
        <span className="block text-base text-black font-normal mb-1">
          Год выпуска
        </span>
        <Controller
          control={control}
          name="year"
          render={({ field, fieldState }) => (
            <InputRange
              className="sm:w-64 mb-6"
              onChange={field.onChange}
              value={field.value ?? 0}
            />
          )}
        />
      </div>
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <Textarea
            {...field}
            label="Описание"
            placeholder="Введите описание"
            className="flex flex-col gap-1"
            value={field.value ?? ""}
          />
        )}
      />
      <Controller
        control={control}
        name="addInfo"
        render={({ field, fieldState }) => (
          <Textarea
            {...field}
            label="Доп. информация"
            placeholder="Введите доп. информацию"
            className="flex flex-col gap-1"
            value={field.value ?? ""}
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
          rules={{ required: "Заполните поле" }}
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
          render={({ field, fieldState }) => (
            <Select
              options={(publishers?.Publisher || [])?.map((item) => ({
                value: item.idPublisher,
                label: item.publisher,
              }))}
              value={field.value}
              onChange={field.onChange}
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
            rules={{ required: "Заполните поле" }}
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
                label: item.name
                  ? `${item.patronymic ?? ""} ${item.name} ${item.surname}`
                  : item.entity,
              }))}
              onChange={onChange}
              value={value}
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-1 w-fit">
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
            <span className="text-white text-sm font-medium">Выбрать фото</span>
          </label>
        </div>
        {imagesError && (
          <span className="block text-danger text-[10px] text-center mt-3">
            {imagesError}
          </span>
        )}
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
                  src={image.path}
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
                  onClick={() => handleRemoveImage(index, false)}
                  className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 bg-white shadow-xl"
                >
                  <IoClose className="w-6 h-6 text-black" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center gap-4 mt-4 w-fit ml-auto">
        <Button
          onClick={handleDeleteBook}
          variant="danger"
          className="ml-auto xs:!w-fit !px-5"
        >
          Удалить запись
        </Button>
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

export default UpdateBookForm;
