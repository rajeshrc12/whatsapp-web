import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  getCurrentUserContacts,
  setCurrentUserName,
} from "./state/user/userSlice";
import { io } from "socket.io-client";
import BackIcon from "./icons/BackIcon";
import NewChatIcon from "./icons/NewChatIcon";
const App = () => {
  const user = useSelector((state) => state.user);
  const panel = useSelector((state) => state.panel);
  const dispatch = useDispatch((state) => state.user);
  const [socket, setSocket] = useState(null);
  console.clear();
  console.log(user, panel);
  useEffect(() => {
    const name = sessionStorage.getItem("name");
    if (name) {
      dispatch(setCurrentUserName(name));
      dispatch(getCurrentUserContacts(name));
      dispatch(getAllUsers());

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
  return (
    <div className="flex h-screen w-screen">
      <div className="w-[30%] border flex flex-col">
        {panel.left ? (
          <div className="h-full">
            <div className="h-[10%] border flex justify-between">
              <div>
                <BackIcon />
              </div>
              <div>Start a chat</div>
            </div>
            <div className="h-[90%] border">
              {user.newChatUsers.map((user) => (
                <div className="p-2">{user.name}</div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full">
            <div className="h-[10%] border flex justify-between">
              <div>{user.currentUser.name}</div>
              <div>
                <NewChatIcon />
              </div>
            </div>
            <div className="h-[90%] border">
              {user.currentUser.contacts.map((user) => (
                <div className="p-2">{user.name}</div>
              ))}
            </div>
          </div>
        )}
      </div>
      {user.selectedUser.name && (
        <div className="w-[70%] border">
          <div className="h-[10%]">1</div>
          <div className="h-[80%]">2</div>
          <div className="h-[10%]">3</div>
        </div>
      )}
    </div>
  );
};

export default App;
