import { BookDetails, Books, FilterOptions } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type filterCatalogArg = {
  query: string;
  filCountry: string | null;
  filCity: string | null;
  filFD: string | null;
  filSubjectRF: string | null;
  filAuthor: string | null;
  filPublishing: string | null;
  filContinent: string | null;
};

type ContinentResponse = {
  Continent: {
    idContinent: string;
    continent: string;
  }[];
};

export type AuthorArg = {
  surname: string | null;
  name: string | null;
  patronymic: string | null;
  entity: string | null;
};

type fdResponse = {
  FederalDistrict: {
    idFD: string;
    federalDistrict: string;
    idCountry: string;
  }[];
};

type addBookArg = {
  name: string;
  year: string;
  idPublisher: string;
  description: string;
  addInfo: string;
  idCity: string | null;
  idCountry: string;
  idSRF: string | null;
  Author: number[];
  Imgs: string[] | null;
};

type citiesResponse = {
  City: {
    idCity: string;
    city: string;
  }[];
};

type publishersResponse = {
  Publisher: {
    idPublisher: string;
    publisher: string;
  }[];
};

type countriesResponse = {
  Country: {
    idCountry: string;
    country: string;
  }[];
};

type srfsResponse = {
  SubjectRF: {
    idSubjectRF: string;
    subjectRF: string;
    idFederalDistrict: string;
  }[];
};

export type AuthorResponse = {
  Author: {
    idAuthor: string;
    surname: string;
    name: string;
    patronymic: string;
    entity: string;
  }[];
};

// Все запросы к апи
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://95.165.168.235:65080/RUDN_Gallery/php/",
  }),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "/api/RUDN_Gallery/php/", // Используем прокси
  // }),
  endpoints: (builder) => ({
    getBooks: builder.query<Books, {}>({
      query: (params) => ({
        url: "interface/catalog.php",
        method: "GET",
        params,
      }),
    }),
    getFilterOptions: builder.query<FilterOptions, {}>({
      query: (params) => ({
        url: "interface/filter.php",
        method: "GET",
        params,
      }),
    }),
    filterCatalog: builder.mutation<Books, filterCatalogArg>({
      query: (body) => ({
        url: "interface/search.php",
        method: "POST",
        body,
      }),
    }),
    getBookById: builder.mutation<BookDetails, { id: string }>({
      query: (body) => ({
        url: "interface/book.php",
        method: "POST",
        body,
      }),
    }),
    addContinent: builder.mutation<{}, { continent: string }>({
      query: (body) => ({
        url: "function/addDataDB/addContinent.php",
        method: "POST",
        body,
      }),
    }),
    addCity: builder.mutation<{}, { city: string }>({
      query: (body) => ({
        url: "function/addDataDB/addCity.php",
        method: "POST",
        body,
      }),
    }),
    addCountry: builder.mutation<{}, { country: string; idContinent: number }>({
      query: (body) => ({
        url: "function/addDataDB/addCountry.php",
        method: "POST",
        body,
      }),
    }),
    getContinents: builder.query<ContinentResponse, {}>({
      query: (params) => ({
        url: "function/selectData/selectContinent.php",
        method: "GET",
        params,
      }),
    }),
    addAuthor: builder.mutation<{}, AuthorArg>({
      query: (body) => ({
        url: "function/addDataDB/addAuthor.php",
        method: "POST",
        body,
      }),
    }),
    getAuthors: builder.query<AuthorResponse, {}>({
      query: (params) => ({
        url: "function/selectData/selectAuthor.php",
        method: "GET",
        params,
      }),
    }),
    addPublishing: builder.mutation<{}, { publishing: string }>({
      query: (body) => ({
        url: "function/addDataDB/addPublishing.php",
        method: "POST",
        body,
      }),
    }),
    addFD: builder.mutation<{}, { fd: string }>({
      query: (body) => ({
        url: "function/addDataDB/addFD.php",
        method: "POST",
        body,
      }),
    }),
    getFD: builder.query<fdResponse, {}>({
      query: (params) => ({
        url: "function/selectData/selectFD.php",
        method: "GET",
        params,
      }),
    }),
    getCities: builder.query<citiesResponse, {}>({
      query: (params) => ({
        url: "function/selectData/selectCity.php",
        method: "GET",
        params,
      }),
    }),
    getPublishers: builder.query<publishersResponse, {}>({
      query: (params) => ({
        url: "function/selectData/selectPub.php",
        method: "GET",
        params,
      }),
    }),
    getCountries: builder.query<countriesResponse, {}>({
      query: (params) => ({
        url: "function/selectData/selectCountry.php",
        method: "GET",
        params,
      }),
    }),
    getSubrf: builder.query<srfsResponse, {}>({
      query: (params) => ({
        url: "function/selectData/selectS_RF.php",
        method: "GET",
        params,
      }),
    }),
    addSRF: builder.mutation<{}, { sRF: string; idFD: number }>({
      query: (body) => ({
        url: "function/addDataDB/addS_RF.php",
        method: "POST",
        body,
      }),
    }),
    addBook: builder.mutation<{}, addBookArg>({
      query: (body) => ({
        url: "function/addDataDB/addBibD.php",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetFilterOptionsQuery,
  useGetBookByIdMutation,
  useFilterCatalogMutation,
  useAddContinentMutation,
  useAddCityMutation,
  useAddCountryMutation,
  useGetContinentsQuery,
  useAddAuthorMutation,
  useGetAuthorsQuery,
  useAddPublishingMutation,
  useAddFDMutation,
  useAddSRFMutation,
  useGetFDQuery,
  useAddBookMutation,
  useGetCitiesQuery,
  useGetPublishersQuery,
  useGetCountriesQuery,
  useGetSubrfQuery,
} = apiSlice;
