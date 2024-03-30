import React, { useCallback } from "react";
import SearchIcon from "../../icons/SearchIcon";
import MenuIcon from "../../icons/MenuIcon";
import PlusIcon from "../../icons/PlusIcon";
import DocumentIcon from "../../icons/DocumentIcon";
import PhotosAndVideosIcon from "../../icons/PhotosAndVideosIcon";
import CamerIcon from "../../icons/CamerIcon";
import ContactIcon from "../../icons/ContactIcon";
import PollIcon from "../../icons/PollIcon";
import MicIcon from "../../icons/MicIcon";
import InputFileIcon from "../input/InputFileIcon";
import data from "../../data/data";
import { main, middle, right } from "../../state/panel/panelSlice";
import { useDispatch, useSelector } from "react-redux";
import FilesPreview from "../filespreview/FilesPreview";
import ChatWindow from "./ChatWindow";
import CancelIcon from "../../icons/CancelIcon";

const MiddlePanel = () => {
  const panel = useSelector((state) => state.panel);
  const dispatch = useDispatch();
  const handleFilesPreview = () => dispatch(middle("filesPreview"));
  const render = useCallback(() => {
    switch (panel.middle) {
      case "filesPreview":
        return (
          <div className="h-[90%]">
            <FilesPreview />
          </div>
        );
      default:
        return (
          <>
            <div
              className={`${
                panel.middle === "reply" ? "h-[65%]" : "h-[80%]"
              } p-2 bg-green-200 overflow-y-scroll`}
            >
              <ChatWindow />
            </div>
            {panel.middle && (
              <div className="h-[15%] bg-panel-header-background p-2 flex justify-between gap-4">
                <div className=" h-full bg-popup-panel-background text-xs w-full rounded-lg border-l-[4px] border-red-500 flex justify-between items-center p-2">
                  <div>
                    <div className="font-bold">Rajesh</div>
                    <div>Hi</div>
                  </div>
                  <div
                    className="w-[10vw] h-full"
                    style={{
                      backgroundImage: `url(${data.loggedInUser.url})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
                <div className="flex items-center">
                  <CancelIcon onClick={() => dispatch(middle(""))} />
                </div>
              </div>
            )}

            <div className="h-[10%]">
              <div className="flex h-full justify-between items-center px-3 gap-5 bg-panel-header-background">
                <div className="dropdown dropdown-top">
                  <div tabIndex={0}>
                    <PlusIcon />
                  </div>
                  <div
                    tabIndex={0}
                    className="dropdown-content bg-white w-48 mb-3 flex z-[1] menu shadow rounded-lg"
                  >
                    <InputFileIcon
                      icon={
                        <div className="flex gap-3 p-2 hover:bg-gray-100">
                          <div>
                            <DocumentIcon />
                          </div>
                          <div>Document</div>
                        </div>
                      }
                      multiple={true}
                      callback={handleFilesPreview}
                    />
                    <InputFileIcon
                      icon={
                        <div className="flex gap-3 p-2 hover:bg-gray-100">
                          <div>
                            <PhotosAndVideosIcon />
                          </div>
                          <div>Photos & Videos</div>
                        </div>
                      }
                      multiple={true}
                      callback={handleFilesPreview}
                    />
                    <div className="flex gap-3 p-2 hover:bg-gray-100 cursor-pointer">
                      <div>
                        <CamerIcon />
                      </div>
                      <div>Camera</div>
                    </div>
                    <div className="flex gap-3 p-2 hover:bg-gray-100 cursor-pointer">
                      <div>
                        <ContactIcon />
                      </div>
                      <div>Contact</div>
                    </div>
                    <div
                      onClick={() => dispatch(main("pollModal"))}
                      className="flex gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <div>
                        <PollIcon />
                      </div>
                      <div>Poll</div>
                    </div>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Type a message"
                  className="outline-none p-2 rounded-lg w-full"
                />
                <MicIcon />
              </div>
            </div>
          </>
        );
    }
  }, [panel]);
  return (
    <div className={`${panel.right === "" ? "w-[70%]" : "w-[40%]"}`}>
      <div className="h-[10%]">
        <div className="flex h-full px-5 justify-between items-center bg-panel-header-background">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={data.loggedInUser.url} />
              </div>
            </div>
            <div className="text-sm">
              <div>
                <button
                  onClick={() =>
                    dispatch(
                      right(panel.right === "userProfile" ? "" : "userProfile")
                    )
                  }
                >
                  Rajesh
                </button>
              </div>
              <div>Last seen</div>
            </div>
          </div>
          <div className="flex gap-5">
            <SearchIcon />
            <MenuIcon />
          </div>
        </div>
      </div>
      {render()}
    </div>
  );
};

export default MiddlePanel;
