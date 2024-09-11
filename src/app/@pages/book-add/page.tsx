"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import Select from "@/components/Select/Select";
import {
  AuthorArg,
  AuthorResponse,
  useAddAuthorMutation,
  useAddBookMutation,
  useAddCityMutation,
  useAddContinentMutation,
  useAddCountryMutation,
  useAddFDMutation,
  useAddPublishingMutation,
  useAddSRFMutation,
  useGetAuthorsQuery,
  useGetCitiesQuery,
  useGetContinentsQuery,
  useGetCountriesQuery,
  useGetFDQuery,
  useGetPublishersQuery,
  useGetSubrfQuery,
} from "@/redux/app/apiSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { use, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

// Страница авторизации
const Page = () => {
  // Переменная для роутинга
  const router = useRouter();

  // Добавление данных в бд
  // континент
  const [addContinent] = useAddContinentMutation();
  const [continent, setContinent] = useState("");
  const handleAddContinent = async () => {
    try {
      const res = await addContinent({
        continent,
      }).unwrap();
      setContinent("");
      enqueueSnackbar("Континент успешно добавлен", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("К сожалению, что-то пошло не так", { variant: "error" });
    }
  };

  // город
  const [addCity] = useAddCityMutation();
  const [city, setCity] = useState("");
  const handleAddCity = async () => {
    try {
      const res = await addCity({
        city,
      }).unwrap();
      setCity("");
      enqueueSnackbar("Город успешно добавлен", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("К сожалению, что-то пошло не так", { variant: "error" });
    }
  };

  // страна
  const [addCountry] = useAddCountryMutation();
  const { data: continents } = useGetContinentsQuery({});
  const [country, setCountry] = useState("");
  const [idContinent, setIdContinent] = useState<number>(0);
  const handleAddCountry = async () => {
    try {
      const res = await addCountry({
        country,
        idContinent,
      }).unwrap();
      setCountry("");
      enqueueSnackbar("Страна успешно добавлена", { variant: "success" });
    } catch (e) {
      idContinent === 0
        ? enqueueSnackbar("Выберите континент", { variant: "error" })
        : enqueueSnackbar("К сожалению, что-то пошло не так", {
            variant: "error",
          });
    }
  };

  // автор
  const [addAuthor] = useAddAuthorMutation();
  const [author, setAuthor] = useState<AuthorArg>({
    surname: null,
    name: null,
    patronymic: null,
    entity: null,
  });
  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    if (isAuthor) {
      setAuthor({ ...author, entity: null });
    } else {
      setAuthor({ ...author, surname: null, name: null, patronymic: null });
    }
  }, [isAuthor]);
  const handleAddAuthor = async () => {
    try {
      const res = await addAuthor({
        entity: author?.entity!,
        name: author?.name!,
        patronymic: author?.patronymic!,
        surname: author?.surname!,
      }).unwrap();
      setAuthor({ surname: null, name: null, patronymic: null, entity: null });
      enqueueSnackbar("Автор успешно добавлен", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("К сожалению, что-то пошло не так", {
        variant: "error",
      });
    }
  };

  // издательство
  const [addPublishing] = useAddPublishingMutation();
  const [publishing, setPublishing] = useState("");
  const handleAddPublishing = async () => {
    try {
      const res = await addPublishing({
        publishing,
      }).unwrap();
      setPublishing("");
      enqueueSnackbar("Издательствор успешно добавлено", {
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar("К сожалению, что-то пошло не так", { variant: "error" });
    }
  };

  // федеральный округ
  const [addFd] = useAddFDMutation();
  const [fd, setFd] = useState("");
  const handleAddFD = async () => {
    try {
      const res = await addFd({
        fd,
      }).unwrap();
      setFd("");
      enqueueSnackbar("Федеральный округ успешно добавлен", {
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar("К сожалению, что-то пошло не так", { variant: "error" });
    }
  };

  // субъект
  const [addSubrf] = useAddSRFMutation();
  const { data: fds } = useGetFDQuery({});
  const [sRF, setSRF] = useState("");
  const [idFd, setIdFd] = useState<number>(0);
  const handleAddSubrf = async () => {
    try {
      const res = await addSubrf({
        sRF,
        idFD: idFd,
      }).unwrap();
      setSRF("");
      enqueueSnackbar("Субъект РФ успешно добавлен", { variant: "success" });
    } catch (e) {
      idFd === 0
        ? enqueueSnackbar("Выберите федеральный округ", { variant: "error" })
        : enqueueSnackbar("К сожалению, что-то пошло не так", {
            variant: "error",
          });
    }
  };

  const { data: cities } = useGetCitiesQuery({});
  const { data: publishers } = useGetPublishersQuery({});
  const { data: countries } = useGetCountriesQuery({});
  const { data: subrfs } = useGetSubrfQuery({});
  const { data: authors } = useGetAuthorsQuery({});

  // создание книги
  const [addBook] = useAddBookMutation();
  const [bookName, setBookName] = useState("");
  const [bookYear, setBookYear] = useState("");
  const [bookIdPublisher, setBookIdPublisher] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookAddInfo, setBookAddInfo] = useState("");
  const [bookIdCity, setBookIdCity] = useState("");
  const [bookIdCountry, setBookIdCountry] = useState("");
  const [bookIdsrf, setBookIdsrf] = useState("");
  const [bookIdsAuthor, setBookIdsAuthor] = useState<number[]>([]);
  const [bookImages, setBookImages] = useState<File[]>([]);
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const handleAddBook = async () => {
    try {
      const res = await addBook({
        name: bookName,
        year: bookYear,
        idPublisher: bookIdPublisher,
        description: bookDescription,
        addInfo: bookAddInfo,
        idCity: bookIdCity,
        idCountry: bookIdCountry,
        idSRF: bookIdsrf,
        Author: bookIdsAuthor,
        Imgs: base64Images,
      }).unwrap();
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
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl text-black font-bold">Добавление города</h2>
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          label="Город"
          placeholder="Введите город"
          type="text"
        />
        <Button
          onClick={handleAddCity}
          variant="primary"
          className="ml-auto xs:!w-fit !px-5"
        >
          Добавить город
        </Button>
      </div>
      <div className="border-t border-gray mt-2 pt-4 flex flex-col gap-3">
        <h2 className="text-2xl text-black font-bold">Добавление континента</h2>
        <Input
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          label="Континент"
          placeholder="Введите континент"
          type="text"
        />
        <Button
          onClick={handleAddContinent}
          variant="primary"
          className="ml-auto xs:!w-fit !px-5"
        >
          Добавить континент
        </Button>
      </div>
      <div className="border-t border-gray mt-2 pt-4 flex flex-col gap-3">
        <h2 className="text-2xl text-black font-bold">Добавление страны</h2>
        <div className="flex flex-col gap-1">
          <span className="block text-base text-black font-normal mb-1">
            Континент
          </span>
          <Select
            options={(continents?.Continent || [])?.map((item) => ({
              value: item.idContinent,
              label: item.continent,
            }))}
            onChange={(e: any) => setIdContinent(e.value)}
          />
        </div>
        <Input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          label="Страна"
          placeholder="Введите страну"
          type="text"
        />
        <Button
          onClick={handleAddCountry}
          variant="primary"
          className="ml-auto xs:!w-fit !px-5"
        >
          Добавить страну
        </Button>
      </div>
      <div className="border-t border-gray mt-2 pt-4 flex flex-col gap-3">
        <h2 className="text-2xl text-black font-bold">Добавление автора</h2>
        <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] mt-3">
          <input
            className="relative border-white shadow-sm bg-white float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            type="checkbox"
            value=""
            id="checkboxDefault"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setIsAuthor(event.target.checked);
            }}
          />
          <label
            className="inline-block pl-[0.15rem] hover:cursor-pointer text-base text-black font-normal leading-6 transition-colors duration-200 ease-in-out"
            htmlFor="checkboxDefault"
          >
            Автор известен
          </label>
        </div>
        {!isAuthor ? (
          <Input
            value={author?.entity || ""}
            onChange={(e) => setAuthor({ ...author, entity: e.target.value })}
            label="Организация"
            placeholder="Введите организацию"
            type="text"
            className="mt-4"
          />
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            <Input
              value={author?.surname || ""}
              onChange={(e) =>
                setAuthor({ ...author, surname: e.target.value })
              }
              label="Фамилия автора"
              placeholder="Введите фамилию автора"
              type="text"
            />
            <Input
              value={author?.name || ""}
              onChange={(e) => setAuthor({ ...author, name: e.target.value })}
              label="Имя автора"
              placeholder="Введите имя автора"
              type="text"
            />
            <Input
              value={author?.patronymic || ""}
              onChange={(e) =>
                setAuthor({ ...author, patronymic: e.target.value })
              }
              label="Отчество автора"
              placeholder="Введите отчество автора"
              type="text"
            />
          </div>
        )}
        <Button
          onClick={handleAddAuthor}
          variant="primary"
          className="ml-auto xs:!w-fit !px-5"
        >
          Добавить автора
        </Button>
      </div>
      <div className="border-t border-gray mt-2 pt-4 flex flex-col gap-3">
        <h2 className="text-2xl text-black font-bold">
          Добавление издательства
        </h2>
        <Input
          value={publishing}
          onChange={(e) => setPublishing(e.target.value)}
          label="Издательство"
          placeholder="Введите название издательства"
          type="text"
          className="flex flex-col gap-1"
        />
        <Button
          onClick={handleAddPublishing}
          variant="primary"
          className="ml-auto xs:!w-fit !px-5"
        >
          Добавить издательство
        </Button>
      </div>

      <div className="border-t border-gray mt-2 pt-4 flex flex-col gap-3">
        <h2 className="text-2xl text-black font-bold">Добавление округа</h2>
        <Input
          value={fd}
          onChange={(e) => setFd(e.target.value)}
          label="Федеральный округ"
          placeholder="Введите Федеральный округ"
          type="text"
        />
        <Button
          onClick={handleAddFD}
          variant="primary"
          className="ml-auto xs:!w-fit !px-5"
        >
          Добавить округ
        </Button>
      </div>

      <div className="border-t border-gray mt-2 pt-4 flex flex-col gap-3">
        <h2 className="text-2xl text-black font-bold">Добавление субъекта</h2>
        <div className="flex flex-col gap-1">
          <span className="block text-base text-black font-normal mb-1">
            Федеральный округ
          </span>
          <Select
            options={(fds?.FederalDistrict || [])?.map((item) => ({
              value: item.idFD,
              label: item.federalDistrict,
            }))}
            onChange={(e: any) => setIdFd(e.value)}
          />
        </div>
        <Input
          value={sRF}
          onChange={(e) => setSRF(e.target.value)}
          label="Субъект РФ"
          placeholder="Введите субъект РФ"
          type="text"
        />
        <Button
          onClick={handleAddSubrf}
          variant="primary"
          className="ml-auto xs:!w-fit !px-5"
        >
          Добавить субъект
        </Button>
      </div>
      <div className="border-t border-gray mt-2 pt-4 flex flex-col gap-3">
        <h2 className="text-2xl text-black font-bold">Создание книги</h2>
        <Input
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          label="Название"
          placeholder="Введите название книги"
          type="text"
          className="flex flex-col gap-1"
        />
        <Input
          value={bookYear}
          onChange={(e) => setBookYear(e.target.value)}
          label="Год выпуска"
          placeholder="Введите год выпуска"
          type="text"
          className="flex flex-col gap-1"
        />
        <Input
          value={bookDescription}
          onChange={(e) => setBookDescription(e.target.value)}
          label="Описание"
          placeholder="Введите описание"
          type="text"
          className="flex flex-col gap-1"
        />
        <Input
          value={bookAddInfo}
          onChange={(e) => setBookAddInfo(e.target.value)}
          label="Доп. информация"
          placeholder="Введите доп. информацию"
          type="text"
          className="flex flex-col gap-1"
        />
        <div className="flex flex-col gap-1">
          <span className="block text-base text-black font-normal mb-1">
            Город
          </span>
          <Select
            options={(cities?.City || [])?.map((item) => ({
              value: item.idCity,
              label: item.city,
            }))}
            onChange={(e: any) => setBookIdCity(e.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="block text-base text-black font-normal mb-1">
            Издательство
          </span>
          <Select
            options={(publishers?.Publisher || [])?.map((item) => ({
              value: item.idPublisher,
              label: item.publisher,
            }))}
            onChange={(e: any) => setBookIdPublisher(e.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="block text-base text-black font-normal mb-1">
            Страна
          </span>
          <Select
            options={(countries?.Country || [])?.map((item) => ({
              value: item.idCountry,
              label: item.country,
            }))}
            onChange={(e: any) => setBookIdPublisher(e.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="block text-base text-black font-normal mb-1">
            Субъект РФ
          </span>
          <Select
            options={(subrfs?.SubjectRF || [])?.map((item) => ({
              value: item.idSubjectRF,
              label: item.subjectRF,
            }))}
            onChange={(e: any) => setBookIdsrf(e.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="block text-base text-black font-normal mb-1">
            Авторы
          </span>
          <MultiSelect
            options={(authors?.Author || [])?.map((item) => ({
              value: item.idAuthor,
              label:
                item.entity !== null
                  ? item.entity
                  : item.name + " " + item.surname + " " + item.patronymic,
            }))}
            onChange={(selectedOptions) => {
              setBookIdsAuthor(selectedOptions.map((option) => +option.value));
            }}
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
          onClick={handleAddBook}
          variant="primary"
          className="ml-auto xs:!w-fit !px-5"
        >
          Создать книгу
        </Button>
      </div>
    </div>
  );
};

export default Page;
