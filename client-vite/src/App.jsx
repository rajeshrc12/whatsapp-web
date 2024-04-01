import React, { useEffect } from "react";
import LeftPanel from "./components/leftpanel/LeftPanel";
import MiddlePanel from "./components/middlepanel/MiddlePanel";
import { useDispatch } from "react-redux";
import { setName, setSocket } from "./state/user/userSlice";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionStorage.getItem("name")) {
      const socket = io("ws://localhost:3002", {
        query: {
          name: sessionStorage.getItem("name"),
        },
      });
      dispatch(setName(sessionStorage.getItem("name")));
      dispatch(setSocket(socket));
    } else {
      navigate("/");
      dispatch(setName(""));
      dispatch(setSocket(null));
    }
  }, []);
  return (
    <div className="flex h-screen w-screen">
      <LeftPanel />
      <MiddlePanel />
    </div>
  );
};

export default App;
