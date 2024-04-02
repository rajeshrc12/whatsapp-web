import React, { useEffect, useState } from "react";
import LeftPanel from "./components/leftpanel/LeftPanel";
import MiddlePanel from "./components/middlepanel/MiddlePanel";
import { useDispatch, useSelector } from "react-redux";
import { setName, setOnlineUsers, setUserChats } from "./state/user/userSlice";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { getOnlineUsers } from "./api/socket";
import { getChats } from "./api/chats";
const App = () => {
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const fetchChats = async () => {
    const chats = await getChats(sessionStorage.getItem("name"));
    dispatch(setUserChats(chats));
  };
  const initializeUserData = async () => {
    const onlineUsers = await getOnlineUsers();
    fetchChats();
    dispatch(setOnlineUsers(onlineUsers));
    dispatch(setName(sessionStorage.getItem("name")));
  };
  useEffect(() => {
    if (sessionStorage.getItem("name")) {
      const sock = io("ws://localhost:3002", {
        query: {
          name: sessionStorage.getItem("name"),
        },
      });
      setSocket(sock);
      initializeUserData();
    } else {
      navigate("/");
      dispatch(setName(""));
    }
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on(sessionStorage.getItem("name"), () => {
        fetchChats();
      });
      socket.on("onlineUsers", (arg) => {
        if (arg.length) dispatch(setOnlineUsers(arg));
      });
    }
  }, [socket]);
  return (
    <div className="flex h-screen w-screen">
      <LeftPanel />
      {selectedUser ? (
        <MiddlePanel />
      ) : (
        <div className="bg-panel-header-background w-[70%]"></div>
      )}
    </div>
  );
};

export default App;
