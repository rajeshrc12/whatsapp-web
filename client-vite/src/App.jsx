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
  return (
    <div>
      <button
        onClick={() => {
          localStorage.removeItem("email");
          navigate("/login");
        }}
      >
        logout
      </button>
    </div>
  );
};

export default App;
