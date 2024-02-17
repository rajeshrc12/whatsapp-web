import React from "react";

const ChatBox = ({ chatBoxData, setChatBoxData }) => {
  return (
    <input
      type="text"
      value={chatBoxData}
      onChange={(e) => setChatBoxData(e.target.value)}
      className="outline-none p-2 w-full rounded-lg bg-white"
      placeholder="Type a message"
    />
  );
};

export default ChatBox;
