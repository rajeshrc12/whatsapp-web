import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TickIcon from "./icons/TickIcon";
const App = () => {
  const navigate = useNavigate();
  const loggedInUser = sessionStorage.getItem("name");
  const [users, setUsers] = useState([]);
  const [newChatUsers, setNewChatUsers] = useState([]);
  const [newChat, setNewChat] = useState(false);
  const [chats, setChats] = useState([]);
  const [value, setValue] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const makeAllChatsAsSeen = async ({ name }) => {
    await axios.post(`http://localhost:3001/seenall`, {
      from: name,
      to: loggedInUser,
    });
    fetchChats();
  };
  const handleOpenProfile = async ({ openProfile }) => {
    await axios.post(`http://localhost:3001/openprofile`, {
      name: loggedInUser,
      openProfile,
    });
    const result = await axios.get(`http://localhost:3001/getonlineuser`);
    setOnlineUsers(result.data);
  };
  const sendMessage = async () => {
    if (newChat) setNewChat(false);
    if (value.trim()) {
      setValue("");
      await axios.post(`http://localhost:3001/send`, {
        from: loggedInUser,
        to: selectedUser.name,
        message: value,
      });
    }
    fetchChats();
  };
  const fetchChats = async () => {
    if (loggedInUser) {
      const result = await axios.get(
        `http://localhost:3001/chats/${loggedInUser}`
      );
      setChats(result.data);
    }
  };
  const fetchNewChatUsers = async () => {
    const result = await axios.post(`http://localhost:3001/users`, {
      user: loggedInUser,
    });
    setNewChatUsers(result.data);
  };
  const initiatSocket = async () => {
    const soc = io("ws://localhost:3002", {
      query: {
        name: loggedInUser,
      },
    });
    setSocket(soc);
  };
  useEffect(() => {
    handleOpenProfile({ openProfile: null });
    initiatSocket();
    fetchChats();
    fetchNewChatUsers();
  }, []);
  useEffect(() => {
    const usersTemp = [];
    for (const chat of chats) {
      let isUserExist = null;
      if (chat.from !== loggedInUser) {
        isUserExist = usersTemp.find((user) => user.name === chat.from);
        if (isUserExist) {
          if (!chat.seen) isUserExist.unseenChat.push(chat);
        } else {
          usersTemp.push({
            name: chat.from,
            unseenChat: chat.seen ? [] : [chat],
          });
        }
      }
      if (chat.to !== loggedInUser) {
        isUserExist = usersTemp.find((user) => user.name === chat.to);
        if (!isUserExist) {
          usersTemp.push({
            name: chat.to,
            unseenChat: [],
          });
        }
      }
    }
    setUsers(usersTemp);
  }, [chats]);
  useEffect(() => {
    if (socket) {
      socket.on(loggedInUser, (arg) => {
        fetchChats();
      });
      socket.on("onlineUsers", (arg) => {
        if (arg.length) setOnlineUsers(arg);
      });
    }
  }, [socket]);
  useEffect(() => {
    if (onlineUsers.length && selectedUser?.name) {
      if (onlineUsers.find((user) => user.name === selectedUser.name))
        setSelectedUser({ ...selectedUser, status: "online" });
      else setSelectedUser({ ...selectedUser, status: "offline" });
    }
  }, [onlineUsers]);
  console.log(onlineUsers, selectedUser);
  // console.clear();
  // console.table(
  //   chats.map((chat) => ({
  //     from: chat.from,
  //     to: chat.to,
  //     message: chat.message,
  //     seen: chat.seen,
  //   }))
  // );
  // console.table(users);

  return (
    <div className="flex h-screen w-screen">
      <div className="w-[40%]">
        {newChat ? (
          <div className="flex flex-col h-full">
            <div className="h-[10%] border">
              <div className="flex justify-between">
                <div onClick={() => setNewChat(!newChat)}>Back</div>
                <div>Select Contacts</div>
                <div>
                  <button
                    onClick={async () => {
                      navigate("/");
                      sessionStorage.removeItem("name");
                      await axios.get(
                        `http://localhost:3001/logout/${loggedInUser}`
                      );
                    }}
                  >
                    logout
                  </button>
                </div>
              </div>
            </div>
            <div className="h-[90%] border overflow-y-scroll">
              {newChatUsers.map((user) => (
                <div
                  key={user.name}
                  className="p-3"
                  onClick={() => {
                    if (selectedUser.name !== user.name) {
                      setSelectedUser({ name: user.name, status: "offline" });
                      makeAllChatsAsSeen({ name: user.name });
                      handleOpenProfile({ openProfile: user.name });
                      setNewChat(false);
                    }
                  }}
                >
                  {user.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="h-[10%] border">
              <div className="flex justify-between">
                <div>{loggedInUser}</div>
                <div onClick={() => setNewChat(!newChat)}>New Chat</div>
                <div>
                  <button
                    onClick={async () => {
                      navigate("/");
                      sessionStorage.removeItem("name");
                      await axios.get(
                        `http://localhost:3001/logout/${loggedInUser}`
                      );
                    }}
                  >
                    logout
                  </button>
                </div>
              </div>
            </div>
            <div className="h-[90%] border overflow-y-scroll">
              {users.map((user) => (
                <div
                  key={user.name}
                  className={`p-3 flex justify-between ${
                    user.name === selectedUser.name ? "bg-gray-300" : ""
                  }`}
                  onClick={async () => {
                    if (selectedUser.name !== user.name) {
                      makeAllChatsAsSeen({ name: user.name });
                      handleOpenProfile({ openProfile: user.name });
                      setSelectedUser({ name: user.name, status: "offline" });
                    }
                  }}
                >
                  <div>{user.name}</div>
                  {user.unseenChat.length > 0 && (
                    <div className="bg-red-500 rounded-full w-4 text-white font-bold">
                      {user.unseenChat.length}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-[60%]">
        {selectedUser.name ? (
          <div className="flex flex-col h-full">
            <div className="h-[10%] border">
              {selectedUser.name}({selectedUser.status})
            </div>
            <div className="h-[80%] border overflow-y-scroll">
              {chats
                .filter(
                  (chat) =>
                    chat.from === selectedUser.name ||
                    chat.to === selectedUser.name
                )
                .map((chat) => (
                  <div
                    key={String(Math.random())}
                    className={`flex ${
                      chat.from === loggedInUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div className="border w-1/3" key={chat.message}>
                      <div>{chat.message}</div>
                      {chat.from === loggedInUser && (
                        <div>
                          <TickIcon seen={chat.seen} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className="h-[10%] border">
              <div className="flex h-full">
                <input
                  placeholder="message"
                  type="text"
                  className="w-full h-full"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </div>
          </div>
        ) : (
          <div>No user selected</div>
        )}
      </div>
    </div>
  );
};

export default App;
