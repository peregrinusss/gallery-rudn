import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { FC } from "react";
import Providers from "./providers";
import localFont from "next/font/local";

type Props = {
  children: React.ReactNode;
  pages: React.ReactNode;
};


// кастомные шрифты
const Agora = localFont({
  src: [
    {
      path: "../../public/font/PFAgoraSansPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-Agora",
});

const Centro = localFont({
  src: [
    {
      path: "../../public/font/PFCentroSansPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/PFCentroSansPro-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/PFCentroSansPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-Centro",
});

// Мета данные
export const metadata: Metadata = {
  title: "Выставка Мир и РУДН",
  description: "Выставка Мир и РУДН",
};

// Корневой лэйаут
const RootLayout: FC<Props> = ({ children, pages }) => {
  return (
    <html lang="en">
      <body className={`${Agora.variable} ${Centro.variable}`}>
        <Providers>
          {pages}
          {children}
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;
