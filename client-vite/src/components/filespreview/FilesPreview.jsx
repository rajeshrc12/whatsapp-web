import React from "react";
import CancelIcon from "../../icons/CancelIcon";
import data from "../../data/data";
import PlusIcon from "../../icons/PlusIcon";
import SendIcon from "../../icons/SendIcon";
import InputFileIcon from "../input/InputFileIcon";
import { useDispatch } from "react-redux";
import { middle } from "../../state/panel/panelSlice";
import File from "./File";

const FilesPreview = () => {
  const dispatch = useDispatch();
  return (
    <div className="h-full bg-panel-header-background">
      <div className="h-[10%]">
        <div className="flex h-full justify-between items-center bg-panel-background-deeper">
          <div className="pl-5">
            <CancelIcon onClick={() => dispatch(middle(""))} />
          </div>
          <div className="text-sm">name</div>
          <div></div>
        </div>
      </div>
      <div className="h-[60%]">
        <div className="flex h-full justify-center items-center">
          <div
            style={{
              backgroundImage: `url(${data.loggedInUser.url})`,
              backgroundSize: "contain",
            }}
            className="h-3/4 w-80 flex justify-center items-center"
          ></div>
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
              {new Array(3).fill(0).map((d, index) => (
                <File />
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
