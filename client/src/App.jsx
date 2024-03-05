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
import Popper from "./components/Popper";
const socket = io("ws://localhost:3002");
const App = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [mediaCarousel, setMediaCarousel] = useState(false);
  const [mediaCarouselIndex, setMediaCarouselIndex] = useState(0);
  const sendMessage = async (e) => {
    e.preventDefault();
    const message = e.target[1].value.trim();
    if (message) {
      const resp = await axios.post("http://localhost:3001/sendmessage", {
        message,
        receiptUser: selectedUser,
        currentUser: currentUser.name,
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
            message: url,
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
  console.log(currentUser);
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
            <img src={chat.message} height={200} width={200} />
          </div>
        );
      case "video":
        return (
          <video
            controls
            width="250"
            onClick={() => setMediaCarousel(!mediaCarousel)}
          >
            <source src={chat.message} type="video/webm" />
            <source src={chat.message} type="video/mp4" />
            Download the
            <a href={chat.message}>WEBM</a>
            or
            <a href={chat.message}>MP4</a>
            video.
          </video>
        );
      default:
        return (
          <div className={`p-1 w-[40vw] bg-white m-2 rounded-lg`}>
            {chat.message}
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
    console.log(resp.data);
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
                    console.log(response);
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="h-[82vh] overflow-y-scroll">
              <div className="flex flex-col">
                {currentUser.chat.map(
                  (chat) =>
                    isPrintMessage(chat.from, chat.to) && (
                      <div
                        key={chat._id}
                        className={`flex justify-${
                          chat.mine ? "end" : "start"
                        }`}
                      >
                        <div className="flex items-center">
                          <div>
                            <Popper
                              content={
                                <div className="flex bg-white">
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
                              }
                            >
                              <MdOutlineInsertEmoticon size={20} />
                            </Popper>
                          </div>
                          <div>
                            <TiArrowForward size={20} />
                          </div>
                          <div className="relative">
                            {renderMessage(chat)}
                            {chat.emoji && (
                              <div className="absolute bottom-0 right-0">
                                {String.fromCodePoint(chat.emoji)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
            <form onSubmit={sendMessage} className="flex p-3 bg-[#f0f2f5]">
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
                    console.log("File uploaded successfully");
                    console.log(response.data); // This can contain any response from the backend
                  } catch (error) {
                    console.error("Error uploading file:", error);
                  }
                  console.log(formData, e.target.files[0]);
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
    </div>
  );
};

export default App;
