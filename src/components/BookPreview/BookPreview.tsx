import { imagePath } from "@/utils/utils";
import Image from "next/image";
import { FC } from "react";

// Типизация пропсов
type Props = {
  book: {
    name: string;
    author: string;
  };
};

// Компонент предпросмотра книги
const BookPreview: FC<Props> = ({ book }) => {
  return (
    <div className="rounded-[20px] overflow-hidden cursor-pointer group">
      <div className="relative z-10 h-[340px]">
        <Image
          alt="book-preview"
          src={imagePath("/test.jpg")}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col gap-2 py-6 px-5 bg-white group-hover:bg-[#f1f4ff] transition-all duration-300 rounded-[20px] relative z-20 -mt-10 border border-gray">
        <h3 className="text-2xl text-primary font-bold">{book.name}</h3>
        <span className="block text-lg text-black font-normal mt-auto">{book.author}</span>
      </div>
    </div>
  );
};

export default BookPreview;
