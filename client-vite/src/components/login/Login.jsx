import React, { useEffect, useState } from "react";
import WhatsaAppBG from "../../data/whatsapp.png";
import SendIcon from "../../icons/SendIcon";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUserName } from "../../state/user/userSlice";
const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionStorage.getItem("name")) {
      dispatch(setCurrentUserName(sessionStorage.getItem("name")));
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [sessionStorage]);
  return (
    <div
      className="h-screen w-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${WhatsaAppBG})` }}
    >
      <div className="h-[50%] w-96 rounded-lg bg-white shadow">
        <div className="flex flex-col h-full w-full justify-center items-center">
          <div className="w-full">
            <div className="px-5">
              <input
                className="bg-gray-100 w-full rounded-lg p-2 outline-none"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div className="flex h-full justify-center items-center">
              <div className="bg-poll-bar-fill-sender p-5 rounded-full">
                <SendIcon
                  onClick={() => {
                    if (value.trim()) {
                      sessionStorage.setItem("name", value);
                      navigate("/home");
                      dispatch(setCurrentUserName(value));
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
