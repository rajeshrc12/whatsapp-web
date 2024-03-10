import React from "react";
import { IoMdClose } from "react-icons/io";
const Reply = ({ chat, renderMessage }) => {
  return (
    <div className="flex justify-between bg-red-50 p-5 w-full">
      <div>
        <div>{chat.to}</div>
        <div>{chat.type === "text" ? chat.message : chat.type}</div>
      </div>
      <div className="flex">{chat.type !== "text" && renderMessage(chat)}</div>
    </div>
  );
};

export default Reply;
