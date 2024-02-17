import React, { useEffect, useState } from "react";
import WABG from "./images/whatsapp_back.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const App = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    const message = e.target[0].value.trim();
    if (message) {
      const resp = await axios.post("http://localhost:3001/sendmessage", {
        message,
        receiptUser: selectedUser,
        currentUser: currentUser.name,
      });
      console.log(resp);
      getCurrentUserData();
    } else alert("Enter message");
  };
  const getAllUsers = async () => {
    const resp = await axios.post("http://localhost:3001/users", {
      user: currentUser.name,
    });
    setUsers(resp.data);
  };
  const getCurrentUserData = async () => {
    const resp = await axios.post("http://localhost:3001/user", {
      user: sessionStorage.getItem("whatsappUser"),
    });
    setCurrentUser(resp.data);
  };
  useEffect(() => {
    if (currentUser) getAllUsers();
  }, [currentUser]);
  useEffect(() => {
    if (sessionStorage.getItem("whatsappUser")) getCurrentUserData();
    else navigate("/");
  }, []);
  console.log(currentUser);
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
                className="cursor-pointer p-5 border border-t-0 border-gray-300"
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
            className="flex flex-col justify-between h-full bg-red-400"
            style={{ backgroundImage: `url('${WABG}')` }}
          >
            <div className="p-3 bg-[#f0f2f5]">{selectedUser}</div>
            <div className="h-[82vh] overflow-y-scroll">
              <div className="flex flex-col">
                {currentUser.chat.map((chat) => (
                  <div
                    className={`flex justify-${chat.mine ? "end" : "start"}`}
                  >
                    <div className={`p-1 w-[40vw] bg-white m-2 rounded-lg`}>
                      {chat.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={sendMessage} className="flex p-3 bg-[#f0f2f5]">
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
