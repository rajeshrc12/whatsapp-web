import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { getOnlineUsers, getUsers } from "./service/user";
const App = () => {
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const handleOnlineUsers = async () => {
    const users = await getUsers();
    const onlineUsers = await getOnlineUsers();
    setOnlineUsers(onlineUsers);
    console.log(users);
  };
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      const skt = io(import.meta.env.VITE_SERVER_SOCKET_URL, {
        query: {
          email,
        },
      });
      handleOnlineUsers();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <div className="text-2xl font-bold">{localStorage.getItem("email")}</div>
      <button
        onClick={() => {
          localStorage.removeItem("email");
          navigate("/login");
        }}
      >
        logout
      </button>
      {onlineUsers.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
};

export default App;
