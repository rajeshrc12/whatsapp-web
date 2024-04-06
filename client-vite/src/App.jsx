import React, { useEffect, useState } from "react";
import LeftPanel from "./components/leftpanel/LeftPanel";
import MiddlePanel from "./components/middlepanel/MiddlePanel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchChats,
  getCurrentUserContacts,
  getSelectedUserChats,
  getSelectedUserLastSeen,
  setCurrentUser,
} from "./state/user/userSlice";
import { io } from "socket.io-client";
const App = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const name = sessionStorage.getItem("name");
    if (name) {
      dispatch(setCurrentUser({ name }));
      dispatch(getCurrentUserContacts(name));
      const skt = io("ws://localhost:3002", {
        query: {
          name,
        },
      });
      setSocket(skt);
    } else {
      navigate("/");
    }
  }, [sessionStorage]);
  useEffect(() => {
    if (socket) {
      socket.on(sessionStorage.getItem("name"), (arg) => {
        dispatch(fetchChats());
        dispatch(getCurrentUserContacts());
      });
      socket.on("onlineUsers", (arg) => {
        if (arg.length) dispatch(getSelectedUserLastSeen());
      });
    }
  }, [socket]);
  return (
    <div className="flex h-screen w-screen">
      <div className="border w-[30%]">
        <LeftPanel />
      </div>
      <div className="border w-[70%]">
        {user.selectedUser.name ? (
          <MiddlePanel />
        ) : (
          <div className="bg-panel-header-background h-full"></div>
        )}
      </div>
    </div>
  );
};

export default App;
