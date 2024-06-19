import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { FC } from "react";
import Providers from "./providers";

// Шрифт
const montserrat = Montserrat({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};

// Мета данные
export const metadata: Metadata = {
  title: "Выставка Мир и РУДН",
  description: "Выставка Мир и РУДН",
};

// Корневой лэйаут
const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};
export default RootLayout;
