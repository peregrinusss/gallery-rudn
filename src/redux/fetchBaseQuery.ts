import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://95.165.168.235:65080/RUDN_Gallery/php/",
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
