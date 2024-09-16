import { Book } from "@/types";
import { createImageSrc, imagePath } from "@/utils/utils";
import Image from "next/image";
import { FC } from "react";

// Типизация пропсов
type Props = {
  book: Book;
};

// Компонент предпросмотра книги
const BookPreview: FC<Props> = ({ book }) => {
  return (
    <div className="rounded-[20px] cursor-pointer group shadow-lg bg-white pb-[76px]">
      <div className="relative z-10 h-[380px] rounded-[10px] overflow-hidden">
        <Image
          alt="book-preview"
          src={createImageSrc(book.path)}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="relative">
        <div className="flex flex-col gap-2 py-6 px-5 bg-white group-hover:bg-[#f1f4ff] group-hover:shadow-xl transition-all duration-300 rounded-[20px] z-20 border border-primary absolute w-full">
          <h3 className="text-xl text-black font-semibold truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all">
            {book.name ? book.name : "Неизвестная книга"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BookPreview;
