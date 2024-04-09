import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchChats,
  getAllUsers,
  getCurrentUserContacts,
  getSelectedUserChats,
  getSelectedUserLastSeen,
  setCurrentUserName,
} from "./state/user/userSlice";
import { left } from "./state/panel/panelSlice";
import { io } from "socket.io-client";
import BackIcon from "./icons/BackIcon";
import NewChatIcon from "./icons/NewChatIcon";
import MenuIcon from "./icons/MenuIcon";
import TickIcon from "./icons/TickIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { sendChat } from "./api/chats";
import { getTimeInAmPM } from "./utils/utils";
const App = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const panel = useSelector((state) => state.panel);
  const dispatch = useDispatch((state) => state.user);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef(null);
  // console.log(user);
  useEffect(() => {
    const name = sessionStorage.getItem("name");
    if (name) {
      dispatch(setCurrentUserName(name));
      dispatch(getAllUsers());
      dispatch(getCurrentUserContacts(name));
      const skt = io("ws://localhost:3002", {
        query: {
          name,
        },
      });
      setSocket(skt);
    } else {
      navigate("/");
    }
  }, [sessionStorage]);

  useEffect(() => {
    if (socket) {
      socket.on(sessionStorage.getItem("name"), (arg) => {
        dispatch(fetchChats());
        dispatch(getCurrentUserContacts());
      });
      socket.on("onlineUsers", (arg) => {
        if (arg.length) dispatch(getSelectedUserLastSeen());
      });
    }
  }, [socket]);
  useEffect(() => {
    // Scroll to bottom when chat messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [user.selectedUser.chats]);
  return (
    <div className="flex h-screen w-screen">
      <div className="w-[30%] border flex flex-col">
        {panel.left ? (
          <div className="h-full">
            <div className="h-[10%] border flex justify-between">
              <div>
                <BackIcon
                  className="fill-black"
                  onClick={() => dispatch(left(""))}
                />
              </div>
              <div>Start a chat</div>
            </div>
            <div className="h-[90%] border">
              {user.newChatUsers.map((user) => (
                <div
                  key={user.name}
                  className="p-2 cursor-pointer"
                  onClick={() => {
                    dispatch(getSelectedUserChats(user.name));
                    dispatch(left(""));
                  }}
                >
                  {user.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full">
            <div className="h-[10%] border flex justify-between">
              <div>{user.currentUser.name}</div>
              <div>
                <NewChatIcon onClick={() => dispatch(left("newChat"))} />
              </div>
              <MenuIcon
                onClick={async () => {
                  try {
                    navigate("/");
                    sessionStorage.removeItem("name");
                    await axios.get(
                      `http://localhost:3001/logout/${user.currentUser.name}`
                    );
                    dispatch(setCurrentUserName(""));
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
            </div>
            <div className="h-[90%] border">
              {user.currentUser.contacts.map((us) => (
                <div
                  key={us.name}
                  className={`p-2 cursor-pointer flex justify-between ${
                    us.name === user.selectedUser.name && "bg-gray-100"
                  }`}
                  onClick={() => {
                    dispatch(getSelectedUserChats(us.name));
                    dispatch(getCurrentUserContacts());
                  }}
                >
                  <div>{us.name}</div>
                  {us.unseenCount > 0 && <div>{us.unseenCount}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {user.selectedUser.name && (
        <div className="w-[70%]">
          <div className="h-[10%] border">
            {user.selectedUser.name}({user.selectedUser.lastSeen})
          </div>
          <div className="h-[80%] overflow-y-scroll" ref={chatContainerRef}>
            {user.selectedUser.chats.map((chat) => (
              <div
                className={`flex ${
                  user.currentUser.name === chat.from
                    ? "justify-end"
                    : "justify-start"
                }`}
                key={chat.message}
              >
                <div className="flex border items-center gap-2 p-2">
                  <div>{chat.message}</div>
                  {user.currentUser.name === chat.from && (
                    <div>
                      <TickIcon seen={chat.seen} />
                    </div>
                  )}

                  <div>{getTimeInAmPM(chat.updatedAt)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-[10%] border">
            <input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              className="w-full h-full"
              onKeyDown={async (e) => {
                if (
                  e.key === "Enter" &&
                  message.trim() &&
                  user.currentUser.name &&
                  user.selectedUser.name
                ) {
                  setMessage("");
                  const date = new Date();
                  await sendChat({
                    from: user.currentUser.name,
                    to: user.selectedUser.name,
                    chat: [
                      {
                        from: user.currentUser.name,
                        to: user.selectedUser.name,
                        type: "text",
                        message,
                        createdAt: date,
                        updatedAt: date,
                        seen: false,
                      },
                    ],
                  });
                  dispatch(fetchChats());
                  dispatch(getCurrentUserContacts());
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
