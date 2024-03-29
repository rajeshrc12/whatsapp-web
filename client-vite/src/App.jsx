import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TickIcon from "./icons/TickIcon";
const App = () => {
  const loggedInUser = sessionStorage.getItem("name");
  const users = ["rajesh", "mahesh", "ganesh", "nagu"].filter(
    (user) => user !== loggedInUser
  );
  const [selectedUser, setSelectedUser] = useState({ name: "", status: "" });
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleOpenProfile = async ({ openProfile }) => {
    await axios.post(`http://localhost:3001/openprofile`, {
      name: loggedInUser,
      openProfile,
    });
  };
  const sendMessage = async () => {
    if (value.trim()) {
      setValue("");
      const result = await axios.post(`http://localhost:3001/send`, {
        from: loggedInUser,
        to: selectedUser.name,
        message: value,
      });
      if (result.data.acknowledged) {
        updateChats();
      }
    }
  };
  const updateChats = async () => {
    console.log("updateChats");
    const result = await axios.get(`http://localhost:3001/chats`);
    setChats(result.data);
  };
  useEffect(() => {
    const getData = async () => {
      const soc = io("ws://localhost:3002", {
        query: {
          name: loggedInUser,
        },
      });
      updateChats();
      setSocket(soc);
      handleOpenProfile({ openProfile: null });
    };
    if (loggedInUser) {
      getData();
    } else navigate("/");
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on(loggedInUser, () => {
        updateChats();
      });
    }
  }, [socket]);
  console.log(chats);
  return (
    <div className="flex h-screen w-screen">
      <div className="w-[40%]">
        <div className="flex flex-col h-full">
          <div className="h-[10%] border">
            <div className="flex justify-between">
              <div>{loggedInUser}</div>
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
                key={user}
                className={`p-3 ${user === selectedUser.name && "bg-red-300"}`}
                onClick={async () => {
                  handleOpenProfile({ openProfile: user });
                  await axios.post(`http://localhost:3001/seenall`, {
                    from: user,
                    to: loggedInUser,
                  });
                  setSelectedUser({ name: user, status: "offline" });
                }}
              >
                {user}
              </div>
            ))}
          </div>
        </div>
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
                    (chat.from === loggedInUser &&
                      chat.to === selectedUser.name) ||
                    (chat.to === loggedInUser &&
                      chat.from === selectedUser.name)
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
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
