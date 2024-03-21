import React from "react";
import data from "../../data/data";
import { useDispatch } from "react-redux";
import { main } from "../../state/panel/panelSlice";

const ChatWindow = () => {
  const dispatch = useDispatch();
  const chats = data.chats;
  const loggedInUser = data.loggedInUser;
  const renderChat = (chat) => {
    switch (chat.type) {
      case "text":
        return <>{chat.message}</>;
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
            onClick={() => {
              if (chat.type === "image" || chat.type === "video")
                dispatch(main("mediaPreview"));
            }}
            className={`flex ${
              chat.from === loggedInUser.mobile
                ? "justify-end"
                : "justify-start"
            } ${
              (chat.type === "image" || chat.type === "video") &&
              "cursor-pointer"
            }`}
          >
            <div
              className={`
              ${chat.type === "video" && "max-w-[20%] m-1 p-1"} 
              ${chat.type === "text" && "max-w-[60%] m-1 p-2"} 
              ${chat.type === "image" && "max-w-[40%] m-1 p-1"} 
              rounded-lg
              ${
                chat.from === loggedInUser.mobile
                  ? "bg-outgoing-background"
                  : "bg-white"
              }`}
            >
              {renderChat(chat)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatWindow;
