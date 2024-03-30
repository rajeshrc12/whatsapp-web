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
import InputFileIcon from "../input/InputFileIcon";
import data from "../../data/data";
import WhatsaAppBG from "../../data/whatsapp.png";
const MiddlePanel = () => {
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
              <div className="text-xs text-input-border">
                Last seen at today
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
        <div className="h-full relative px-[4vw]">
          <div className="flex justify-center sticky top-2">
            <div className="bg-white shadow-sm rounded-lg text-xs px-3 py-2">
              01/01/2024
            </div>
          </div>
          {new Array(10).fill(0).map((d, i) => (
            <div key={i} className="flex justify-between">
              <div>hello</div>
              <div>hello</div>
            </div>
          ))}
          <div className="flex justify-center sticky top-2">
            <div className="bg-white shadow-sm rounded-lg text-xs px-3 py-2">
              02/01/2024
            </div>
          </div>
          {new Array(30).fill(0).map((d, i) => (
            <div key={i}>hello</div>
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
