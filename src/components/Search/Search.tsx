import useDebounce from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

type Props = {
  placeholder?: string;
  value: string;
  parentClassName?: string;
  setValue: (value: string) => void;
};

const Search: React.FC<Props> = ({
  placeholder,
  setValue,
  value,
  parentClassName,
}) => {
  const [localValue, setLocalValue] = useState<any>(value);
  const debounced = useDebounce(localValue, 300);

  useEffect(() => {
    setValue?.(debounced);
  }, [debounced]);

  return (
    <div className={`relative h-fit w-full ${parentClassName} [&>input]:pl-16 [&>input]:text-black`}>
      <FiSearch className="absolute top-1/2 -translate-y-1/2 left-6 w-6 h-6 text-black" />
      <input
        placeholder={placeholder}
        onChange={(e) => setLocalValue(e.target.value)}
        value={localValue}
        type="search"
        style={{boxShadow: "0 4px 9px rgba(0, 0, 0, 0.05), 0 16px 16px rgba(0, 0, 0, 0.05), 0 36px 22px rgba(0, 0, 0, 0.03), 0 65px 26px rgba(0, 0, 0, 0), 0 101px 28px rgba(0, 0, 0, 0)"}}
        className="w-full bg-white px-4 py-3 text-sm text-black placeholder:text-sm placeholder:text-[#9CA3AF] border border-gray rounded-full"
      />
    </div>
  );
};

export default Search;
