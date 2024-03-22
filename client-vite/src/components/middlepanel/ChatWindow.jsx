import React from "react";
import data from "../../data/data";
import { useDispatch } from "react-redux";
import { main } from "../../state/panel/panelSlice";
import EmojiMessageIcon from "../../icons/EmojiMessageIcon";
import ForwardIcon from "../../icons/ForwardIcon";
import TickIcon from "../../icons/TickIcon";

const ChatWindow = () => {
  const dispatch = useDispatch();
  const chats = data.chats;
  const loggedInUser = data.loggedInUser;
  const renderChat = (chat) => {
    switch (chat.type) {
      case "text":
        return <div>{chat.message}</div>;
      case "image":
        return <img src={chat.message} alt="" />;
      case "video":
        return <video src={chat.message} />;
      default:
        return <></>;
    }
  };
  return (
    <div className="flex flex-col">
      {chats.map((chat) => {
        return (
          <div
            className={`flex items-center ${
              chat.from === loggedInUser.mobile
                ? "justify-end"
                : "justify-start"
            } ${
              (chat.type === "image" || chat.type === "video") &&
              "cursor-pointer"
            }`}
          >
            <div
              className={`relative mb-9 flex items-start gap-2
              ${chat.type === "video" && "max-w-[30%]"} 
              ${chat.type === "text" && "max-w-[65%]"} 
              ${chat.type === "image" && "max-w-[45%]"} 
              rounded-lg
`}
            >
              {chat.from !== loggedInUser.mobile && (
                <div className="avatar">
                  <div className="w-7 rounded-full">
                    <img src={data.loggedInUser.url} />
                  </div>
                </div>
              )}
              <div className="flex items-center">
                {chat.from === loggedInUser.mobile && (
                  <div className="flex items-center gap-1 p-1">
                    <div className="dropdown dropdown-bottom dropdown-end">
                      <div
                        tabIndex={0}
                        className="bg-quick-action-button-background p-1 rounded-full"
                      >
                        <EmojiMessageIcon />
                      </div>
                      <div
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                      >
                        {String.fromCodePoint("0x1F600")}
                      </div>
                    </div>
                    <div className="bg-quick-action-button-background rounded-full">
                      <ForwardIcon />
                    </div>
                  </div>
                )}
                <div
                  className={`flex flex-col ${
                    chat.from === loggedInUser.mobile
                      ? "bg-outgoing-background"
                      : "bg-white"
                  } rounded-lg px-1`}
                >
                  <div className="font-medium text-sm text-red-400">Rajesh</div>
                  <div
                    onClick={() => {
                      if (chat.type === "image" || chat.type === "video")
                        dispatch(main("mediaPreview"));
                    }}
                  >
                    {renderChat(chat)}
                  </div>
                  <div>1.15PM</div>
                  <div className="flex justify-end items-center">
                    <div className="text-[11px]">1.14PM</div>
                    <div>
                      <TickIcon />
                    </div>
                  </div>
                </div>
                {chat.from !== loggedInUser.mobile && (
                  <div className="dropdown dropdown-bottom dropdown-end">
                    <div tabIndex={0} className="flex items-center gap-1">
                      <div className="bg-quick-action-button-background p-1 rounded-full">
                        <EmojiMessageIcon />
                      </div>
                      <div className="bg-quick-action-button-background rounded-full">
                        <ForwardIcon />
                      </div>
                    </div>
                    <div
                      tabIndex={0}
                      className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box"
                    >
                      {String.fromCodePoint("0x1F600")}
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`absolute flex bg-white rounded-full p-1 ${
                  chat.from === loggedInUser.mobile ? "right-0" : "left-10"
                }  bottom-[-30px]`}
              >
                <div className="dropdown dropdown-bottom dropdown-end">
                  <div tabIndex={0} className="cursor-pointer">
                    <div>{String.fromCodePoint("0x1F600")}</div>
                  </div>
                  <div
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                  >
                    <div>List</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatWindow;
