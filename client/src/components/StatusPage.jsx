import React, { useCallback, useEffect, useRef, useState } from "react";

import Video from "../images/video.mp4";
import Video1 from "../images/video1.mp4";
import Profile from "../images/profile.png";
import Profile1 from "../images/whatsapp_back.jpeg";

import { CgSmileMouthOpen } from "react-icons/cg";
import { IoDocumentOutline } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const StatusPage = ({ setMiddlePanel, chat }) => {
  const [inputFocus, setInputFocus] = React.useState(false);
  const [media, setMedia] = useState([
    { type: "image", content: Profile },
    { type: "image", content: Profile1 },
    { type: "video", content: Video },
    { type: "video", content: Video1 },
  ]);
  const [index, setIndex] = useState(0);
  const addImages = async () => {
    for (const [index, values] of media.entries()) {
      console.log(values.content);
      await new Promise((resolve) =>
        setTimeout(() => {
          setIndex(index);
          resolve();
        }, 1000)
      );
    }
  };
  useEffect(() => {
    addImages();
  }, []);
  const renderMedia = useCallback(() => {
    switch (media[index].type) {
      case "image":
        return <img src={media[index].content} height={500} width={500} />;
      case "video":
        return <video src={media[index].content} controls width="250"></video>;
      default:
        return "Media not supported";
    }
  }, [index]);
  return (
    <div className="flex justify-center relative">
      <div
        style={{
          // backgroundImage: `url('${image}')`,
          width: "30vw",
          height: "100vh",
        }}
      >
        <div>{renderMedia()}</div>
        <div className="absolute bottom-5 left-1/4 flex flex-col items-center">
          {inputFocus && (
            <div className="flex gap-5 m-3">
              <CgSmileMouthOpen size={50} color="#a8a8a8" />
              <CgSmileMouthOpen size={50} color="#a8a8a8" />
              <CgSmileMouthOpen size={50} color="#a8a8a8" />
              <CgSmileMouthOpen size={50} color="#a8a8a8" />
            </div>
          )}
          <div
            className={`flex p-5 gap-5 items-center w-full ${
              inputFocus && "bg-[#ececec] rounded-2xl"
            }`}
            style={{ width: "50vw" }}
          >
            <div>
              <CgSmileMouthOpen size={30} color="#a8a8a8" />
            </div>
            <div>
              <IoDocumentOutline size={30} color="#a8a8a8" />
            </div>
            <div className="w-full">
              <input
                type="text"
                className={`outline-none rounded-lg p-2 w-full ${
                  !inputFocus && "bg-black opacity-50"
                }`}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                placeholder="Type a reply..."
              />
            </div>
            <div>
              <IoMdSend size={30} color="#a8a8a8" />
            </div>
          </div>
        </div>
        <FaArrowLeft
          onClick={() => setMiddlePanel("")}
          className="absolute top-0 left-0 m-5"
          size={20}
          color="#ffffff"
        />
        <ImCross
          onClick={() => setMiddlePanel("")}
          className="absolute top-0 right-0 m-5"
          size={20}
          color="#ffffff"
        />
        <IoIosArrowBack
          className="absolute top-1/2 left-0 m-5"
          size={30}
          color="#ffffff"
        />
        <IoIosArrowForward
          className="absolute top-1/2 right-0 m-5"
          size={30}
          color="#ffffff"
        />
      </div>
    </div>
  );
};

export default StatusPage;
