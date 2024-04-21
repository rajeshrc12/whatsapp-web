import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { left, middle, resetPanel } from "./state/panel/panelSlice";
import { io } from "socket.io-client";
import BackIcon from "./icons/BackIcon";
import EmptyProfileIcon from "./icons/EmptyProfileIcon";
import NewChatIcon from "./icons/NewChatIcon";
import MenuIcon from "./icons/MenuIcon";
import TickIcon from "./icons/TickIcon";
import DownloadIcon from "./icons/DownloadIcon";
import CancelIcon from "./icons/CancelIcon";
import PlusIcon from "./icons/PlusIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { sendChat } from "./api/chats";
import { getTimeInAmPM } from "./utils/utils";
import WhatsaAppBG from "./data/whatsapp.png";
import Popper from "./components/popper/Popper";
import { FaFile } from "react-icons/fa6";
import InputFileIcon from "./components/input/InputFileIcon";
import SendIcon from "./icons/SendIcon";
import CameraIconUpload from "./icons/CameraIconUpload";
import DocumentIcon from "./icons/DocumentIcon";
import VideoIcon from "./icons/VideoIcon";
const App = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const panel = useSelector((state) => state.panel);
  const dispatch = useDispatch((state) => state.user);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [searchName, setSearchName] = useState("");
  const chatContainerRef = useRef(null);
  const [selectedPreviewFile, setSelectedPreviewFile] = useState(0);
  const [files, setFiles] = useState([]);
  console.log(user.currentUser.contacts);
  const renderMessage = (chat) => {
    switch (chat.type) {
      case "text":
        return (
          <div
            className={`flex break-all relative max-w-[35rem] rounded-lg shadow gap-2 p-1 ${
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
            className={`p-1 w-[20rem] rounded-lg shadow ${
              user.currentUser.name === chat.from
                ? "bg-outgoing-background"
                : "bg-white"
            }`}
          >
            <img src={chat.message} alt="" className="max-h-[20rem] w-full" />
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
            className={`p-1 w-[10rem] rounded-lg shadow ${
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
            className={`p-1 w-[20rem] rounded-lg shadow ${
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
                  <div className="text-xs">{chat.filename}</div>
                  <div></div>
                </div>
              </div>
              <div>
                <DownloadIcon
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = chat.message;
                    link.setAttribute("download", chat.filename);
                    // Append to html link element page
                    document.body.appendChild(link);
                    // Start download
                    link.click();
                    // Clean up and remove the link
                    link.parentNode.removeChild(link);
                  }}
                />
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
  const renderLastChat = (chat) => {
    switch (chat.type) {
      case "image":
        return (
          <div className="flex gap-1">
            <div>
              <CameraIconUpload size="15" />
            </div>
            <div>Image</div>
          </div>
        );
      case "video":
        return (
          <div className="flex gap-1">
            <div>
              <VideoIcon size="18" />
            </div>
            <div>Video</div>
          </div>
        );
      case "text":
        return (
          <div className="flex">
            <div>
              {chat.message.length > 20
                ? chat.message.slice(0, 20) + "..."
                : chat.message}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex gap-1">
            <div>
              <DocumentIcon size="15" />
            </div>
            <div>{chat.filename}</div>
          </div>
        );
    }
  };
  const renderPreviewMessage = useCallback(() => {
    if (files.length) {
      const file = files[selectedPreviewFile];
      let fileType = file?.type?.split("/")[0];
      if (fileType === "video" && !file?.type?.includes("mp4")) {
        fileType = "";
      }
      switch (fileType) {
        case "image":
          return (
            <div
              style={{
                backgroundImage: `url(${URL.createObjectURL(file)})`,
                backgroundSize: "contain",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
              className="rounded-lg h-full w-full p-5"
            ></div>
          );
        case "video":
          return (
            <div className="h-full flex justify-center">
              <video
                className="h-full"
                controls
                src={URL.createObjectURL(file)}
              />
            </div>
          );
        default:
          return (
            <div className="h-full flex flex-col justify-center items-center">
              <FaFile size={200} color="#79909b" />
              <div>No preview available</div>
            </div>
          );
      }
    }
  }, [selectedPreviewFile, files]);
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
      console.log(chatContainerRef.current.scrollHeight);
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
                ?.filter((user) => {
                  if (!searchName) return true;
                  else if (user.name.includes(searchName)) return true;
                  else false;
                })
                ?.map((contact) => (
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
                        <div className="text-xs text-input-border">
                          {getTimeInAmPM(contact.lastChat.createdAt)}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="text-xs text-input-border flex items-center gap-1">
                          {contact.lastChat.from === user.currentUser.name && (
                            <TickIcon seen={contact.lastChat.seen} />
                          )}
                          {renderLastChat(contact.lastChat)}
                        </div>
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
            <div className="h-[90%] bg-panel-header-background w-full">
              <div className="p-3 h-[10%] flex justify-between items-center bg-panel-background-deeper">
                <div>
                  <CancelIcon
                    onClick={() => {
                      dispatch(middle(""));
                      setFiles([]);
                      setSelectedPreviewFile(0);
                    }}
                  />
                </div>
                <div className="text-sm">{files[selectedPreviewFile].name}</div>
                <div></div>
              </div>
              <div className="h-[70%] p-10">{renderPreviewMessage()}</div>
              <div className="h-[20%] w-full flex border-t-[2px]">
                <div className="w-[90%]  overflow-x-scroll flex gap-5 p-5">
                  {files.map((file, i) => {
                    let fileType = file?.type?.split("/")[0];
                    if (fileType === "video" && !file?.type?.includes("mp4")) {
                      fileType = "";
                    }
                    if (fileType === "image")
                      return (
                        <div
                          key={i}
                          onClick={() => setSelectedPreviewFile(i)}
                          style={{
                            flexBasis: "60px",
                            flexGrow: "0",
                            flexShrink: "0",
                            backgroundImage: `url(${URL.createObjectURL(
                              file
                            )})`,
                            backgroundSize: "contain",
                          }}
                          className="border border-gray-300 rounded-lg"
                        ></div>
                      );
                    else if (fileType === "video")
                      return (
                        <div
                          key={i}
                          onClick={() => setSelectedPreviewFile(i)}
                          style={{
                            flexBasis: "60px",
                            flexGrow: "0",
                            flexShrink: "0",
                          }}
                          className="border border-gray-300 rounded-lg flex justify-center"
                        >
                          <video
                            src={URL.createObjectURL(file)}
                            className="h-full"
                          />
                        </div>
                      );
                    else
                      return (
                        <div
                          key={i}
                          onClick={() => setSelectedPreviewFile(i)}
                          style={{
                            flexBasis: "60px",
                            flexGrow: "0",
                            flexShrink: "0",
                          }}
                          className="border border-gray-300 rounded-lg flex justify-center items-center"
                        >
                          <FaFile color="#79909b" size={40} />
                        </div>
                      );
                  })}
                </div>
                <div className="w-[10%] flex justify-center items-center">
                  <div className="bg-poll-bar-fill-sender p-5 rounded-full">
                    <SendIcon
                      onClick={async () => {
                        const formData = new FormData();
                        for (const file of files) {
                          formData.append("files", file);
                        }
                        formData.append(
                          "userData",
                          JSON.stringify({
                            from: user.currentUser.name,
                            to: user.selectedUser.name,
                          })
                        );
                        try {
                          const response = await axios.post(
                            "http://localhost:3001/files",
                            formData,
                            {
                              headers: {
                                "Content-Type": "multipart/form-data",
                              },
                            }
                          );
                        } catch (error) {
                          console.error("Error uploading files:", error);
                        }
                        dispatch(middle(""));
                        setFiles([]);
                        setSelectedPreviewFile(0);
                        dispatch(fetchChats());
                        dispatch(getCurrentUserContacts());
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div
                className="h-[80%] overflow-y-scroll flex flex-col gap-1 relative px-10"
                ref={chatContainerRef}
                style={{ backgroundImage: `url(${WhatsaAppBG})` }}
              >
                {user.selectedUser.chats.length ? (
                  user.selectedUser.chats.map((chat) => {
                    if (chat.type === "date")
                      return (
                        <div
                          key={chat._id}
                          className="sticky top-1 flex justify-center"
                        >
                          <div className="p-1 bg-white rounded-lg text-xs shadow px-3 py-2">
                            {chat.date}
                          </div>
                        </div>
                      );
                    else
                      return (
                        <div
                          className={`flex ${
                            user.currentUser.name === chat.from
                              ? "justify-end"
                              : "justify-start"
                          }`}
                          key={chat._id}
                        >
                          {renderMessage(chat)}
                        </div>
                      );
                  })
                ) : (
                  <div className="flex justify-center">
                    <span className="loading loading-spinner text-poll-bar-fill-sender"></span>
                  </div>
                )}
              </div>
              <div className="h-[10%] bg-panel-header-background p-2 flex items-center gap-3">
                <InputFileIcon
                  icon={<PlusIcon />}
                  callback={(e) => {
                    dispatch(middle("filepreview"));
                    setFiles([...e.target.files]);
                  }}
                />
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
