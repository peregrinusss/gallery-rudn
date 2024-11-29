import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/RUDN_Gallery/php/`,
  prepareHeaders: (headers) => {
    // Получаем токен из localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Добавляем токен в заголовок Authorization
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export default baseQuery;
