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
    if (loggedInUser && selectedUser.name) {
      const result = await axios.post(`http://localhost:3001/chats`, {
        from: loggedInUser,
        to: selectedUser.name,
      });
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
    initiatSocket();
    fetchChats();
    fetchNewChatUsers();
  }, []);
  useEffect(() => {
    const usersTemp = [];
    for (const chat of chats) {
      const isUserExist = usersTemp.find((user) => user.name === chat.from);
      if (isUserExist) {
        isUserExist.unseenChatCount = chat.seen ? chat.seen : chat.seen + 1;
      } else {
        usersTemp.push({
          name: chat.from,
          unseenChatCount: chat.seen ? 0 : 1,
        });
      }
    }
    console.clear();
    console.table(usersTemp);
  }, [chats]);
  // console.clear();
  // console.table(
  //   chats.map((chat) => ({
  //     from: chat.from,
  //     to: chat.to,
  //     message: chat.message,
  //   }))
  // );
  // console.table(newChatUsers);
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
                    setSelectedUser({ name: user.name, status: "offline" });
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
                <div>{user}</div>
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
              {chats.map((chat) => (
                <div
                  key={String(Math.random())}
                  className={`flex ${
                    chat.from === loggedInUser ? "justify-end" : "justify-start"
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
