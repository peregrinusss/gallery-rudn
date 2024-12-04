"use client";
import AddBookForm from "@/components/AddBookForm/AddBookForm";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import InputRange from "@/components/InputRange/InputRange";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import Select from "@/components/Select/Select";
import {
  addBookArg,
  AuthorArg,
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
import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { Controller, useForm, useWatch } from "react-hook-form";
import { IoClose } from "react-icons/io5";

// Страница авторизации
const Page = () => {
  // Переменная для роутинга
  const router = useRouter();

  // Состояние раскрытия колапсов
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Изменение данных в бд
  // континент
  const [addContinent] = useAddContinentMutation();
  const [continent, setContinent] = useState("");
  const handleAddContinent = async () => {
    if (!continent.trim()) {
      enqueueSnackbar("Поле континента не может быть пустым", {
        variant: "error",
      });
      return;
    }

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
    if (!city.trim()) {
      enqueueSnackbar("Поле города не может быть пустым", { variant: "error" });
      return;
    }

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
    if (idContinent === 0) {
      enqueueSnackbar("Выберите континент", { variant: "error" });
      return;
    }

    if (idContinent && !country.trim()) {
      enqueueSnackbar("Поле страны не может быть пустым", { variant: "error" });
      return;
    }

    try {
      const res = await addCountry({
        country,
        idContinent,
      }).unwrap();
      setCountry("");
      setIdContinent(0);
      enqueueSnackbar("Страна успешно добавлена", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("К сожалению, что-то пошло не так", {
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
    if (isAuthor) {
      if (!author.surname?.trim() || !author.name?.trim()) {
        enqueueSnackbar("Фамилия и имя автора обязательны", {
          variant: "error",
        });
        return;
      }
    } else {
      if (!author.entity?.trim()) {
        enqueueSnackbar("Название организации обязательно", {
          variant: "error",
        });
        return;
      }
    }

    try {
      const authorData = author.entity
        ? { entity: author.entity }
        : {
            surname: author.surname!,
            name: author.name!,
            ...(author.patronymic ? { patronymic: author.patronymic } : {}),
          };

      const res = await addAuthor(authorData).unwrap();
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
    if (!publishing.trim()) {
      enqueueSnackbar("Поле издательства не может быть пустым", {
        variant: "error",
      });
      return;
    }

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
    if (!fd.trim()) {
      enqueueSnackbar("Поле федерального округа не может быть пустым", {
        variant: "error",
      });
      return;
    }

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
    if (!idFd) {
      enqueueSnackbar("Выберите федеральный округ", { variant: "error" });
      return;
    }

    if (!sRF.trim()) {
      enqueueSnackbar("Поле субъекта РФ не может быть пустым", {
        variant: "error",
      });
      return;
    }

    try {
      const res = await addSubrf({
        sRF,
        idFD: idFd,
      }).unwrap();
      setSRF("");
      setIdFd(0);
      enqueueSnackbar("Субъект РФ успешно добавлен", { variant: "success" });
    } catch (e) {
      enqueueSnackbar("К сожалению, что-то пошло не так", {
        variant: "error",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div
          className="cursor-pointer flex items-center gap-4"
          onClick={() => toggleSection("city")}
        >
          <h2 className="text-2xl text-black font-bold">Изменение города</h2>
          <div
            className={`transition-all ${
              openSection === "city" ? "rotate-180" : ""
            }`}
          >
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
        <Collapse isOpened={openSection === "city"}>
          <div className="flex flex-col gap-3">
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
              Изменить город
            </Button>
          </div>
        </Collapse>
      </div>
      <div className="border-t border-gray mt-2 pt-4 flex flex-col gap-3">
        <div
          className="cursor-pointer flex items-center gap-4"
          onClick={() => toggleSection("continent")}
        >
          <h2 className="text-2xl text-black font-bold">
            Изменение континента
          </h2>
          <div
            className={`transition-all ${
              openSection === "continent" ? "rotate-180" : ""
            }`}
          >
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
        <Collapse isOpened={openSection === "continent"}>
          <div className="flex flex-col gap-3">
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
              Изменить континент
            </Button>
          </div>
        </Collapse>
      </div>
      <div className="border-t border-gray mt-2 pt-4 flex flex-col gap-3">
        <div
          className="cursor-pointer flex items-center gap-4"
          onClick={() => toggleSection("country")}
        >
          <h2 className="text-2xl text-black font-bold">Изменение страны</h2>
          <div
            className={`transition-all ${
              openSection === "country" ? "rotate-180" : ""
            }`}
          >
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
        <Collapse isOpened={openSection === "country"}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="block text-base text-black font-normal mb-1">
                Континент
              </span>
              <Select
                options={(continents?.Continent || [])?.map((item) => ({
                  value: item.idContinent,
                  label: item.continent,
                }))}
                onChange={(value: any) => setIdContinent(value)}
                value={idContinent}
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
              Изменить страну
            </Button>
          </div>
        </Collapse>
      </div>
      <div className="border-t border-gray mt-2 pt-4 flex flex-col gap-3">
        <div
          className="cursor-pointer flex items-center gap-4"
          onClick={() => toggleSection("author")}
        >
          <h2 className="text-2xl text-black font-bold">Изменение автора</h2>
          <div
            className={`transition-all ${
              openSection === "author" ? "rotate-180" : ""
            }`}
          >
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
        <Collapse isOpened={openSection === "author"}>
          <div className="flex flex-col gap-3">
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
                onChange={(e) =>
                  setAuthor({ ...author, entity: e.target.value })
                }
                label="Организация"
                placeholder="Введите организацию"
                type="text"
              />
            ) : (
              <div className="flex flex-col gap-4">
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
                  onChange={(e) =>
                    setAuthor({ ...author, name: e.target.value })
                  }
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
              Изменить автора
            </Button>
          </div>
        </Collapse>
      </div>
      <div className="border-t border-gray mt-2 pt-4 flex flex-col gap-3">
        <div
          className="cursor-pointer flex items-center gap-4"
          onClick={() => toggleSection("publisher")}
        >
          <h2 className="text-2xl text-black font-bold">
            Изменение издательства
          </h2>
          <div
            className={`transition-all ${
              openSection === "publisher" ? "rotate-180" : ""
            }`}
          >
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
        <Collapse isOpened={openSection === "publisher"}>
          <div className="flex flex-col gap-3">
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
              Изменить издательство
            </Button>
          </div>
        </Collapse>
      </div>
      <div className="border-t border-gray mt-2 pt-4 flex flex-col gap-3">
        <div
          className="cursor-pointer flex items-center gap-4"
          onClick={() => toggleSection("district")}
        >
          <h2 className="text-2xl text-black font-bold">Изменение округа</h2>
          <div
            className={`transition-all ${
              openSection === "district" ? "rotate-180" : ""
            }`}
          >
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
        <Collapse isOpened={openSection === "district"}>
          <div className="flex flex-col gap-3">
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
              Изменить округ
            </Button>
          </div>
        </Collapse>
      </div>
      <div className="border-t border-gray mt-2 pt-4 flex flex-col gap-3">
        <div
          className="cursor-pointer flex items-center gap-4"
          onClick={() => toggleSection("subject")}
        >
          <h2 className="text-2xl text-black font-bold">Изменение субъекта</h2>
          <div
            className={`transition-all ${
              openSection === "subject" ? "rotate-180" : ""
            }`}
          >
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
        <Collapse isOpened={openSection === "subject"}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="block text-base text-black font-normal mb-1">
                Федеральный округ
              </span>
              <Select
                options={(fds?.FederalDistrict || [])?.map((item) => ({
                  value: item.idFD,
                  label: item.federalDistrict,
                }))}
                onChange={(value: any) => setIdFd(value)}
                value={idFd}
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
              Изменить субъект
            </Button>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default Page;
