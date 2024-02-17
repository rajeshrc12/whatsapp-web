import React, { useCallback, useState } from "react";
import { MdGroups } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiMicrophoneFill } from "react-icons/pi";
import ProfileImg from "./images/profile.png";
import WABG from "./images/whatsapp_back.jpeg";
import SearchBar from "./components/SearchBar";
import { IoFilterOutline } from "react-icons/io5";
import Contact from "./components/Contact";
import ChatBox from "./components/ChatBox";
import { CgSmileMouthOpen } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import OtherMessage from "./components/OtherMessage";
import MyMessage from "./components/MyMessage";
import Popover from "./components/Popper";
import Attach from "./components/Attach";
import EmojiPicker from "emoji-picker-react";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa";
import StatusList from "./components/StatusList";
import StatusPage from "./components/StatusPage";
const App = () => {
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [chatBoxData, setChatBoxData] = useState("");
  const [leftMenuView, setLeftMenuView] = useState("");
  const [mainMenuView, setMainMenuView] = useState("");
  const leftMenu = useCallback(() => {
    switch (leftMenuView) {
      case "status":
        return (
          <div>
            <div className="h-[10vh] flex flex-col justify-end p-5 bg-[#008069]">
              <div className="flex items-center gap-4">
                <div>
                  <FaArrowLeft
                    onClick={() => setLeftMenuView("")}
                    size={15}
                    color="#ffffff"
                  />
                </div>
                <div className="text-white">Status</div>
              </div>
            </div>
            <div>
              <div className="flex gap-2 py-2 px-4 items-center">
                <div className="grid grid-cols-5 items-center text-xs">
                  <div className="flex col-span-1 justify-center">
                    <img
                      src={ProfileImg}
                      className="rounded-[5rem]"
                      height={45}
                      width={45}
                    />
                  </div>
                  <div className="col-span-4 py-4 px-2">
                    <div className="flex justify-between">
                      <div>My Status</div>
                    </div>
                    <div className="flex justify-between">
                      <div>No Update</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[#008069] p-5">RECENT</div>
            <div className="h-[70vh] overflow-y-scroll">
              {new Array(30).fill(0).map((a) => (
                <StatusList statusPage={() => setMainMenuView("statusPage")} />
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-rows-12">
            <div className="row-span-1">
              <div className="bg-[#f0f2f5] flex justify-between p-4">
                <div>
                  <img
                    src={ProfileImg}
                    className="rounded-2xl"
                    height={35}
                    width={35}
                  />
                </div>
                <div>
                  <HiOutlineStatusOnline
                    onClick={() => setLeftMenuView("status")}
                    size={25}
                    color="#54656f"
                  />
                </div>
              </div>
            </div>
            <div className="row-span-1">
              <div className="flex gap-2 py-2 px-4 items-center border-[#e9edef] border-b-[1px]">
                <div className="flex-1">
                  <SearchBar />
                </div>
                <div>
                  <IoFilterOutline size={25} />
                </div>
              </div>
            </div>
            <div className="row-span-10 h-[79vh] overflow-y-scroll">
              {new Array(30).fill(0).map((a) => (
                <Contact />
              ))}
            </div>
          </div>
        );
    }
  }, [leftMenuView]);
  const mainMenu = useCallback(() => {
    switch (mainMenuView) {
      case "statusPage":
        return <StatusPage setMainMenuView={setMainMenuView} />;
      default:
        return (
          <div className="flex justify-center items-center h-screen w-full bg-[#00a884] py-5 px-32">
            <div className="grid grid-cols-7 h-full w-full bg-white">
              <div className="col-span-2 border-[#e9edef] border-r-[1px]">
                {leftMenu()}
              </div>
              <div className="col-span-5">
                <div className="bg-[#f0f2f5] p-4 flex justify-between gap-5">
                  <div className="flex gap-2">
                    <div>
                      <img
                        src={ProfileImg}
                        className="rounded-2xl"
                        height={35}
                        width={35}
                      />
                    </div>
                    <div className="text-xs flex flex-col gap-1">
                      <div>Rajesh(You)</div>
                      <div className="text-[#667781]">Message yourself</div>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <IoMdSearch size={25} color="#54656f" />
                    <HiOutlineDotsVertical size={25} color="#54656f" />
                  </div>
                </div>
                <div
                  style={{
                    height: showEmojiPanel ? "32vh" : "80vh",
                    overflowY: "scroll",
                    backgroundImage: `url('${WABG}')`,
                  }}
                >
                  {new Array(15).fill(0).map((a) => (
                    <OtherMessage />
                  ))}
                  {new Array(15).fill(0).map((a) => (
                    <MyMessage />
                  ))}
                </div>
                {showEmojiPanel && (
                  <div>
                    <EmojiPicker
                      width={1135}
                      onEmojiClick={(e) => {
                        setChatBoxData((prev) => prev + e.emoji);
                      }}
                    />
                  </div>
                )}
                <div>
                  <div className="bg-[#f0f2f5] p-4 flex gap-5 items-center">
                    <div>
                      <CgSmileMouthOpen
                        size={25}
                        onClick={() => setShowEmojiPanel(!showEmojiPanel)}
                        color="#54656f"
                      />
                    </div>
                    <div></div>
                    <div>
                      <Popover content={<Attach />} x={5} y={20}>
                        <FaPlus size={25} color="#54656f" />
                      </Popover>
                    </div>
                    <div className="flex-1">
                      <ChatBox
                        chatBoxData={chatBoxData}
                        setChatBoxData={setChatBoxData}
                      />
                    </div>
                    <div>
                      <PiMicrophoneFill size={25} color="#54656f" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }, [mainMenuView, leftMenuView, showEmojiPanel, chatBoxData]);

  console.log(chatBoxData);
  return <>{mainMenu()}</>;
};
export default App;