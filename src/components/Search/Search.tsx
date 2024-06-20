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
    <div className={`relative h-fit w-full ${parentClassName} [&>input]:pl-12 [&>input]:text-white`}>
      <FiSearch className="absolute top-1/2 -translate-y-1/2 left-3 w-6 h-6 text-[#9CA3AF]" />
      <input
        placeholder={placeholder}
        onChange={(e) => setLocalValue(e.target.value)}
        value={localValue}
        type="search"
        className="w-full bg-transparent p-4 text-base text-black placeholder:text-base placeholder:text-[#9CA3AF] border border-gray rounded-[20px]"
      />
    </div>
  );
};

export default Search;
