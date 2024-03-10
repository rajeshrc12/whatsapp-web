import React, { useEffect, useState } from "react";
import WABG from "./images/whatsapp_back.jpeg";
import Profile from "./images/profile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { IoMdClose } from "react-icons/io";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { TiArrowForward } from "react-icons/ti";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import moment from "moment";
import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";
import { FaArrowLeft } from "react-icons/fa6";
import SelectContact from "./components/SelectContact";
import { FaChevronDown } from "react-icons/fa";
import Reply from "./components/Reply";
import ReplyMessage from "./components/ReplyMessage";
const socket = io("ws://localhost:3002");
let prevDate = null;
const App = () => {
  const navigate = useNavigate();
  const [forward, setForward] = useState(false);
  const [reply, setReply] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [mediaCarousel, setMediaCarousel] = useState(false);
  const [mediaCarouselIndex, setMediaCarouselIndex] = useState(0);
  const [forwardUserList, setForwardUserList] = useState([]);
  const [forwardChatList, setForwardChatList] = useState([]);
  const [forwardChat, setForwardChat] = useState({});
  const sendMessage = async (e) => {
    e.preventDefault();
    setReply(false);
    const message = e.target[1].value.trim();
    if (message) {
      const resp = await axios.post("http://localhost:3001/sendmessage", {
        message,
        receiptUser: selectedUser,
        currentUser: currentUser.name,
        type: reply ? "reply" : "text",
        reply: reply
          ? {
              message,
              content: forwardChat,
            }
          : null,
      });
      if (resp.status === 200) {
        getCurrentUserData();
        socket.emit("server", resp.config.data);
      }
    } else alert("Enter message");
  };
  const getAllUsers = async () => {
    const resp = await axios.post("http://localhost:3001/users", {
      user: sessionStorage.getItem("whatsappUser"),
    });
    setUsers(resp.data);
  };
  const getCurrentUserData = async () => {
    const resp = await axios.post("http://localhost:3001/user", {
      user: sessionStorage.getItem("whatsappUser"),
    });
    const chatNew = [];
    try {
      for (const chat of resp.data.chat) {
        if (chat.type === "image" || chat.type === "video") {
          const response = await axios.get(
            `http://localhost:3001/download/${chat.message}`,
            {
              responseType: "blob",
            }
          );
          const url = window.URL.createObjectURL(new Blob([response.data]));
          chatNew.push({
            ...chat,
            url,
          });
        } else {
          chatNew.push(chat);
        }
      }
      setCurrentUser({ ...resp.data, chat: chatNew });
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("whatsappUser")) {
      getCurrentUserData();
      getAllUsers();
    } else navigate("/");
  }, []);
  useEffect(() => {
    socket.on("client", (arg) => {
      getCurrentUserData();
    });
  }, [socket]);
  const isPrintMessage = (from, to) => {
    if (currentUser.name === from || currentUser.name === to) {
      if (selectedUser === from || selectedUser === to) return true;
      else return false;
    } else return false;
  };
  const renderMessage = (chat) => {
    switch (chat.type) {
      case "image":
        return (
          <div onClick={() => setMediaCarousel(!mediaCarousel)}>
            <img src={chat.url} height={200} width={200} />
          </div>
        );
      case "video":
        return (
          <video
            controls
            width="250"
            onClick={() => setMediaCarousel(!mediaCarousel)}
          >
            <source src={chat.url} type="video/webm" />
            <source src={chat.url} type="video/mp4" />
            Download the
            <a href={chat.url}>WEBM</a>
            or
            <a href={chat.url}>MP4</a>
            video.
          </video>
        );
      case "reply":
        return <ReplyMessage chat={chat.reply} />;
      default:
        return (
          <div className={`p-1 max-w-[40vw] bg-white m-2 rounded-lg`}>
            {chat.message}
            {moment(chat.updatedAt).format("LT")}
          </div>
        );
    }
  };
  const updateEmoji = async (id, emoji) => {
    const resp = await axios.post("http://localhost:3001/updateEmoji", {
      chatId: id,
      emoji,
      currentUser: currentUser.name,
      selectedUser,
    });
    getCurrentUserData();
  };
  const showForwardModal = () => {
    document.getElementById("forwardModal").showModal();
  };
  const closeForwardModal = () => {
    document.getElementById("forwardModal").close();
  };
  return (
    <div className="grid grid-cols-4 h-screen">
      <div className="col-span-1 h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-between p-3 bg-[#f0f2f5]">
            <div>{currentUser.name}</div>
            <div>
              <button
                onClick={() => {
                  sessionStorage.removeItem("whatsappUser");
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>
          <div className="h-[90vh] overflow-y-scroll">
            {users.map((user) => (
              <div
                className={`cursor-pointer p-5 border border-t-0 border-gray-300 ${
                  user.name === selectedUser && "bg-red-200"
                }`}
                key={user.name}
                onClick={() => setSelectedUser(user.name)}
              >
                {user.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-3 h-full">
        {selectedUser ? (
          <div
            className="flex flex-col justify-between h-full"
            style={{ backgroundImage: `url('${WABG}')` }}
          >
            <div className="flex justify-between p-3 bg-[#f0f2f5]">
              <div>{selectedUser}</div>
              <div>
                <button
                  onClick={async () => {
                    sessionStorage.removeItem("whatsappUser");
                    navigate("/");
                    const response = await axios.get(
                      "http://localhost:3001/clean"
                    );
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="h-[82vh] overflow-y-scroll">
              <div className="flex flex-col">
                {currentUser.chat.map((chat) => {
                  console.log(prevDate, chat.updatedAt.slice(0, 10));
                  prevDate =
                    prevDate === chat.updatedAt.slice(0, 10)
                      ? null
                      : chat.updatedAt.slice(0, 10);

                  return (
                    isPrintMessage(chat.from, chat.to) && (
                      <div>
                        {prevDate && (
                          <div className="flex justify-center">
                            <div className="bg-white p-3">{prevDate}</div>
                          </div>
                        )}
                        <div
                          key={chat._id}
                          className={`flex px-5 py-2 justify-between items-center ${
                            forward
                              ? forwardChatList.find(
                                  (fchat) => fchat._id === chat._id
                                )
                                ? "bg-[#e0e4e4] hover:bg-[#e0e4e4]"
                                : ""
                              : ""
                          }`}
                          onClick={() => {
                            if (forward) {
                              const isChatExist = forwardChatList.find(
                                (fchat) => fchat._id === chat._id
                              );
                              if (!isChatExist)
                                setForwardChatList([...forwardChatList, chat]);
                              else {
                                setForwardChatList(
                                  forwardChatList.filter(
                                    (fchat) => fchat._id !== chat._id
                                  )
                                );
                              }
                            }
                          }}
                        >
                          {forward && (
                            <div>
                              <input
                                type="checkbox"
                                checked={
                                  forwardChatList.find(
                                    (fchat) => fchat._id === chat._id
                                  )
                                    ? true
                                    : false
                                }
                              />
                            </div>
                          )}
                          <div key={chat._id} className={`flex justify-end`}>
                            <div className="flex items-center">
                              <div>
                                <div className="dropdown dropdown-top">
                                  <div tabIndex={0}>
                                    <MdOutlineInsertEmoticon size={20} />
                                  </div>
                                  <div
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu left-[-3rem] !bottom-[2rem] p-2 shadow bg-base-100 rounded-box"
                                  >
                                    <div className="flex justify-between gap-1 p-1">
                                      <div
                                        onClick={(e) =>
                                          updateEmoji(chat._id, "0x1F600")
                                        }
                                      >
                                        {String.fromCodePoint("0x1F600")}
                                      </div>
                                      <div
                                        onClick={(e) =>
                                          updateEmoji(chat._id, "0x1F601")
                                        }
                                      >
                                        {String.fromCodePoint("0x1F601")}
                                      </div>
                                      <div
                                        onClick={(e) =>
                                          updateEmoji(chat._id, "0x1F602")
                                        }
                                      >
                                        {String.fromCodePoint("0x1F602")}
                                      </div>
                                      <div
                                        onClick={(e) =>
                                          updateEmoji(chat._id, "0x1F607")
                                        }
                                      >
                                        {String.fromCodePoint("0x1F607")}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <TiArrowForward
                                  size={20}
                                  onClick={() => {
                                    if (chat.type !== "text") {
                                      showForwardModal();
                                      setForwardChat(chat);
                                    }
                                  }}
                                />
                              </div>
                              <div className="relative">
                                {renderMessage(chat)}
                                {chat.emoji && (
                                  <div className="absolute bottom-0 right-0">
                                    {String.fromCodePoint(chat.emoji)}
                                  </div>
                                )}
                                <div className="absolute top-0 right-0">
                                  <div className="dropdown dropdown-end">
                                    <div tabIndex={0}>
                                      <FaChevronDown color="red" />
                                    </div>
                                    <div
                                      tabIndex={0}
                                      className="dropdown-content flex z-[1] menu shadow bg-base-100 rounded-lg"
                                    >
                                      <div
                                        className="pointer-cursor"
                                        onClick={() => {
                                          setForward(!forward);
                                          setForwardChatList([]);
                                        }}
                                      >
                                        Forward
                                      </div>
                                      <div
                                        className="pointer-cursor"
                                        onClick={() => {
                                          setReply(true);
                                          setForwardChat(chat);
                                        }}
                                      >
                                        Reply
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
            {forward ? (
              <div className="flex justify-between items-center p-3 bg-[#e5e7eb]">
                <div className="flex items-center gap-5">
                  <div>
                    <IoMdClose
                      size={25}
                      onClick={() => {
                        setForward(!forward);
                        setForwardChatList([]);
                      }}
                    />
                  </div>
                  <div>{forwardChatList.length} Selected</div>
                </div>
                <div>
                  <div>
                    <TiArrowForward onClick={showForwardModal} size={25} />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {reply && (
                  <div className="flex w-full justify-between items-center bg-red-50">
                    <Reply chat={forwardChat} renderMessage={renderMessage} />
                    <IoMdClose onClick={() => setReply(false)} />
                  </div>
                )}
                <div>
                  <form
                    onSubmit={sendMessage}
                    className="flex p-3 bg-[#f0f2f5]"
                  >
                    <input
                      type="file"
                      onChange={async (e) => {
                        e.preventDefault();
                        const formData = new FormData();
                        formData.append("file", e.target.files[0]);
                        formData.append(
                          "userData",
                          JSON.stringify({
                            currentUser: currentUser.name,
                            receiptUser: selectedUser,
                          })
                        );
                        try {
                          const response = await axios.post(
                            "http://localhost:3001/upload",
                            formData,
                            {
                              headers: {
                                "Content-Type": "multipart/form-data",
                              },
                            }
                          );
                          getCurrentUserData();
                          // This can contain any response from the backend
                        } catch (error) {
                          console.error("Error uploading file:", error);
                        }
                      }}
                    />
                    <input
                      type="text"
                      name="message"
                      className="outline-none w-full rounded-lg p-2"
                    />
                    <button className="p-2">send</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>No user selected</div>
        )}
      </div>
      {mediaCarousel && (
        <div className="fixed top-0 left-0 bg-white h-screen w-screen flex flex-col justify-between">
          <div className="flex justify-end">
            <IoMdClose
              className="p-2"
              size={30}
              onClick={() => setMediaCarousel(!mediaCarousel)}
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <FaCircleChevronLeft
                size={30}
                onClick={() => {
                  if (mediaCarouselIndex > 0) {
                    setMediaCarouselIndex(mediaCarouselIndex - 1);
                  } else setMediaCarouselIndex(0);
                }}
              />
            </div>
            <div>
              {mediaCarouselIndex < currentUser.chat.length &&
                renderMessage(currentUser.chat[mediaCarouselIndex])}
            </div>
            <div>
              <FaCircleChevronRight
                size={30}
                onClick={() => {
                  if (mediaCarouselIndex >= currentUser.chat.length - 1) {
                    setMediaCarouselIndex(0);
                    setMediaCarousel(!mediaCarousel);
                  } else {
                    setMediaCarouselIndex(mediaCarouselIndex + 1);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex justify-center">
            {currentUser.chat.map(
              (chat, index) =>
                isPrintMessage(chat.from, chat.to) && (
                  <div
                    className={`w-10 h-10 ${
                      index === mediaCarouselIndex ? "border border-black" : ""
                    }`}
                    key={String(chat.updatedAt)}
                  >
                    {renderMessage(chat)}
                  </div>
                )
            )}
          </div>
        </div>
      )}
      <Modal
        id="forwardModal"
        width={30}
        content={
          <div className="flex flex-col">
            <div className="p-3 text-xl flex gap-5 bg-[#008069] text-white">
              <IoMdClose
                size={25}
                onClick={() => {
                  closeForwardModal();
                  setForwardUserList([]);
                }}
              />
              Forward message to
            </div>
            <div className="p-3">
              <SearchBar
                placeholder={"Search..."}
                icon={<FaArrowLeft size="20" />}
              />
            </div>
            <div className="text-lg p-3">RECENT CHATS</div>
            <form className="h-[35vh] p-3 overflow-y-scroll">
              {users.map((user) => (
                <SelectContact
                  key={user._id}
                  name={user.name}
                  setForwardUserList={setForwardUserList}
                  forwardUserList={forwardUserList}
                />
              ))}
            </form>
            {Object.keys(forwardChat).length > 0 && (
              <div className="flex gap-2 p-2">
                <div>
                  <img
                    src={forwardChat.url}
                    height={90}
                    width={90}
                    className="rounded-xl"
                  />
                </div>
                <div className="w-full">
                  <textarea className="w-full h-full outline-none bg-gray-50 resize-none rounded-sm"></textarea>
                </div>
              </div>
            )}
            {forwardUserList.length > 0 && (
              <div className="flex justify-between p-3">
                <div>
                  {forwardUserList.map((user) => (
                    <span key={user}>{user},</span>
                  ))}
                </div>
                <div>
                  <svg
                    onClick={async () => {
                      if (Object.keys(forwardChat).length > 0) {
                        const firstUser = forwardUserList[0];
                        for (const name of forwardUserList) {
                          const resp = await axios.post(
                            "http://localhost:3001/sendmessage",
                            {
                              message: forwardChat.message,
                              receiptUser: name,
                              currentUser: currentUser.name,
                              type: forwardChat.type,
                            }
                          );
                          console.log(resp);
                        }
                        setSelectedUser(firstUser);
                      } else {
                        const resp = await axios.post(
                          "http://localhost:3001/sendmessagebulkmultipleusers",
                          {
                            users: forwardUserList,
                            chats: forwardChatList,
                            currentUser: currentUser.name,
                          }
                        );
                      }
                      closeForwardModal();
                      getCurrentUserData();
                      setForwardUserList([]);
                    }}
                    viewBox="-4 -4 32 32"
                    height="40"
                    width="40"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>send</title>
                    <rect
                      x="-4"
                      y="-4"
                      width="32"
                      height="32"
                      fill="#00a884"
                      rx="16"
                      ry="16"
                    ></rect>
                    <path
                      fill="#fff"
                      transform="scale(0.7) translate(6,6)"
                      d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                    ></path>
                  </svg>
                </div>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};

export default App;
