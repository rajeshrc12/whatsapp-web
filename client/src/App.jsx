import React, { useEffect, useState } from "react";
import WABG from "./images/whatsapp_back.jpeg";
import Profile from "./images/profile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
const socket = io("ws://localhost:3002");
const App = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [msgImage, setMsgImage] = useState("");
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
        if (chat.type === "image") {
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
      console.log(chatNew);
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
                        key={String(chat.updatedAt)}
                        className={`flex justify-${
                          chat.mine ? "end" : "start"
                        }`}
                      >
                        {chat.type === "image" ? (
                          <div>
                            {console.log(chat)}
                            <img src={chat.message} height={200} width={200} />
                          </div>
                        ) : (
                          <div
                            className={`p-1 w-[40vw] bg-white m-2 rounded-lg`}
                          >
                            {chat.message}
                          </div>
                        )}
                      </div>
                    )
                )}
              </div>
            </div>
            <form onSubmit={sendMessage} className="flex p-3 bg-[#f0f2f5]">
              <input
                type="file"
                accept="image/*"
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
    </div>
  );
};

export default App;
