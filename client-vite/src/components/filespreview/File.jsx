import React from "react";
import { FaFile } from "react-icons/fa6";
import { deleteFileByIndex } from "../../state/files/filesSlice";
import CancelIcon from "../../icons/CancelIcon";

const File = ({ index = 0 }) => {
  return (
    <div
      style={{
        flexBasis: "60px",
        flexGrow: "0",
        flexShrink: "0",
      }}
      className="border-[3px] border-[#00a884] rounded-lg flex justify-center items-center relative"
      //#d1d7db
    >
      <FaFile color="gray" size={30} />
      <div
        onClick={() => {
          dispatch(deleteFileByIndex(index));
        }}
        className="opacity-0 hover:opacity-100 absolute top-0 right-0 cursor-pointer"
      >
        <CancelIcon />
      </div>
    </div>
  );
};

export default File;
