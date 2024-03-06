import React from "react";
import { IoMdSearch } from "react-icons/io";

const SearchBar = ({ icon, placeholder }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="outline-none bg-[#f0f2f5] h-full w-full py-2 pl-10 rounded-lg"
      />
      <div className="absolute top-1 left-1">{icon}</div>
    </div>
  );
};

export default SearchBar;
