import React, { useCallback, useEffect, useState } from "react";
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
import StatusPage from "./components/StatusPage";
import { FaArrowLeft } from "react-icons/fa6";
import SelectContact from "./components/SelectContact";
import { FaChevronDown } from "react-icons/fa";
import Reply from "./components/Reply";
import ReplyMessage from "./components/ReplyMessage";
import { BsFillPinFill } from "react-icons/bs";
import { BiBlock, BiMicrophone, BiStats } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import PollMessage from "./components/PollMessage";
import InputFileIcon from "./components/InputFileIcon";
import { BsThreeDotsVertical } from "react-icons/bs";
const socket = io("ws://localhost:3002");
let prevDate = null;
const App = () => {
  const navigate = useNavigate();
  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [forward, setForward] = useState(false);
  const [pin, setPin] = useState({});
  const [reply, setReply] = useState(false);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [question, setQuestion] = useState("");
  const [multiAnswer, setMultiAnswer] = useState(false);
  const [answers, setAnswers] = useState({
    answer1: { message: "", error: false },
    answer2: { message: "", error: false },
  });
  const [pollAnswer, setPollAnswer] = useState({});
  const [leftPanel, setLeftPanel] = useState("");
  const [mediaCarousel, setMediaCarousel] = useState(false);
  const [mediaCarouselIndex, setMediaCarouselIndex] = useState(0);
  const [forwardUserList, setForwardUserList] = useState([]);
  const [forwardChatList, setForwardChatList] = useState([]);
  const [forwardChat, setForwardChat] = useState({});
  const [questionCount, setQuestionCount] = useState(2);
  const [files, setFiles] = useState([]);
  const [blobFiles, setBolbFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [contactInfo, setContactInfo] = useState("");
  const [searchContacts, setSearchContacts] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    setReply(false);
    setRecording(false);
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
  const getAllGroups = async () => {
    const resp = await axios.get(
      "http://localhost:3001/group/" + sessionStorage.getItem("whatsappUser")
    );
    setGroups(resp.data);
  };
  const getCurrentUserData = async () => {
    const resp = await axios.post("http://localhost:3001/user", {
      user: sessionStorage.getItem("whatsappUser"),
    });
    const chatNew = [];
    try {
      for (const chat of resp.data.chat) {
        if (chat.pin) {
          setPin(chat);
        }
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
      getAllGroups();
    } else navigate("/");
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices
    //     .getUserMedia({
    //       audio: true,
    //     })
    //     .then((stream) => {
    //       const rec = new MediaRecorder(stream);
    //       let chunks = [];
    //       rec.ondataavailable = (e) => {
    //         chunks.push(e.data);
    //       };
    //       rec.onstop = (e) => {
    //         const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    //         chunks = [];
    //         const audio = URL.createObjectURL(blob);
    //         setAudioURL(audio);
    //       };
    //       setRecorder(rec);
    //     });
    // }
  }, []);
  console.log(audioURL, currentUser);
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
      case "delete":
        return (
          <div className="flex p-1 italic gap-2 items-center bg-white rounded-lg">
            <div>
              <BiBlock />
            </div>
            <div>
              {chat.mine
                ? "You deleted this message"
                : "This message was deleted"}
            </div>
          </div>
        );
      case "poll":
        return (
          <PollMessage
            chat={chat}
            currentUser={currentUser.name}
            selectedUser={selectedUser}
          />
        );
      default:
        return (
          <div className={`p-1 max-w-[40vw] bg-white m-2 rounded-lg`}>
            {chat.message}
            {moment(chat.updatedAt).format("LT")}
          </div>
        );
    }
  };
  const addEmoji = async (id, emoji) => {
    const resp = await axios.post("http://localhost:3001/emoji", {
      chatId: id,
      emoji,
      currentUser: currentUser.name,
      selectedUser,
    });
    getCurrentUserData();
  };
  const showModal = (id) => {
    document.getElementById(id).showModal();
  };
  const closeModal = (id) => {
    document.getElementById(id).close();
  };
  const renderEmojiPanel = (emoji) => {
    return (
      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="All"
          checked
        />
        <div role="tabpanel" className="tab-content w-full">
          {emoji.map((emoji, i) => (
            <div className="flex justify-between">
              <div>{emoji.emojiUser}</div>
              <div>{String.fromCodePoint(emoji.emojiSymbol)}</div>
            </div>
          ))}
        </div>
        {emoji.map((emoji, i) => (
          <>
            <input
              type="radio"
              name={`my_tabs_1`}
              role="tab"
              className="tab"
              aria-label={String.fromCodePoint(emoji.emojiSymbol)}
            />
            <div role="tabpanel" className="tab-content w-full">
              Tab content {i + 1}
            </div>
          </>
        ))}
      </div>
    );
  };
  const renderContactInfo = useCallback(() => {
    switch (contactInfo) {
      case "details":
        return <div></div>;
      default:
        return <div></div>;
    }
  });
  useEffect(() => {
    setAnswers({
      ...answers,
      ["answer" + questionCount]: { message: "", error: false },
    });
  }, [questionCount]);
  const closePoll = () => {
    setQuestion("");
    setAnswers({
      answer1: { message: "", error: false },
      answer2: { message: "", error: false },
    });
    closeModal("pollModal");
    closeModal("pollWarningModal");
  };
  const [groupCreationContacts, setGroupCreationContacts] = useState([]);
  const submitGroup = async (e) => {
    e.preventDefault();
    if (e.target[0].value.trim()) {
      const formData = new FormData();
      formData.append("file", blobFiles.length ? blobFiles[0] : null);
      formData.append(
        "userData",
        JSON.stringify({
          users: [...groupCreationContacts, currentUser.name],
          name: e.target[0].value.trim(),
        })
      );
      axios.post("http://localhost:3001/group", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLeftPanel("");
    } else alert("Enter group name");
  };
  const renderLeftPanel = () => {
    switch (leftPanel) {
      case "addGroupMembers":
        return (
          <div className="flex flex-col h-full">
            <div className="h-[10vh] border">Add group members</div>
            <div className=" h-[15vh] overflow-y-scroll">
              <div className="flex flex-col justify-center p-2">
                {groupCreationContacts.map((contact) => (
                  <div className="w-full flex py-2 px-1 m-1 border rounded-lg">
                    <div className="w-full">
                      <img src={Profile} height={20} width={20} />
                    </div>
                    <div>{contact}</div>
                    <div>
                      <IoMdClose
                        onClick={() =>
                          setGroupCreationContacts(
                            groupCreationContacts.filter((c) => c !== contact)
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center h-[10vh] p-2">
              <input
                type="text"
                className="w-full outline-none border-b-[1px]"
                placeholder="Search name or number"
                onChange={(e) => setSearchContacts(e.target.value)}
              />
            </div>
            <div className="h-[60vh] border overflow-y-scroll">
              {users
                .filter((user) => user.name?.includes(searchContacts))
                .map((user) => (
                  <div
                    className={`cursor-pointer p-5 border border-t-0 border-gray-300`}
                    key={user.name}
                    onClick={() => {
                      if (!groupCreationContacts.includes(user.name))
                        setGroupCreationContacts([
                          ...groupCreationContacts,
                          user.name,
                        ]);
                    }}
                  >
                    {user.name}
                  </div>
                ))}
            </div>
            <div className="h-[10vh] border">
              <button onClick={() => setLeftPanel("addGroupDetails")}>
                next
              </button>
            </div>
          </div>
        );
      case "addGroupDetails":
        return (
          <div className="flex flex-col border-r-2 h-screen justify-center">
            <div
              className="rounded-full flex justify-center items-center h-[30vh] w-[15vw]"
              style={{
                backgroundImage: `url(${
                  typeof blobFiles[0] === "object"
                    ? URL.createObjectURL(blobFiles[0])
                    : Profile
                })`,
                backgroundSize: "cover",
                opacity: typeof blobFiles[0] === "object" ? "1" : "0.5",
              }}
            >
              {typeof blobFiles[0] !== "object" && (
                <InputFileIcon
                  multiple={false}
                  icon={<div className="text-white">Add Image</div>}
                  setBolbFiles={setBolbFiles}
                />
              )}
            </div>
            <div className="p-5">
              <form onSubmit={submitGroup}>
                <input
                  type="text"
                  placeholder="Group Subject"
                  className="w-full outline-none border-b-[1px]"
                />
                <button type="submit">Next</button>
              </form>
            </div>
          </div>
        );
      case "status":
        return <div className="flex"></div>;
      default:
        return (
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between items-center p-3 bg-[#f0f2f5]">
              <div>{currentUser.name}</div>
              <div>
                <svg
                  onClick={() => setMiddlePanel("status")}
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  class=""
                  fill="none"
                >
                  <title>status-outline</title>
                  <path
                    d="M13.5627 3.13663C13.6586 2.59273 14.1793 2.22466 14.7109 2.37438C15.7904 2.67842 16.8134 3.16256 17.7359 3.80858C18.9322 4.64624 19.9304 5.73574 20.6605 7.0005C21.3906 8.26526 21.8348 9.67457 21.9619 11.1294C22.06 12.2513 21.9676 13.3794 21.691 14.4662C21.5548 15.0014 20.9756 15.2682 20.4567 15.0793C19.9377 14.8903 19.6769 14.317 19.7996 13.7785C19.9842 12.9693 20.0421 12.1343 19.9695 11.3035C19.8678 10.1396 19.5124 9.01218 18.9284 8.00038C18.3443 6.98857 17.5457 6.11697 16.5887 5.44684C15.9055 4.96844 15.1535 4.601 14.3605 4.3561C13.8328 4.19314 13.4668 3.68052 13.5627 3.13663Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M18.8943 17.785C19.3174 18.14 19.3758 18.7749 18.9803 19.1604C18.1773 19.9433 17.2465 20.5872 16.2257 21.0631C14.9022 21.6802 13.4595 22 11.9992 21.9999C10.5388 21.9998 9.09621 21.6798 7.77275 21.0625C6.75208 20.5865 5.82137 19.9424 5.01843 19.1595C4.62302 18.7739 4.68155 18.139 5.10467 17.784C5.52779 17.4291 6.15471 17.4898 6.55964 17.8654C7.16816 18.4298 7.86233 18.8974 8.61817 19.25C9.67695 19.7438 10.831 19.9998 11.9993 19.9999C13.1676 20 14.3217 19.7442 15.3806 19.2505C16.1365 18.898 16.8307 18.4304 17.4393 17.8661C17.8443 17.4906 18.4712 17.43 18.8943 17.785Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M3.54265 15.0781C3.02367 15.267 2.44458 15.0001 2.30844 14.4649C2.03202 13.3781 1.93978 12.2502 2.03794 11.1283C2.16521 9.67361 2.60953 8.26444 3.33966 6.99984C4.06979 5.73523 5.06802 4.64587 6.2642 3.80832C7.18668 3.1624 8.20962 2.67833 9.28902 2.37434C9.82063 2.22462 10.3413 2.59271 10.4372 3.1366C10.5331 3.6805 10.1671 4.19311 9.63938 4.35607C8.84645 4.60094 8.09446 4.96831 7.41133 5.44663C6.45439 6.11667 5.65581 6.98816 5.0717 7.99985C4.4876 9.01153 4.13214 10.1389 4.03032 11.3026C3.95764 12.1334 4.01547 12.9683 4.19986 13.7775C4.32257 14.3159 4.06162 14.8892 3.54265 15.0781Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.9999 16C14.2091 16 15.9999 14.2092 15.9999 12C15.9999 9.79088 14.2091 8.00002 11.9999 8.00002C9.7908 8.00002 7.99994 9.79088 7.99994 12C7.99994 14.2092 9.7908 16 11.9999 16ZM11.9999 18C15.3136 18 17.9999 15.3137 17.9999 12C17.9999 8.68631 15.3136 6.00002 11.9999 6.00002C8.68623 6.00002 5.99994 8.68631 5.99994 12C5.99994 15.3137 8.68623 18 11.9999 18Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0}>
                  <BsThreeDotsVertical className="cursor-pointer" />
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 whitespace-nowrap"
                >
                  <button onClick={() => setLeftPanel("addGroupMembers")}>
                    New group
                  </button>
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
            </div>
            <div className="h-[90vh] overflow-y-scroll">
              {users.map((user) => (
                <div
                  className={`cursor-pointer p-10 border border-t-0 border-gray-300 ${
                    user.name === selectedUser && "bg-red-200"
                  }`}
                  key={user.name}
                  onClick={() => setSelectedUser(user.name)}
                >
                  {user.name}
                </div>
              ))}
              {groups.map((user) => (
                <div
                  className={`cursor-pointer p-10 border border-t-0 border-gray-300 ${
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
        );
    }
  };
  const [middlePanel, setMiddlePanel] = useState("");
  const renderMiddlePanel = useCallback(() => {
    switch (middlePanel) {
      case "status":
        return (
          <StatusPage
            setMiddlePanel={setMiddlePanel}
            chat={currentUser.chat.filter((c) => c.type === "image")}
          />
        );
      default:
        return (
          <div className={`grid grid-cols-6 h-screen`}>
            <div className={`col-span-2 h-full`}>{renderLeftPanel()}</div>
            <div className={`col-span-4 h-full`}>
              {selectedUser ? (
                <div
                  className="flex flex-col justify-between h-full"
                  style={{ backgroundImage: `url('${WABG}')` }}
                >
                  <div className="flex justify-between p-3 bg-[#f0f2f5]">
                    <div
                      className="cursor-pointer"
                      onClick={() => setContactInfo(!contactInfo)}
                    >
                      {selectedUser}
                    </div>
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
                  {Object.keys(pin).length > 0 && (
                    <div className="flex items-center bg-white gap-3 p-3">
                      <div>
                        <BsFillPinFill />
                      </div>
                      <div>{pin.message}</div>
                    </div>
                  )}
                  <div className="h-[75vh] overflow-y-scroll">
                    <div className="flex flex-col">
                      {currentUser.chat.map((chat) => {
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
                                      setForwardChatList([
                                        ...forwardChatList,
                                        chat,
                                      ]);
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
                                <div
                                  key={chat._id}
                                  className={`flex justify-end`}
                                >
                                  <div className="flex items-center">
                                    {chat.type !== "delete" && (
                                      <>
                                        <div>
                                          <div className="dropdown dropdown-right">
                                            <div tabIndex={0}>
                                              <MdOutlineInsertEmoticon
                                                size={20}
                                              />
                                            </div>
                                            <div
                                              tabIndex={0}
                                              className="dropdown-content z-[1] menu left-[-3rem] !bottom-[2rem] p-2 shadow bg-base-100 rounded-box"
                                            >
                                              <div className="flex justify-between gap-1 p-1">
                                                <div
                                                  onClick={(e) =>
                                                    addEmoji(
                                                      chat._id,
                                                      "0x1F600"
                                                    )
                                                  }
                                                >
                                                  {String.fromCodePoint(
                                                    "0x1F600"
                                                  )}
                                                </div>
                                                <div
                                                  onClick={(e) =>
                                                    addEmoji(
                                                      chat._id,
                                                      "0x1F601"
                                                    )
                                                  }
                                                >
                                                  {String.fromCodePoint(
                                                    "0x1F601"
                                                  )}
                                                </div>
                                                <div
                                                  onClick={(e) =>
                                                    addEmoji(
                                                      chat._id,
                                                      "0x1F602"
                                                    )
                                                  }
                                                >
                                                  {String.fromCodePoint(
                                                    "0x1F602"
                                                  )}
                                                </div>
                                                <div
                                                  onClick={(e) =>
                                                    addEmoji(
                                                      chat._id,
                                                      "0x1F607"
                                                    )
                                                  }
                                                >
                                                  {String.fromCodePoint(
                                                    "0x1F607"
                                                  )}
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
                                                showModal("forwardModal");
                                                setForwardChat(chat);
                                              }
                                            }}
                                          />
                                        </div>
                                      </>
                                    )}
                                    <div className="relative">
                                      {renderMessage(chat)}
                                      {chat.emoji.length > 0 &&
                                        chat.type !== "delete" && (
                                          <div className="absolute p-1 rounded-2xl bottom-[-1rem] right-0 bg-white">
                                            <div className="dropdown">
                                              <div tabIndex={0}>
                                                <div className="flex gap-1">
                                                  <div>
                                                    {chat.emoji.map((emoji) =>
                                                      String.fromCodePoint(
                                                        emoji.emojiSymbol
                                                      )
                                                    )}
                                                  </div>
                                                  <div>{chat.emoji.length}</div>
                                                </div>
                                              </div>
                                              <div
                                                tabIndex={0}
                                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                                              >
                                                {renderEmojiPanel(chat.emoji)}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      {chat.type !== "delete" && (
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
                                              <div
                                                className="pointer-cursor"
                                                onClick={async () => {
                                                  const resp = await axios.post(
                                                    "http://localhost:3001/pin",
                                                    {
                                                      _id: chat._id,
                                                      name: currentUser.name,
                                                      unpin: pin,
                                                    }
                                                  );
                                                  getCurrentUserData();
                                                }}
                                              >
                                                {pin._id === chat._id
                                                  ? "Unpin"
                                                  : "Pin"}
                                              </div>
                                              <div
                                                className="pointer-cursor"
                                                onClick={async () => {
                                                  const resp = await axios.post(
                                                    "http://localhost:3001/delete",
                                                    {
                                                      chatId: chat._id,
                                                      name: currentUser.name,
                                                      receiptUser: selectedUser,
                                                    }
                                                  );
                                                  getCurrentUserData();
                                                }}
                                              >
                                                Delete
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
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
                          <TiArrowForward
                            onClick={() => showModal("forwardModal")}
                            size={25}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {reply && (
                        <div className="flex w-full justify-between items-center bg-red-50">
                          <Reply
                            chat={forwardChat}
                            renderMessage={renderMessage}
                          />
                          <IoMdClose onClick={() => setReply(false)} />
                        </div>
                      )}
                      <div>
                        <form
                          onSubmit={sendMessage}
                          className="flex p-3 gap-3 bg-[#f0f2f5] w-full justify-between items-center"
                        >
                          <div className="dropdown dropdown-top">
                            <div tabIndex={0}>
                              <FaPlus />
                            </div>
                            <div
                              tabIndex={0}
                              className="dropdown-content flex flex-col gap-2 z-[1] menu shadow bg-base-100 rounded-box"
                            >
                              <InputFileIcon
                                files={files}
                                setFiles={setFiles}
                                blobFiles={blobFiles}
                                setBolbFiles={setBolbFiles}
                                icon={
                                  <div className="flex items-center">
                                    <FaPlus />
                                    <div>Document</div>
                                  </div>
                                }
                                callback={() => showModal("mediaModal")}
                              />
                              <div
                                onClick={() => showModal("pollModal")}
                                className="cursor-pointer"
                              >
                                Poll
                              </div>
                            </div>
                          </div>
                          <div className="w-full">
                            {recording ? (
                              <div className="flex">
                                <span className="loading loading-ring loading-lg"></span>
                                <div>
                                  {audioURL && (
                                    <audio controls src={audioURL}></audio>
                                  )}
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    recorder.stop();
                                    setAudioURL(null);
                                  }}
                                >
                                  Stop
                                </button>
                              </div>
                            ) : (
                              <input
                                type="text"
                                name="message"
                                className="outline-none w-full rounded-lg p-2"
                              />
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              recorder.start();
                              setRecording(true);
                            }}
                          >
                            <BiMicrophone />
                          </button>
                          <div>
                            <button className="p-2">send</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>No user selected</div>
              )}
            </div>
            {contactInfo && (
              <div className="col-span-2 h-screen overflow-y-scroll flex flex-col bg-gray-200">
                <div className="flex flex-col p-20 items-center bg-white">
                  <div>
                    <img src={Profile} className="rounded-[30vh]" alt="" />
                  </div>
                  <div>{selectedUser}</div>
                </div>
                <div className="bg-white my-5 p-3">
                  <div>About</div>
                  <div>Available</div>
                </div>
                <div className="flex flex-col bg-white p-3">
                  <div className="flex justify-between">
                    <div>Media links and docs</div>
                    <div>
                      {
                        currentUser?.chat?.filter(
                          (c) => c.type === "video" || c.type === "image"
                        ).length
                      }
                    </div>
                  </div>
                  <div className="flex w-full p-3">
                    {currentUser?.chat
                      ?.filter(
                        (d, i) =>
                          i < 3 && (d.type === "video" || d.type === "image")
                      )
                      ?.map((i) => (
                        <img
                          src={i.url}
                          height={100}
                          width={100}
                          className="p-5"
                        />
                      ))}
                  </div>
                  <div>
                    <div>Starred message</div>
                    <div className="text-red-500">Delete chat</div>
                  </div>
                </div>
              </div>
            )}

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
                            index === mediaCarouselIndex
                              ? "border border-black"
                              : ""
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
                        closeModal("forwardModal");
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
                            closeModal("forwardModal");
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
            <Modal
              id="pollModal"
              width={30}
              content={
                <div className="flex flex-col gap-2">
                  <div className="bg-[#008069] flex p-3 gap-5 items-center">
                    <div>
                      <IoMdClose
                        size={25}
                        color="white"
                        onClick={() => {
                          if (
                            question.trim().length ||
                            answers.answer1.message.trim().length ||
                            answers.answer2.message.trim().length
                          ) {
                            showModal("pollWarningModal");
                          } else {
                            closePoll();
                          }
                        }}
                      />
                    </div>
                    <div className="text-xl text-white">Create Poll</div>
                  </div>
                  <div className="p-3 text-xl text-[#3b4a54]">Question</div>
                  <div className="p-3 w-full">
                    <input
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      type="text"
                      className="w-full py-1 outline-none border-b-2"
                      placeholder="Ask question"
                    />
                  </div>
                  <div className="flex justify-between p-3">
                    <div className="text-xl text-[#3b4a54]">Options</div>
                    <button
                      onClick={() => {
                        if (
                          Object.values(answers).every(
                            (ans) => ans.message !== ""
                          )
                        )
                          setQuestionCount(questionCount + 1);
                      }}
                      className="bg-[#008069] text-white rounded-lg p-1"
                    >
                      Add
                    </button>
                  </div>
                  <div className="p-3 flex flex-col gap-3 w-full h-[25vh] overflow-y-scroll">
                    {Object.keys(answers).map((answer) => (
                      <>
                        <div className="flex">
                          <input
                            value={answers[answer].message}
                            onChange={(e) => {
                              let isAnswerExist = false;
                              if (e.target.value.trim()) {
                                for (const ans of Object.entries(answers)) {
                                  const [key, value] = ans;
                                  if (value.message === e.target.value.trim()) {
                                    isAnswerExist = true;
                                  }
                                }
                              }
                              const temp = JSON.parse(JSON.stringify(answers));
                              for (const ans of Object.keys(answers)) {
                                if (
                                  ans !== "answer1" &&
                                  ans !== "answer2" &&
                                  answers[ans].message === ""
                                ) {
                                  delete temp[ans];
                                }
                              }
                              setAnswers({
                                ...temp,
                                [answer]: {
                                  message: e.target.value.trim(),
                                  error: isAnswerExist,
                                },
                              });
                            }}
                            type="text"
                            className={`w-full px-1 outline-none ${
                              answers[answer].error && "border-[#ea0038]"
                            } border-b-2`}
                            placeholder="Ask question"
                          />
                          <IoIosMenu />
                        </div>
                        <div className="text-[#ea0038] text-sm">
                          {answers[answer].error && "This is already an option"}
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div>Allow multiple answers</div>
                    <div>
                      <input
                        type="checkbox"
                        checked={multiAnswer}
                        onChange={(e) => setMultiAnswer(e.target.checked)}
                        className="toggle toggle-sm"
                      />
                    </div>
                  </div>
                  <div className="flex p-3 justify-end">
                    <svg
                      style={{
                        opacity:
                          question &&
                          Object.values(answers).every(
                            (ans) => ans.message.trim() !== "" && !ans.error
                          )
                            ? "1"
                            : "0.5",
                      }}
                      className={
                        question &&
                        Object.values(answers).every(
                          (ans) => ans.message.trim() !== "" && !ans.error
                        )
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      }
                      onClick={async () => {
                        if (
                          question &&
                          Object.values(answers).every(
                            (ans) => ans.message.trim() !== "" && !ans.error
                          )
                        ) {
                          const resp = await axios.post(
                            "http://localhost:3001/sendmessage",
                            {
                              message: {
                                question,
                                answers: Object.entries(answers).map((ans) => {
                                  const [key, value] = ans;
                                  return {
                                    answer: value.message,
                                    users: [],
                                  };
                                }),
                                multiAnswer,
                              },
                              receiptUser: selectedUser,
                              currentUser: currentUser.name,
                              type: "poll",
                              reply: null,
                            }
                          );
                          closeModal("pollModal");
                        }
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
              }
            />
            <Modal
              id="pollWarningModal"
              width={40}
              content={
                <div className="flex flex-col p-5 gap-5">
                  <div className="text-xl">Leave poll ?</div>
                  <div className="">Your edits wont't be saved</div>
                  <div className="flex justify-end items-center gap-2">
                    <button
                      onClick={() => {
                        closePoll();
                      }}
                      className="text-[#ea0038] rounded-[5rem] px-5 py-2 border"
                    >
                      Leave
                    </button>
                    <button
                      onClick={() => closeModal("pollWarningModal")}
                      className="bg-[#008069] text-white rounded-[5rem] px-5 py-2"
                    >
                      Keep editing
                    </button>
                  </div>
                </div>
              }
            />
            <Modal
              id="mediaModal"
              width={100}
              content={
                <div className="flex flex-col p-3 bg-[#e9edef] gap-5">
                  <div>
                    <IoMdClose
                      size={25}
                      onClick={() => {
                        closeModal("mediaModal");
                        setFiles([]);
                        setBolbFiles([]);
                      }}
                    />
                  </div>
                  <div className="flex justify-center w-full">
                    <div
                      style={{
                        backgroundImage: `url(${files[selectedImage]})`,
                        backgroundSize: "contain",
                        height: "50vh",
                        width: "50vw",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                      }}
                    ></div>
                  </div>
                  <div className="flex items-center border p-2 gap-2 bg-white rounded-lg">
                    <input
                      type="text"
                      className="outline-none bg-white w-full"
                    />
                    <MdOutlineInsertEmoticon />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex w-full justify-center">
                      {files.map((file, index) => (
                        <div
                          onClick={() => setSelectedImage(index)}
                          style={{
                            backgroundImage: `url(${file})`,
                            backgroundSize: "cover",
                          }}
                          className={`${
                            index === selectedImage
                              ? "border-2 border-[#00a884]"
                              : ""
                          } m-1 h-14 w-14 flex items-center relative rounded-lg`}
                        >
                          <IoMdClose
                            size={5}
                            className="absolute top-0 right-0 cursor-pointer"
                            onClick={() =>
                              setFiles(files.filter((f) => f !== file))
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center">
                      <div className="border border-gray-300 rounded-lg m-1 h-14 w-14 flex justify-center items-center">
                        <InputFileIcon
                          files={files}
                          setFiles={setFiles}
                          blobFiles={blobFiles}
                          setBolbFiles={setBolbFiles}
                          icon={<FaPlus />}
                        />
                      </div>
                      <div>
                        <svg
                          className="cursor-pointer"
                          onClick={() => {
                            try {
                              for (const file of blobFiles) {
                                const formData = new FormData();
                                formData.append("file", file);
                                formData.append(
                                  "userData",
                                  JSON.stringify({
                                    currentUser: currentUser.name,
                                    receiptUser: selectedUser,
                                  })
                                );
                                axios.post(
                                  "http://localhost:3001/upload",
                                  formData,
                                  {
                                    headers: {
                                      "Content-Type": "multipart/form-data",
                                    },
                                  }
                                );
                              }
                              getCurrentUserData();
                              closeModal("mediaModal");
                              setFiles([]);
                              setBolbFiles([]);
                              // This can contain any response from the backend
                            } catch (error) {
                              console.error("Error uploading file:", error);
                            }
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
                  </div>
                </div>
              }
            />
          </div>
        );
    }
  }, [currentUser, middlePanel, selectedUser]);
  return renderMiddlePanel();
};

export default App;
