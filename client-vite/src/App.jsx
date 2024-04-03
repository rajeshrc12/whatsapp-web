import React, { useEffect, useState } from "react";
import LeftPanel from "./components/leftpanel/LeftPanel";
import MiddlePanel from "./components/middlepanel/MiddlePanel";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserStatus,
  getChats,
  resetState,
  setName,
  setOnlineUsers,
} from "./state/user/userSlice";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { getOnlineUsers } from "./api/socket";
const App = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const initializeUserData = async () => {};
  useEffect(() => {
    if (user.name) {
      const sock = io("ws://localhost:3002", {
        query: {
          name: user.name,
        },
      });
      setSocket(sock);
    } else {
      navigate("/");
      dispatch(resetState());
    }
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on(user.name, () => {
        console.log(user);
        // dispatch(getChats(user.selectedUser.name));
      });
      socket.on("onlineUsers", (arg) => {
        if (arg.length) dispatch(checkUserStatus());
      });
    }
  }, [socket]);
  return (
    <div className="flex h-screen w-screen">
      <LeftPanel />
      {user.selectedUser?.name ? (
        <MiddlePanel />
      ) : (
        <div className="bg-panel-header-background w-[70%]"></div>
      )}
    </div>
  );
};

export default App;
