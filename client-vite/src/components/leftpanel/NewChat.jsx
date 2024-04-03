import React from "react";
import BackIcon from "../../icons/BackIcon";
import Contact from "./Contact";
import { useDispatch } from "react-redux";
import { left } from "../../state/panel/panelSlice";

const NewChat = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="h-[20%] bg-panel-background-colored flex flex-col justify-end">
        <div className="flex p-5 gap-5">
          <div>
            <BackIcon onClick={() => dispatch(left(""))} />
          </div>
          <div className="font-bold text-white">New chat</div>
        </div>
      </div>
      <div className="h-[10%] p-2">
        <input
          className="bg-gray-100 w-full rounded-lg p-2 outline-none"
          placeholder="Enter name"
        />
      </div>
      <div className="h-[70%] overflow-y-scroll">
        {new Array(30).fill(0).map((d) => (
          <Contact />
        ))}
      </div>
    </>
  );
};

export default NewChat;
