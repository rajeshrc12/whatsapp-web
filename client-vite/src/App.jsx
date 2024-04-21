import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      const skt = io("ws://localhost:3002", {
        query: {
          email,
        },
      });
    } else {
      navigate("/login");
    }
  }, []);
  return <div>App</div>;
};

export default App;
