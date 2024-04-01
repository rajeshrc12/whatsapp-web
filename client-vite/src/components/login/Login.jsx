import React from "react";
import WhatsaAppBG from "../../data/whatsapp.png";
import WhatsAppLogo from "../../icons/WhatsAppLogo";
import InputBottomBorder from "../input/InputBottomBorder";
import SendIcon from "../../icons/SendIcon";
const Login = () => {
  return (
    <div
      className="h-screen w-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${WhatsaAppBG})` }}
    >
      <div className="h-[50%] w-96 rounded-lg bg-white shadow">
        <div className="flex flex-col h-full w-full justify-center items-center">
          <div className="w-full">
            <div className="px-5">
              <InputBottomBorder borderWidth={2} placeholder="Enter name" />
              <InputBottomBorder borderWidth={2} placeholder="Enter name" />
              <InputBottomBorder borderWidth={2} placeholder="Enter name" />
            </div>
            <div className="flex h-full justify-center items-center">
              <div className="bg-poll-bar-fill-sender p-5 rounded-full">
                <SendIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
