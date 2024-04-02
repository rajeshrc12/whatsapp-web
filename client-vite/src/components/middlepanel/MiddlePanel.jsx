import React, { useCallback, useState } from "react";
import SearchIcon from "../../icons/SearchIcon";
import MenuIcon from "../../icons/MenuIcon";
import PlusIcon from "../../icons/PlusIcon";
import DocumentIcon from "../../icons/DocumentIcon";
import PhotosAndVideosIcon from "../../icons/PhotosAndVideosIcon";
import CamerIcon from "../../icons/CamerIcon";
import CancelIcon from "../../icons/CancelIcon";
import EmojiIcon from "../../icons/EmojiIcon";
import MicIcon from "../../icons/MicIcon";
import TickIcon from "../../icons/TickIcon";
import DownArrowIcon from "../../icons/DownArrowIcon";
import EmojiMessageIcon from "../../icons/EmojiMessageIcon";
import ForwardIcon from "../../icons/ForwardIcon";
import InputFileIcon from "../input/InputFileIcon";
import WhatsaAppBG from "../../data/whatsapp.png";
import rajesh from "../../data/rajesh.jpg";
import i1 from "../../data/i1.jpeg";
import a1 from "../../data/a1.ogg";
import v1 from "../../data/v1.mp4";
import Popper from "../popper/Popper";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import { useDispatch, useSelector } from "react-redux";
import { middle } from "../../state/panel/panelSlice";
import SendIcon from "../../icons/SendIcon";
import { FaFile } from "react-icons/fa6";

const MiddlePanel = () => {
  const user = useSelector((state) => state.user);
  const middleValue = useSelector((state) => state.panel.middle);
  const files = useSelector((state) => state.files);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();
  const temp = new Array(3).fill(0);
  console.log(files);
  const renderFile = (file, index) => {
    let fileType = file?.type?.split("/")[0];
    if (fileType === "video" && !file?.type?.includes("mp4")) {
      fileType = "";
    }
    switch (fileType) {
      case "image":
        return (
          <div
            onClick={() => setSelectedIndex(index)}
            style={{
              backgroundImage: `url(${URL.createObjectURL(file)})`,
              backgroundSize: "contain",
              flexBasis: "55px",
              flexGrow: "0",
              flexShrink: "0",
            }}
            className={`${
              selectedIndex === index
                ? "border-2 border-poll-bar-fill-sender"
                : "border border-switch-track-color"
            } rounded-lg`}
          ></div>
        );
      case "video":
        return (
          <video
            onClick={() => setSelectedIndex(index)}
            className={`w-[55px] ${
              selectedIndex === index
                ? "border-2 border-poll-bar-fill-sender"
                : "border border-switch-track-color"
            } rounded-lg`}
            src={URL.createObjectURL(file)}
          ></video>
        );
      default:
        return (
          <div
            onClick={() => setSelectedIndex(index)}
            className={`p-1 flex flex-col justify-center items-center ${
              selectedIndex === index
                ? "border-2 border-poll-bar-fill-sender"
                : "border border-switch-track-color"
            } rounded-lg`}
          >
            <FaFile color="gray" size={50} />
          </div>
        );
    }
  };
  const render = useCallback(() => {
    switch (middleValue) {
      case "filesPreview":
        return (
          <div className="h-[90%] bg-panel-background-deeper">
            <div className="h-full flex flex-col">
              <div className="h-[10%] flex p-5">
                <CancelIcon />
              </div>
              <div className="h-[60%] flex justify-center items-center">
                <div
                  style={{
                    backgroundImage: `url(${i1})`,
                    backgroundSize: "contain",
                  }}
                  className="h-3/4 w-80 shadow-lg"
                ></div>
              </div>
              <div className="h-[10%] px-[10vw]">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="outline-none p-2 rounded-lg w-full"
                />
              </div>
              <div className="h-[20%] flex">
                <div className="w-[90%] h-full">
                  <div
                    className={`${
                      files.blobFiles.length < 12 && "justify-center"
                    } h-full flex px-5 py-6 overflow-x-scroll relative gap-2`}
                  >
                    {files.blobFiles.map((file, index) =>
                      renderFile(file, index)
                    )}
                    <div
                      style={{
                        flexBasis: "55px",
                        flexGrow: "0",
                        flexShrink: "0",
                      }}
                      className=" bg-panel-background-deeper flex justify-center items-center sticky top-0 right-0 border border-switch-track-color rounded-lg"
                    >
                      <InputFileIcon icon={<PlusIcon />} multiple={true} />
                    </div>
                  </div>
                </div>
                <div className="w-[10%]">
                  <div className="flex h-full justify-center items-center">
                    <div className="bg-poll-bar-fill-sender p-5 rounded-full">
                      <SendIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <>
            <div className="h-[80%] overflow-y-scroll px-10">
              <div className="h-full relative flex flex-col gap-1 z-0">
                <div className="flex justify-center sticky top-2 z-10">
                  <div className="bg-white shadow-sm rounded-lg text-xs px-3 py-2">
                    01/01/2024
                  </div>
                </div>

                {[
                  { type: "text", message: "." },
                  {
                    type: "text",
                    message:
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, voluptas officiis nihil animi soluta, quibusdam nesciunt veniam, expedita qui earum iusto vel quaerat sunt eveniet hic quo voluptates molestiae reprehenderit.",
                  },
                  {
                    type: "audio",
                    message: <audio src={a1} controls className="w-[28rem]" />,
                  },
                  { type: "image", message: <img src={rajesh} width={450} /> },
                  { type: "image", message: <img src={i1} width={450} /> },
                  { type: "video", message: <video src={v1} width={270} /> },
                ].map((chat, i) => (
                  <div className="flex flex-col items-end" key={i}>
                    <div className="flex justify-end items-center">
                      <div className="flex items-center gap-1 px-2">
                        <Popper
                          content={<div className="flex">hello</div>}
                          clickCotent={
                            <div className="bg-quick-action-button-background p-1 rounded-full">
                              <EmojiMessageIcon />
                            </div>
                          }
                          className="rounded"
                          direction="dropdown-end"
                        />
                        <div className="bg-quick-action-button-background rounded-full">
                          <ForwardIcon />
                        </div>
                      </div>
                      <div className="p-1 group relative bg-outgoing-background rounded-lg max-w-[70%] min-w-20">
                        <div className="flex justify-start text-sm">
                          {chat.message}
                        </div>
                        <div className="flex justify-end">
                          <div
                            className={`text-[11px] gap-1 text-input-border flex items-center relative ${
                              chat.type === "image" ||
                              chat.type === "video" ||
                              chat.type === "audio"
                                ? "bottom-0"
                                : "bottom-1"
                            }`}
                          >
                            <div className="w-10">7:12 pm</div>
                            <div>
                              <TickIcon />
                            </div>
                          </div>
                        </div>
                        <div
                          className={`hidden group-hover:block absolute top-1 right-2`}
                        >
                          <Popper
                            content={
                              <div className="flex flex-col py-2">
                                <div className="hover:bg-gray-100 px-5 py-2">
                                  Message info
                                </div>
                                <div className="hover:bg-gray-100 px-5 py-2">
                                  Reply
                                </div>
                                <div className="hover:bg-gray-100 px-5 py-2">
                                  Forward
                                </div>
                              </div>
                            }
                            clickCotent={<DownArrowIcon />}
                            className="rounded  w-40"
                            direction="dropdown-end"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`flex bg-white rounded-full relative bottom-1 right-1`}
                    >
                      <Popper
                        content={<div className="flex">hello</div>}
                        clickCotent={
                          <div>{String.fromCodePoint("0x1F600")}</div>
                        }
                        className="rounded"
                        direction="dropdown-end"
                      />
                    </div>
                  </div>
                ))}
                <div className="pb-5"></div>
              </div>
            </div>
            <div className="h-[10%]">
              <div className="flex h-full justify-between items-center px-3 gap-5 bg-panel-header-background">
                <div>
                  <EmojiIcon />
                </div>
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
                      callback={() => dispatch(middle("filesPreview"))}
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
                    />
                    <div className="flex gap-3 p-2 hover:bg-gray-100 cursor-pointer">
                      <div>
                        <CamerIcon />
                      </div>
                      <div>Camera</div>
                    </div>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Type a message"
                  className="outline-none p-2 rounded-lg w-full"
                />
                <div>
                  <MicIcon />
                </div>
              </div>
            </div>
          </>
        );
    }
  }, [middleValue, user, files, selectedIndex]);
  return (
    <div
      className="w-[70%] border"
      style={{ backgroundImage: `url(${WhatsaAppBG})` }}
    >
      <div className="h-[10%]">
        <div className="px-5 h-full flex justify-between items-center bg-panel-header-background">
          <div className="flex gap-3">
            <div>
              <EmptyProfileIcon />
            </div>
            <div className="flex flex-col">
              <div>{user.selectedUser.name}</div>
              <div className="text-sm text-input-border">
                {user.selectedUser.status}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
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
