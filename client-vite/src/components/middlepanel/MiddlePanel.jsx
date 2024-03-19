import React, { useState } from "react";
import data from "../../data/data";
import Search from "../../icons/Search";
import Menu from "../../icons/Menu";
import EmojiPicker from "emoji-picker-react";
import EmojiIcon from "../../icons/EmojiIcon";
import Plus from "../../icons/PlusIcon";
import MicIcon from "../../icons/MicIcon";
import DocumentIcon from "../../icons/DocumentIcon";
import PhotosAndVideosIcon from "../../icons/PhotosAndVideosIcon";
import CamerIcon from "../../icons/CamerIcon";
import ContactIcon from "../../icons/ContactIcon";
import PollIcon from "../../icons/PollIcon";
const MiddlePanel = () => {
  const [emojiPanel, setEmojiPanel] = useState(false);
  return (
    <div className="grid grid-rows-12 h-full">
      <div className="row-span-1 bg-panel-header-background">
        <div className="flex h-full px-5 justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={data.loggedInUser.url} />
              </div>
            </div>
            <div className="text-sm">
              <div>Rajesh</div>
              <div>Last seen</div>
            </div>
          </div>
          <div className="flex gap-5">
            <Search />
            <Menu />
          </div>
        </div>
      </div>
      <div className={`row-span-${emojiPanel ? 3 : 10} bg-green-100`}></div>
      {emojiPanel && (
        <div className="row-span-7 bg-panel-header-background">
          <EmojiPicker width={"100%"} height={"23rem"} />
        </div>
      )}
      <div className="row-span-1 bg-panel-header-background h-full">
        <div className="flex h-full justify-between items-center px-3 gap-5">
          <EmojiIcon onClick={() => setEmojiPanel(!emojiPanel)} />
          <div className="dropdown dropdown-top">
            <div tabIndex={0}>
              <Plus />
            </div>
            <div
              tabIndex={0}
              className="dropdown-content w-48 mb-3 px-5 flex z-[1] menu shadow bg-base-100 rounded-lg"
            >
              <div className="flex gap-3 py-2">
                <div>
                  <DocumentIcon />
                </div>
                <div>Document</div>
              </div>
              <div className="flex gap-3 py-2">
                <div>
                  <PhotosAndVideosIcon />
                </div>
                <div>Photos & Videos</div>
              </div>
              <div className="flex gap-3 py-2">
                <div>
                  <CamerIcon />
                </div>
                <div>Camera</div>
              </div>
              <div className="flex gap-3 py-2">
                <div>
                  <ContactIcon />
                </div>
                <div>Contact</div>
              </div>
              <div className="flex gap-3 py-2">
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
            className="outline-none p-1 rounded-lg w-full"
          />
          <MicIcon />
        </div>
      </div>
    </div>
  );
};

export default MiddlePanel;
