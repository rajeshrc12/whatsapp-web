import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="bg-gray-200 p-10">
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="username"
          />
        </div>
        <div>
          <button
            onClick={() => {
              if (name.trim()) {
                sessionStorage.setItem("username", name.trim());
                navigate("/home");
              }
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
