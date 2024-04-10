import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchChats,
  getAllUsers,
  getCurrentUserContacts,
  getSelectedUserChats,
  getSelectedUserLastSeen,
  resetUser,
  setCurrentUserName,
} from "./state/user/userSlice";
import { left, resetPanel } from "./state/panel/panelSlice";
import { io } from "socket.io-client";
import BackIcon from "./icons/BackIcon";
import EmptyProfileIcon from "./icons/EmptyProfileIcon";
import NewChatIcon from "./icons/NewChatIcon";
import MenuIcon from "./icons/MenuIcon";
import TickIcon from "./icons/TickIcon";
import DownloadIcon from "./icons/DownloadIcon";
import PlusIcon from "./icons/PlusIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { sendChat } from "./api/chats";
import { getTimeInAmPM } from "./utils/utils";
import WhatsaAppBG from "./data/whatsapp.png";
import Popper from "./components/popper/Popper";
import i1 from "./data/i1.jpeg";
import i2 from "./data/i2.jpeg";
import v1 from "./data/v1.mp4";
import v2 from "./data/v2.mp4";
import a1 from "./data/a1.ogg";
import { FaFile } from "react-icons/fa6";
const App = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const panel = useSelector((state) => state.panel);
  const dispatch = useDispatch((state) => state.user);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [searchName, setSearchName] = useState("");
  const chatContainerRef = useRef(null);
  const [chats, setChats] = useState([
    {
      from: "rajesh",
      to: "ganesh",
      type: "text",
      message: "yo",
      createdAt: "2024-04-10T02:47:54.064Z",
      updatedAt: "2024-04-10T02:47:54.064Z",
      seen: true,
    },
    {
      from: "ganesh",
      to: "rajesh",
      type: "image",
      message: i1,
      createdAt: "2024-04-10T02:47:54.064Z",
      updatedAt: "2024-04-10T02:47:54.064Z",
      seen: true,
    },
    {
      from: "rajesh",
      to: "ganesh",
      type: "image",
      message: i2,
      createdAt: "2024-04-10T02:47:54.064Z",
      updatedAt: "2024-04-10T02:47:54.064Z",
      seen: true,
    },
    {
      from: "rajesh",
      to: "ganesh",
      type: "video",
      message: v1,
      createdAt: "2024-04-10T02:47:54.064Z",
      updatedAt: "2024-04-10T02:47:54.064Z",
      seen: true,
    },
    {
      from: "rajesh",
      to: "ganesh",
      type: "video",
      message: v2,
      createdAt: "2024-04-10T02:47:54.064Z",
      updatedAt: "2024-04-10T02:47:54.064Z",
      seen: true,
    },
    {
      from: "rajesh",
      to: "ganesh",
      type: "audio",
      message: a1,
      createdAt: "2024-04-10T02:47:54.064Z",
      updatedAt: "2024-04-10T02:47:54.064Z",
      seen: true,
    },
    {
      from: "ganesh",
      to: "rajesh",
      type: "image",
      message: i1,
      createdAt: "2024-04-10T02:47:54.064Z",
      updatedAt: "2024-04-10T02:47:54.064Z",
      seen: true,
    },
    {
      from: "mahesh",
      to: "ganesh",
      type: "image",
      message: i2,
      createdAt: "2024-04-10T02:47:54.064Z",
      updatedAt: "2024-04-10T02:47:54.064Z",
      seen: true,
    },
    {
      from: "mahesh",
      to: "ganesh",
      type: "video",
      message: v1,
      createdAt: "2024-04-10T02:47:54.064Z",
      updatedAt: "2024-04-10T02:47:54.064Z",
      seen: true,
    },
    {
      from: "mahesh",
      to: "ganesh",
      type: "video",
      message: v2,
      createdAt: "2024-04-10T02:47:54.064Z",
      updatedAt: "2024-04-10T02:47:54.064Z",
      seen: true,
    },
    {
      from: "mahesh",
      to: "ganesh",
      type: "audio",
      message: a1,
      createdAt: "2024-04-10T02:47:54.064Z",
      updatedAt: "2024-04-10T02:47:54.064Z",
      seen: true,
    },
  ]);
  const renderMessage = (chat) => {
    switch (chat.type) {
      case "text":
        return (
          <div
            className={`flex break-all relative max-w-[70%] rounded-lg shadow gap-2 p-1 ${
              user.currentUser.name === chat.from
                ? "justify-end bg-outgoing-background"
                : "justify-start bg-white"
            }`}
          >
            <div className="flex-wrap">{chat.message}</div>
            <div
              className={`flex items-end ${
                chat.message.length > 60 && "absolute bottom-1 right-1"
              }`}
            >
              <div className="text-[11px] text-input-border min-w-[50px]">
                {getTimeInAmPM(chat.updatedAt)}
              </div>
              {user.currentUser.name === chat.from && (
                <div>
                  <TickIcon seen={chat.seen} />
                </div>
              )}
            </div>
          </div>
        );
      case "image":
        return (
          <div
            className={`p-1 w-[40%] rounded-lg shadow ${
              user.currentUser.name === chat.from
                ? "bg-outgoing-background"
                : "bg-white"
            }`}
          >
            <img src={chat.message} alt="" />
            <div className={`flex justify-end items-center w-full pt-1`}>
              <div className="text-[11px] text-input-border min-w-[50px]">
                {getTimeInAmPM(chat.updatedAt)}
              </div>
              {user.currentUser.name === chat.from && (
                <div>
                  <TickIcon seen={chat.seen} />
                </div>
              )}
            </div>
          </div>
        );
      case "video":
        return (
          <div
            className={`p-1 w-[20%] rounded-lg shadow ${
              user.currentUser.name === chat.from
                ? "bg-outgoing-background"
                : "bg-white"
            }`}
          >
            <video src={chat.message} alt="" />
            <div className={`flex justify-end items-center w-full pt-1`}>
              <div className="text-[11px] text-input-border min-w-[50px]">
                {getTimeInAmPM(chat.updatedAt)}
              </div>
              {user.currentUser.name === chat.from && (
                <div>
                  <TickIcon seen={chat.seen} />
                </div>
              )}
            </div>
          </div>
        );
      default:
        return (
          <div
            className={`p-1 w-[40%] rounded-lg shadow ${
              user.currentUser.name === chat.from
                ? "bg-outgoing-background"
                : "bg-white"
            }`}
          >
            <div className="flex justify-between p-3 bg-transparent rounded-lg">
              <div className="flex gap-2">
                <div>
                  <FaFile color="#79909b" size={30} />
                </div>
                <div>
                  <div className="text-xs">Name.ogg</div>
                  <div></div>
                </div>
              </div>
              <div>
                <DownloadIcon />
              </div>
            </div>
            <div className={`flex justify-end items-center w-full pt-1`}>
              <div className="text-[11px] text-input-border min-w-[50px]">
                {getTimeInAmPM(chat.updatedAt)}
              </div>
              {user.currentUser.name === chat.from && (
                <div>
                  <TickIcon seen={chat.seen} />
                </div>
              )}
            </div>
          </div>
        );
    }
  };
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
      <div className="w-[30%] flex flex-col">
        {panel.left ? (
          <div className="h-full">
            <div className="h-[16%] bg-panel-background-colored flex items-end p-5 gap-5">
              <div>
                <BackIcon
                  onClick={() => {
                    dispatch(left(""));
                    setSearchName("");
                  }}
                />
              </div>
              <div className="font-bold text-white">New chat</div>
            </div>
            <div className="h-[10%] p-2">
              <input
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search"
                type="text"
                className="bg-gray-100 w-full rounded-lg p-2 outline-none"
              />
            </div>
            <div className="h-[74%] overflow-y-scroll px-2">
              {user.newChatUsers
                .filter((user) => {
                  if (!searchName) return true;
                  else if (user.name.includes(searchName)) return true;
                  else false;
                })
                .map((user) => (
                  <div
                    key={user.name}
                    className="cursor-pointer flex items-center gap-3"
                    onClick={() => {
                      dispatch(getSelectedUserChats(user.name));
                      dispatch(left(""));
                      setSearchName("");
                    }}
                  >
                    <div>
                      <EmptyProfileIcon size={45} />
                    </div>
                    <div className="w-full flex flex-col border-t-[1px] py-3">
                      <div className="flex justify-between">
                        <div>{user.name}</div>
                        <div className="text-xs text-input-border"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-xs text-input-border">Status</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="h-full">
            <div className="h-[10%] flex justify-between items-center px-2  bg-panel-header-background">
              <div>
                <EmptyProfileIcon />
              </div>
              <div className="flex gap-5">
                <NewChatIcon
                  onClick={() => {
                    dispatch(left("newChat"));
                    setSearchName("");
                  }}
                />

                <Popper
                  className="w-24"
                  content={
                    <div className="flex flex-col py-3">
                      <div
                        className="hover:bg-gray-50 cursor-pointer px-3 py-2"
                        onClick={async () => {
                          try {
                            dispatch(resetPanel());
                            dispatch(resetUser());

                            navigate("/");
                            sessionStorage.removeItem("name");
                            await axios.get(
                              `http://localhost:3001/logout/${user.currentUser.name}`
                            );
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        Logout
                      </div>
                      <div
                        className="hover:bg-gray-50 cursor-pointer px-3 py-2"
                        onClick={async () => {
                          try {
                            dispatch(resetPanel());
                            dispatch(resetUser());
                            navigate("/");
                            sessionStorage.removeItem("name");
                            await axios.get(`http://localhost:3001/cleardb`);
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        Clear DB
                      </div>
                    </div>
                  }
                  clickCotent={<MenuIcon />}
                />
              </div>
            </div>
            <div className="h-[10%] p-2 flex items-center">
              <input
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search"
                type="text"
                className="bg-gray-100 w-full rounded-lg p-2 outline-none"
              />
            </div>
            <div className="h-[80%]">
              {user.currentUser.contacts
                .filter((user) => {
                  if (!searchName) return true;
                  else if (user.name.includes(searchName)) return true;
                  else false;
                })
                .map((contact) => (
                  <div
                    key={contact.name}
                    className={`px-3 gap-2 cursor-pointer flex items-center ${
                      contact.name === user.selectedUser.name
                        ? "bg-panel-header-background"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      dispatch(getSelectedUserChats(contact.name));
                      dispatch(getCurrentUserContacts());
                    }}
                  >
                    <div>
                      <EmptyProfileIcon size={45} />
                    </div>
                    <div className="w-full flex flex-col border-t-[1px] py-3">
                      <div className="flex justify-between">
                        <div>{contact.name}</div>
                        <div className="text-xs text-input-border">7:30 pm</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-xs text-input-border">Hii</div>
                        {contact.unseenCount > 0 && (
                          <div className="bg-unread-marker-background rounded-full w-6 pl-2 text-white">
                            {contact.unseenCount}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      {user.selectedUser.name ? (
        <div className="w-[70%]">
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
          {panel.middle ? (
            <div>preview</div>
          ) : (
            <>
              <div
                className="h-[80%] overflow-y-scroll flex flex-col gap-1 p-10"
                ref={chatContainerRef}
                style={{ backgroundImage: `url(${WhatsaAppBG})` }}
              >
                {chats.map((chat) => (
                  <div
                    className={`flex ${
                      user.currentUser.name === chat.from
                        ? "justify-end"
                        : "justify-start"
                    }`}
                    key={chat.message}
                  >
                    {renderMessage(chat)}
                  </div>
                ))}
              </div>
              <div className="h-[10%] bg-panel-header-background p-2 flex items-center gap-3">
                <PlusIcon />
                <input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  className="bg-white w-full rounded-lg p-2 outline-none"
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
            </>
          )}
        </div>
      ) : (
        <div className="w-[70%] bg-panel-header-background h-full"></div>
      )}
    </div>
  );
};

export default App;
