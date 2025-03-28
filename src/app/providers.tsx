"use client";
import ErrorSnackbar from "@/components/ErrorSnackbar";
import SuccessSnackbar from "@/components/SuccessSnackbar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { FC, PropsWithChildren } from "react";
import { SnackbarProvider } from "notistack";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const ClientProvider: FC<PropsWithChildren> = ({ children }) => {
  const persistor = persistStore(store);

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      maxSnack={1}
      Components={{ success: SuccessSnackbar, error: ErrorSnackbar }}
      autoHideDuration={2000}
    >
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>{children}</Provider>
      </PersistGate>
    </SnackbarProvider>
  );
};

export default ClientProvider;
