"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { FC, PropsWithChildren } from "react";

const ClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ClientProvider;
