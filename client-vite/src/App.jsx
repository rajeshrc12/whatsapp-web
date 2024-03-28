// import React, { useCallback, useEffect, useState } from "react";
// import LeftPanel from "./components/leftpanel/LeftPanel";
// import MiddlePanel from "./components/middlepanel/MiddlePanel";
// import RightPanel from "./components/rightpanel/RightPanel";
// import { useSelector } from "react-redux";
// import MediaPreview from "./components/mainpanel/MediaPreview";
// import ForwardModal from "./components/forward/ForwardModal";
// import PollModal from "./components/poll/PollModal";

// const App = () => {
//   const mainValue = useSelector((state) => state.panel.main);

//   const render = useCallback(() => {
//     switch (mainValue) {
//       case "mediaPreview":
//         return <MediaPreview />;
//       case "forwardModal":
//         return <ForwardModal />;
//       case "pollModal":
//         return <PollModal />;
//       default:
//         return <></>;
//     }
//   }, [mainValue]);
//   return (
//     <div className="flex h-screen w-screen">
//       <LeftPanel />
//       <MiddlePanel />
//       <RightPanel />
//       {render()}
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const App = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState({ name: "", status: "" });
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      const getData = async () => {
        const result = await axios.get("http://localhost:3001/u");
        const registeredUsers = result.data.registeredUsers.filter(
          (u) => u.name !== sessionStorage.getItem("username")
        );
        setSelectedUser({
          name: registeredUsers[0].name,
          status: result.data.connectedUsers.find(
            (user) => user.name === registeredUsers[0].name
          )
            ? "Online"
            : "Offline",
        });
        setUsers(registeredUsers);
        const soc = io("ws://localhost:3002", {
          query: {
            username: sessionStorage.getItem("username"),
          },
        });
        console.log("already connected users", result.data.connectedUsers);
        setSocket(soc);
      };
      getData();
    } else {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("client", (arg) => {
        const newConnectedUsers = arg
          .filter((a) => a.name !== sessionStorage.getItem("username"))
          .map((a) => a.name);

        setSelectedUser({
          ...selectedUser,
          status: newConnectedUsers.includes(selectedUser.name)
            ? "Online"
            : "Offline",
        });

        console.log("new connected users", newConnectedUsers);
      });
    }
  }, [socket]);
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="h-[80vh] w-full flex">
        <div className="w-[40%] border">
          <div className="h-full">
            <div className="h-[20%] border">
              {sessionStorage.getItem("username")}
            </div>
            <div className="h-[80%] border overflow-y-scroll">
              {users.map((user) => (
                <div
                  key={user.name}
                  className={`p-3 ${
                    user.name === selectedUser.name
                      ? "border border-red-500"
                      : ""
                  }`}
                  onClick={async () => {
                    const response = await axios.get(
                      "http://localhost:3001/connectedusers"
                    );
                    const isSelectedUserOnline = response.data.find(
                      (onlineUser) => onlineUser.name === user.name
                    );
                    setSelectedUser({
                      name: user.name,
                      status: isSelectedUserOnline ? "Online" : "Offline",
                    });
                  }}
                >
                  {user.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[60%] border">
          <div className="h-full">
            <div className="h-[10%] border">
              {" "}
              <div>
                {selectedUser.name}({selectedUser.status})
              </div>
            </div>
            <div className="h-[80%] border overflow-y-scroll"></div>
            <div className="h-[10%] border">
              <div className="flex h-full">
                <input
                  type="text"
                  className="w-full h-full"
                  placeholder="message"
                />
                <button>Send</button>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={async () => {
            navigate("/");
            const name = sessionStorage.getItem("username");
            sessionStorage.removeItem("username");
            await axios.get(`http://localhost:3001/logout/${name}`);
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default App;
