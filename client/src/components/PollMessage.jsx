import React from "react";
import PollAnswer from "./PollAnswer";

const PollMessage = ({ chat, currentUser, selectedUser }) => {
  return (
    <div className="flex flex-col bg-white w-80">
      <div className="font-bold px-3">{chat.message.question}</div>
      <div className="px-3">
        {chat.message.multiAnswer ? "Select one or more" : "Select one"}
      </div>
      {chat?.message?.answers?.map((ans) => (
        <PollAnswer
          ans={ans}
          chatId={chat._id}
          currentUser={currentUser}
          selectedUser={selectedUser}
        />
      ))}
    </div>
  );
};

export default PollMessage;
