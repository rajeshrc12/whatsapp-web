import React, { useCallback } from "react";
import { FaFile } from "react-icons/fa6";
import { deleteFileByIndex } from "../../state/files/filesSlice";
import CancelIcon from "../../icons/CancelIcon";
import { useDispatch } from "react-redux";

const File = ({
  file,
  index = 0,
  selectedIndex = 0,
  setSelectedIndex = () => {},
}) => {
  const dispatch = useDispatch();
  const renderImage = useCallback(() => {
    let fileType = file?.type?.split("/")[0];
    if (fileType === "video" && !file?.type?.includes("mp4")) {
      fileType = "";
    }
    switch (fileType) {
      case "image":
        return <></>;
      case "video":
        return (
          <video className="h-full" src={URL.createObjectURL(file)}></video>
        );
      default:
        return <FaFile color="gray" size={30} />;
    }
  }, [file]);
  return (
    <div
      onClick={() => setSelectedIndex(index)}
      style={{
        flexBasis: "60px",
        flexGrow: "0",
        flexShrink: "0",
        backgroundImage: `url(${
          file?.type?.includes("image") ? URL.createObjectURL(file) : ""
        })`,
        backgroundSize: "contain",
      }}
      className={`${
        selectedIndex === index
          ? "border-[3px] border-[#00a884]"
          : "border-[1px] border-[#d1d7db]"
      } rounded-lg flex justify-center items-center relative`}
    >
      {renderImage()}
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
