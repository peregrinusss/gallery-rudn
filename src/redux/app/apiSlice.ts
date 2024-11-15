import { BookDetails, Books, FilterOptions } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQuery from "../fetchBaseQuery";

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
  surname?: string | null;
  name?: string | null;
  patronymic?: string | null;
  entity?: string | null;
};

type fdResponse = {
  FederalDistrict: {
    idFD: string;
    federalDistrict: string;
    idCountry: string;
  }[];
};

export type addBookArg = {
  name: string;
  year: number;
  idPublisher: number | null;
  description: string;
  addInfo: string;
  idCity: number | null;
  idCountry: number | null;
  idSRF: number | null;
  Author: string[];
  // 'images[]': string[] | null;
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

export type LoginArg = {
  login: string;
  password: string;
};

// Все запросы к апи
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "/api/RUDN_Gallery/php/", // Используем прокси
  // }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, LoginArg>({
      query: (body) => ({
        url: "function/authorization/authorization.php",
        method: "POST",
        body,
      }),
    }),
    getBooks: builder.query<Books, { query?: string }>({
      query: (queryArg) => ({
        url: "interface/catalog.php",
        method: "GET",
        params: {
          query: queryArg.query,
        },
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
    addBook: builder.mutation({
      query: (formData) => ({
        url: "function/addDataDB/addBibD.php",
        method: "POST",
        body: formData,
      }),
    }),
    updateBook: builder.mutation({
      query: (formData) => ({
        url: "function/updateDataDB/updateBibD.php",
        method: "POST",
        body: formData,
      }),
    }),
    deleteBook: builder.mutation<{}, { idBibD: number }>({
      query: (body) => ({
        url: "function/deleteDataDB/deleteBibD.php",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
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
  useUpdateBookMutation,
  useDeleteBookMutation,
} = apiSlice;
