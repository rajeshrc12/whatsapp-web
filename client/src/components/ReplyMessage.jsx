import moment from "moment";
import React from "react";

const ReplyMessage = ({ chat }) => {
  const renderMessage = (chat) => {
    console.log(chat);
    switch (chat.type) {
      case "image":
        return (
          <div>
            <img src={chat.url} height={200} width={200} />
          </div>
        );
      case "video":
        return (
          <video controls width="250">
            <source src={chat.url} type="video/webm" />
            <source src={chat.url} type="video/mp4" />
            Download the
            <a href={chat.url}>WEBM</a>
            or
            <a href={chat.url}>MP4</a>
            video.
          </video>
        );
      default:
        return (
          <div className={`p-1 max-w-[40vw] bg-white m-2 rounded-lg`}>
            {chat.message}
            {moment(chat.updatedAt).format("LT")}
          </div>
        );
    }
  };
  return (
    <div className="bg-red-50 p-2">
      <div className="flex justify-between items-center gap-5">
        <div>
          <div>{chat.content.to}</div>
          <div>
            {chat.content.type === "text"
              ? chat.content.message
              : chat.content.type}
          </div>
        </div>
        <div className="flex">
          {chat.content.type !== "text" && renderMessage(chat.content)}
        </div>
      </div>
      <div className="p-2">{chat.message}</div>
    </div>
  );
};

export default ReplyMessage;
