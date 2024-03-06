import React from "react";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import { FaArrowLeft } from "react-icons/fa6";
import SelectContact from "./SelectContact";
import Profile from "../images/profile.png";
import { IoMdClose } from "react-icons/io";

const ForwardModal = ({ id }) => {
  return (
    <Modal
      id={id}
      width={30}
      content={
        <div className="flex flex-col">
          <div className="p-3 text-xl flex gap-5 bg-[#008069] text-white">
            <IoMdClose
              size={25}
              onClick={() => document.getElementById(id).close()}
            />
            Forward message to
          </div>
          <div className="p-3">
            <SearchBar
              placeholder={"Search..."}
              icon={<FaArrowLeft size="20" />}
            />
          </div>
          <div className="text-lg p-3">RECENT CHATS</div>
          <div className="h-[35vh] p-3 overflow-y-scroll">
            {new Array(10).fill(0).map((d) => (
              <SelectContact />
            ))}
          </div>
          <div className="flex gap-2 p-2">
            <div>
              <img
                src={Profile}
                height={90}
                width={90}
                className="rounded-xl"
              />
            </div>
            <div className="w-full">
              <textarea className="w-full h-full outline-none bg-gray-50 resize-none rounded-sm"></textarea>
            </div>
          </div>
          <div className="flex justify-between p-3">
            <div>Rajehs, Mahesh</div>
            <div>
              <svg
                viewBox="-4 -4 32 32"
                height="40"
                width="40"
                preserveAspectRatio="xMidYMid meet"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>send</title>
                <rect
                  x="-4"
                  y="-4"
                  width="32"
                  height="32"
                  fill="#00a884"
                  rx="16"
                  ry="16"
                ></rect>
                <path
                  fill="#fff"
                  transform="scale(0.7) translate(6,6)"
                  d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default ForwardModal;
