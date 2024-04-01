import React, { useCallback } from "react";
import SearchIcon from "../../icons/SearchIcon";
import MenuIcon from "../../icons/MenuIcon";
import PlusIcon from "../../icons/PlusIcon";
import DocumentIcon from "../../icons/DocumentIcon";
import PhotosAndVideosIcon from "../../icons/PhotosAndVideosIcon";
import CamerIcon from "../../icons/CamerIcon";
import ContactIcon from "../../icons/ContactIcon";
import PollIcon from "../../icons/PollIcon";
import EmojiIcon from "../../icons/EmojiIcon";
import MicIcon from "../../icons/MicIcon";
import TickIcon from "../../icons/TickIcon";
import DownArrowIcon from "../../icons/DownArrowIcon";
import EmojiMessageIcon from "../../icons/EmojiMessageIcon";
import ForwardIcon from "../../icons/ForwardIcon";
import InputFileIcon from "../input/InputFileIcon";
import data from "../../data/data";
import WhatsaAppBG from "../../data/whatsapp.png";
const MiddlePanel = () => {
  const loggedInUser = "rajesh";
  const chats = [
    {
      from: "rajesh",
      to: "mahesh",
      type: "text",
      message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum corrupti nesciunt eius, non aut debitis nam voluptatem ad sunt. Ducimus dolore repellat enim eius aspernatur distinctio doloribus sequi temporibus expedita.",
      updatedAt: "7:12 pm",
    },
    {
      from: "mahesh",
      to: "rajesh",
      type: "text",
      message: "b",
      updatedAt: "7:15 pm",
    },
    {
      from: "rajesh",
      to: "mahesh",
      type: "text",
      message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum corrupti nesciunt eius, non aut debitis nam voluptatem ad sunt. Ducimus dolore repellat enim eius aspernatur distinctio doloribus sequi temporibus expedita.",
      updatedAt: "7:12 pm",
    },
    {
      from: "mahesh",
      to: "rajesh",
      type: "text",
      message: "b",
      updatedAt: "7:15 pm",
    },
    {
      from: "rajesh",
      to: "mahesh",
      type: "text",
      message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum corrupti nesciunt eius, non aut debitis nam voluptatem ad sunt. Ducimus dolore repellat enim eius aspernatur distinctio doloribus sequi temporibus expedita.",
      updatedAt: "7:12 pm",
    },
    {
      from: "mahesh",
      to: "rajesh",
      type: "text",
      message: "b",
      updatedAt: "7:15 pm",
    },
    {
      from: "rajesh",
      to: "mahesh",
      type: "text",
      message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum corrupti nesciunt eius, non aut debitis nam voluptatem ad sunt. Ducimus dolore repellat enim eius aspernatur distinctio doloribus sequi temporibus expedita.",
      updatedAt: "7:12 pm",
    },
    {
      from: "mahesh",
      to: "rajesh",
      type: "text",
      message: "b",
      updatedAt: "7:15 pm",
    },
    {
      from: "rajesh",
      to: "mahesh",
      type: "text",
      message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum corrupti nesciunt eius, non aut debitis nam voluptatem ad sunt. Ducimus dolore repellat enim eius aspernatur distinctio doloribus sequi temporibus expedita.",
      updatedAt: "7:12 pm",
    },
    {
      from: "mahesh",
      to: "rajesh",
      type: "text",
      message: "b",
      updatedAt: "7:15 pm",
    },
    {
      from: "mahesh",
      to: "rajesh",
      type: "text",
      message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum corrupti nesciunt eius, non aut debitis nam voluptatem ad sunt. Ducimus dolore repellat enim eius aspernatur distinctio doloribus sequi temporibus expedita.",
      updatedAt: "7:12 pm",
    },
  ];
  return (
    <div
      className="w-[70%] border"
      style={{ backgroundImage: `url(${WhatsaAppBG})` }}
    >
      <div className="h-[10%]">
        <div className="px-5 h-full flex justify-between items-center bg-panel-header-background">
          <div className="flex gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={data.loggedInUser.url} />
              </div>
            </div>
            <div className="flex flex-col">
              <div>Rajesh</div>
              <div className="text-sm text-input-border">
                last seen today at 7.15 pm
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <SearchIcon />
            <MenuIcon />
          </div>
        </div>
      </div>
      <div className="h-[80%] overflow-y-scroll">
        <div className="h-full relative px-[4vw] flex flex-col gap-1 z-0 py-2">
          <div className="flex justify-center sticky top-2 z-10">
            <div className="bg-white shadow-sm rounded-lg text-xs px-3 py-2">
              01/01/2024
            </div>
          </div>
          {chats.map((chat, i) => (
            <div
              key={i}
              className={`flex ${
                chat.from === loggedInUser ? "justify-end" : "justify-start"
              }`}
            >
              <div className={`max-w-[65%] min-w-24 min-h-9 flex flex-col `}>
                <div className="flex">
                  <div className="flex items-center">
                    <div className="bg-quick-action-button-background p-1 rounded-full">
                      <EmojiMessageIcon />
                    </div>
                    <div className="bg-quick-action-button-background rounded-full">
                      <ForwardIcon />
                    </div>
                  </div>
                  <div
                    className={`${
                      chat.from === loggedInUser
                        ? "bg-outgoing-background"
                        : "bg-white"
                    } text-sm relative w-full group shadow-sm rounded-lg px-2 py-1`}
                  >
                    {chat.message}
                    <div className="text-[11px] gap-1 text-input-border absolute bottom-0 right-1 flex items-center">
                      <div>{chat.updatedAt}</div>
                      <div>
                        <TickIcon />
                      </div>
                    </div>
                    <div
                      className={`hidden group-hover:block absolute top-0 right-1 ${
                        chat.from === loggedInUser
                          ? "bg-outgoing-background"
                          : "bg-white"
                      } p-1`}
                    >
                      <DownArrowIcon />
                    </div>
                  </div>
                </div>

                <div
                  className={`flex relative bottom-1 ${
                    chat.from === loggedInUser
                      ? "justify-end right-1"
                      : "justify-start left-1"
                  }`}
                >
                  <div className="bg-white rounded-full p-1 flex">
                    <div>{String.fromCodePoint("0x1F600")}</div>
                    <div>{String.fromCodePoint("0x1F600")}</div>
                    <div>{String.fromCodePoint("0x1F600")}</div>
                    <div className="px-1">2</div>
                  </div>
                </div>
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
              <div className="flex gap-3 p-2 hover:bg-gray-100 cursor-pointer">
                <div>
                  <ContactIcon />
                </div>
                <div>Contact</div>
              </div>
              <div className="flex gap-3 p-2 hover:bg-gray-100 cursor-pointer">
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
          <div>
            <MicIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddlePanel;
