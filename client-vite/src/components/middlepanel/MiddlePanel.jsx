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
import rajesh from "../../data/rajesh.jpg";
import i1 from "../../data/i1.jpeg";
import a1 from "../../data/a1.ogg";
import v1 from "../../data/v1.mp4";
import Popper from "../popper/Popper";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";

const MiddlePanel = () => {
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
            <div>
              <EmptyProfileIcon />
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
                  clickCotent={<div>{String.fromCodePoint("0x1F600")}</div>}
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
