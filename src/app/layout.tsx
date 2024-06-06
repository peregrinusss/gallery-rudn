import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { FC } from "react";
import ClientProvider from "./ClientProvider";

// Шрифт
const montserrat = Montserrat({ subsets: ["latin"] });

type Props = {
  pages: React.ReactNode;
  children: React.ReactNode;
};

// Мета данные
export const metadata: Metadata = {
  title: "Выставка Мир и РУДН",
  description: "Выставка Мир и РУДН",
};

// Корневой лэйаут
const RootLayout: FC<Props> = ({ pages, children }) => {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ClientProvider>
          {pages}
          {children}
        </ClientProvider>
      </body>
    </html>
  );
};
export default RootLayout;
