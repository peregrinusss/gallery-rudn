import { BookDetails, Books, FilterOptions } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Все запросы к апи
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://95.165.168.235:65080/RUDN_Gallery/php/interface/", // Updated to use the proxy
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<Books, {}>({
      query: (params) => ({
        url: "catalog.php",
        method: "GET",
        params,
      }),
    }),
    getFilterOptions: builder.query<FilterOptions, {}>({
      query: (params) => ({
        url: "filter.php",
        method: "GET",
        params,
      }),
    }),
    // getBookById: builder.query<BookDetails, { id: string }>({
    //   query: (params) => ({
    //     url: "book.php",
    //     method: "POST",
    //     params,
    //   }),
    // }),

    getBookById: builder.mutation<BookDetails, { id: string }>({
      query: (body) => ({
        url: "book.php",
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
} = apiSlice;
