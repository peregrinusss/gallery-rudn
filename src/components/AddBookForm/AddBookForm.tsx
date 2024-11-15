"use client";

import React, { use, useState } from "react";
import {
  addBookArg,
  useAddBookMutation,
  useGetAuthorsQuery,
  useGetCitiesQuery,
  useGetCountriesQuery,
  useGetPublishersQuery,
  useGetSubrfQuery,
} from "@/redux/app/apiSlice";
import { Controller, useForm, useWatch } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import InputRange from "@/components/InputRange/InputRange";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import Select from "@/components/Select/Select";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

// Форма создания книги
const AddBookForm: React.FC = () => {
  const { data: cities } = useGetCitiesQuery({});
  const { data: publishers } = useGetPublishersQuery({});
  const { data: countries } = useGetCountriesQuery({});
  const { data: subrfs } = useGetSubrfQuery({});
  const { data: authors } = useGetAuthorsQuery({});
  const [addBook] = useAddBookMutation();

  const { control, handleSubmit, reset, setValue } = useForm<addBookArg>({
    defaultValues: {
      addInfo: "",
      description: "",
      idCity: null,
      idCountry: null,
      idPublisher: null,
      name: "",
      year: 1901,
      Author: [],
      idSRF: null,
    },
  });

  const { idCountry } = useWatch({ control });

  const [bookImages, setBookImages] = useState<File[]>([]);
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const [imagesError, setImagesError] = useState<string | null>(null);

  const handleAddBook = async (data: addBookArg) => {
    if (bookImages.length === 0) {
      setImagesError("Загрузите хотя бы одно изображение");
      return;
    } else {
      setImagesError(null);
    }

    const formData = new FormData();
    formData.append("json", JSON.stringify(data));

    bookImages.forEach((file) => {
      formData.append("images[]", file);
    });

    try {
      const res = await addBook(formData).unwrap();
      reset({
        addInfo: "",
        description: "",
        idCity: undefined,
        idCountry: undefined,
        idPublisher: undefined,
        name: "",
        year: 1901,
        Author: [],
        idSRF: null,
      });
      setValue("Author", []);
      setBase64Images([]);
      setBookImages([]);
      enqueueSnackbar("Книга успешно добавлена", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("К сожалению, что-то пошло не так", { variant: "error" });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setBookImages((prevImages) => [...prevImages, ...filesArray]);
      convertFilesToBase64(filesArray);

      if (filesArray.length > 0) {
        setImagesError(null);
      }
    }
  };

  const convertFilesToBase64 = (files: File[]) => {
    const promises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(promises)
      .then((results) =>
        setBase64Images((prevBase64Images) => [...prevBase64Images, ...results])
      )
      .catch((error) =>
        console.error("Error converting files to Base64:", error)
      );
  };

  const handleRemoveImage = (index: number) => {
    const updatedBookImages = bookImages.filter((_, i) => i !== index);
    const updatedBase64Images = base64Images.filter((_, i) => i !== index);
    setBookImages(updatedBookImages);
    setBase64Images(updatedBase64Images);

    if (updatedBookImages.length === 0) {
      setImagesError("Загрузите хотя бы одно изображение");
    } else {
      setImagesError(null);
    }
  };

  return (
    <div className="flex flex-col gap-3">
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
          rules={{ required: "Заполните поле" }}
          render={({ field, fieldState }) => (
            <InputRange
              className="sm:w-64 mb-6"
              error={fieldState.error}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <Input
            {...field}
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
        render={({ field, fieldState }) => (
          <Input
            {...field}
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
                label:
                  item.entity !== null
                    ? item.entity
                    : item.name + " " + item.surname + " " + item.patronymic,
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
          <span className="block text-danger text-[10px] text-center mt-3">{imagesError}</span>
        )}
      </div>
      {base64Images.length > 0 && (
        <div className="flex items-center gap-5 flex-wrap">
          {base64Images.map((image, index) => (
            <div key={index} className="relative w-fit">
              <Image
                src={image}
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
      )}
      <Button
        onClick={handleSubmit(handleAddBook)}
        variant="primary"
        className="ml-auto xs:!w-fit !px-5"
      >
        Создать книгу
      </Button>
    </div>
  );
};

export default AddBookForm;
