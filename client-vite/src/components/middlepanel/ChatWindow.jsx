import React from "react";
import data from "../../data/data";

const ChatWindow = () => {
  const chats = data.chats;

  return <div>{chats.map((chat) => {})}</div>;
};

export default ChatWindow;
