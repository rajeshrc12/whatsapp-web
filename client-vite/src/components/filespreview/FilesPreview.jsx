import React, { useCallback, useEffect, useState } from "react";
import CancelIcon from "../../icons/CancelIcon";
import data from "../../data/data";
import PlusIcon from "../../icons/PlusIcon";
import SendIcon from "../../icons/SendIcon";
import InputFileIcon from "../input/InputFileIcon";
import { useDispatch, useSelector } from "react-redux";
import { middle } from "../../state/panel/panelSlice";
import File from "./File";
import { FaFile } from "react-icons/fa6";

const FilesPreview = () => {
  const files = useSelector((state) => state.files.blobFiles);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const renderFile = useCallback(() => {
    if (files.length) {
      const file = files[selectedIndex];
      let fileType = file?.type?.split("/")[0];
      if (fileType === "video" && !file?.type?.includes("mp4")) {
        fileType = "";
      }
      switch (fileType) {
        case "image":
          return (
            <div
              style={{
                backgroundImage: `url(${URL.createObjectURL(file)})`,
                backgroundSize: "contain",
              }}
              className="h-3/4 w-80 flex justify-center items-center"
            ></div>
          );
        case "video":
          return (
            <video
              className="w-[12vw]"
              controls
              src={URL.createObjectURL(file)}
            ></video>
          );
        default:
          return (
            <div className="h-3/4 w-80 flex flex-col justify-center items-center">
              <FaFile color="gray" size={100} />
              <div>No preview available</div>
            </div>
          );
      }
    }
  }, [files, selectedIndex]);
  useEffect(() => {
    if (!files.length) dispatch(middle(""));
  }, [files]);
  return (
    <div className="h-full bg-panel-header-background">
      <div className="h-[10%]">
        <div className="flex h-full justify-between items-center bg-panel-background-deeper">
          <div className="pl-5">
            <CancelIcon onClick={() => dispatch(middle(""))} />
          </div>
          <div className="text-sm">{files[selectedIndex]?.name}</div>
          <div></div>
        </div>
      </div>
      <div className="h-[60%]">
        <div className="flex h-full justify-center items-center">
          {renderFile()}
        </div>
      </div>
      <div className="h-[10%]">
        <div className="flex justify-center items-center h-full">
          <input
            placeholder="Type a message"
            type="text"
            className="w-2/3 outline-none p-2 rounded-lg"
          />
        </div>
      </div>
      <div className="h-[20%]">
        <div className="flex h-full">
          <div className="w-[90%] overflow-x-scroll">
            <div className="flex h-full gap-5 p-5 relative justify-center">
              {files.map((file, index) => (
                <File
                  file={file}
                  index={index}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
              ))}
              <div
                style={{
                  flexBasis: "60px",
                  flexGrow: "0",
                  flexShrink: "0",
                }}
                className="sticky top-0 right-0 bg-panel-header-background"
                //#d1d7db
              >
                <div className="border border-[#d1d7db] h-full w-full rounded-lg  flex justify-center items-center">
                  <InputFileIcon icon={<PlusIcon />} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[10%]">
            <div className="flex h-full justify-center items-center">
              <div className=" bg-[#00a884] p-5 rounded-full">
                <SendIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesPreview;
