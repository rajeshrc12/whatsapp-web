import React, { useEffect, useRef, useState } from "react";

import ProfileImg from "../images/profile.png";
import ProgessBar from "./ProgessBar";
import { CgSmileMouthOpen } from "react-icons/cg";
import { IoDocumentOutline } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const StatusPage = ({ setMainMenuView }) => {
  const [inputFocus, setInputFocus] = React.useState(false);
  const [intervals, setIntervals] = useState([20, 30, 40, 60, 90, 98]);
  // Example intervals array: [20, 30, 40] milliseconds
  console.log(ProfileImg);
  return (
    <div className="flex justify-center bg-black relative">
      <div
        style={{
          backgroundImage: `url('${ProfileImg}')`,
          width: "30vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${intervals.length}, 1fr)`,
          }}
        >
          <ProgessBar intervals={intervals} />
        </div>
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
          onClick={() => setMainMenuView("")}
          className="absolute top-0 left-0 m-5"
          size={20}
          color="#ffffff"
        />
        <ImCross
          onClick={() => setMainMenuView("")}
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
