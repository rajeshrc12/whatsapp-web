import React, { useCallback, useState } from "react";
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
import InputFileIcon from "../input/InputFileIcon";
import { useDispatch, useSelector } from "react-redux";
import PreviewFiles from "../previewfiles/PreviewFiles";
import { middle } from "../../state/panel/panelSlice";
const MiddlePanel = () => {
  const [emojiPanel, setEmojiPanel] = useState(false);
  const middleValue = useSelector((state) => state.panel.middle);
  const dispatch = useDispatch();
  const handlePreviewFiles = () => {
    dispatch(middle("previewFiles"));
  };
  const render = useCallback(() => {
    switch (middleValue) {
      case "previewFiles":
        return (
          <div className={`row-span-11 bg-panel-header-background`}>
            <PreviewFiles />
          </div>
        );
      default:
        return (
          <>
            <div className={`row-span-10 bg-green-100`}></div>
            {/* {emojiPanel && (
              <div className="row-span-7 bg-panel-header-background">
                <EmojiPicker width={"100%"} height={"57vh"} />
              </div>
            )} */}
            <div className="row-span-1 bg-panel-header-background h-full">
              <div className="flex h-full justify-between items-center px-3 gap-5">
                <EmojiIcon onClick={() => setEmojiPanel(!emojiPanel)} />
                <div className="dropdown dropdown-top">
                  <div tabIndex={0}>
                    <Plus />
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
                      callback={handlePreviewFiles}
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
                      callback={handlePreviewFiles}
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
                  className="outline-none p-1 rounded-lg w-full"
                />
                <MicIcon />
              </div>
            </div>
          </>
        );
    }
  }, [middleValue, emojiPanel]);
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
      {render()}
    </div>
  );
};

export default MiddlePanel;
