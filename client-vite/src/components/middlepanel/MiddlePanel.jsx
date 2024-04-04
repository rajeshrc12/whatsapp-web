import React, { useCallback, useEffect, useRef, useState } from "react";
import WhatsaAppBG from "../../data/whatsapp.png";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import TickIcon from "../../icons/TickIcon";
import { useDispatch, useSelector } from "react-redux";
import { sendChat } from "../../api/chats";
import { getTimeInAmPM } from "../../utils/utils";
import { getSelectedUserChats } from "../../state/user/userSlice";

const MiddlePanel = () => {
  const user = useSelector((state) => state.user);
  const [value, setValue] = useState("");
  const chatRef = useRef();
  const dispatch = useDispatch();
  return (
    <div className="h-full">
      <div className="h-[10%] bg-panel-header-background p-2">
        <div className="flex gap-3">
          <div>
            <EmptyProfileIcon />
          </div>
          <div className="flex flex-col">
            <div>{user.selectedUser.name}</div>
            <div className="text-sm text-input-border">
              {user.selectedUser.lastSeen}
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-[80%] bg-panel-header-background overflow-y-scroll"
        style={{ backgroundImage: `url(${WhatsaAppBG})` }}
        ref={chatRef}
      >
        <div className="flex flex-col gap-2 relative z-0 px-10 py-5">
          <div className="flex justify-center sticky top-2 z-10">
            <div className="bg-white shadow-sm rounded-lg text-xs px-3 py-2">
              01/01/2024
            </div>
          </div>
          {user.selectedUser.chats.map((chat, i) => (
            <div
              key={i}
              className={`flex ${
                chat.from === user.currentUser.name
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`flex items-end ${
                  chat.from === user.currentUser.name
                    ? "bg-outgoing-background"
                    : "bg-white"
                } p-2 rounded-lg gap-2`}
              >
                <div className="text-sm">{chat.message}</div>
                <div className="text-xs text-input-border">
                  {getTimeInAmPM(chat.updatedAt)}
                </div>
                {chat.from === user.currentUser.name && (
                  <div>
                    <TickIcon seen={chat.seen} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[10%] bg-panel-header-background p-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-white w-full rounded-lg p-2 outline-none"
          placeholder="Enter message"
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              value.trim() &&
              user.currentUser.name &&
              user.selectedUser.name
            ) {
              setValue("");
              const date = new Date();
              sendChat({
                from: user.currentUser.name,
                to: user.selectedUser.name,
                chat: [
                  {
                    from: user.currentUser.name,
                    to: user.selectedUser.name,
                    type: "text",
                    message: value,
                    createdAt: date,
                    updatedAt: date,
                  },
                ],
              });
              dispatch(getSelectedUserChats(user.selectedUser.name));
            }
          }}
        />
      </div>
    </div>
  );
};

export default MiddlePanel;
