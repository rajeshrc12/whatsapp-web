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
        <div className="h-full relative px-[4vw] py-5 flex flex-col justify-end gap-1">
          <div className="flex justify-center sticky top-2">
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
              <div
                className={`rounded-lg shadow-sm max-w-[65%] min-w-24 min-h-9 px-2 py-1 flex ${
                  chat.from === loggedInUser
                    ? "bg-outgoing-background"
                    : "bg-white"
                }`}
              >
                <div className="text-sm relative pb-1 w-full group">
                  {chat.message}
                  <div className="text-[11px] gap-1 text-input-border absolute bottom-0 right-0 flex items-center">
                    <div>{chat.updatedAt}</div>
                    <div>
                      <TickIcon />
                    </div>
                  </div>
                  <div
                    className={`hidden group-hover:block absolute top-0 right-0 ${
                      chat.from === loggedInUser
                        ? "bg-outgoing-background"
                        : "bg-white"
                    } p-1`}
                  >
                    <DownArrowIcon />
                  </div>
                </div>
              </div>
            </div>
          ))}
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
