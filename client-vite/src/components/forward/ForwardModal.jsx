import React, { useState } from "react";
import ReactModal from "../reactmodal/ReactModal";
import CancelIcon from "../../icons/CancelIcon";
import { useDispatch } from "react-redux";
import { main } from "../../state/panel/panelSlice";
import InputWithSearchAndBackIcon from "../input/InputWithSearchAndBackIcon";
import data from "../../data/data";
import SendIcon from "../../icons/SendIcon";
const ForwardModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const onRequestClose = () => {
    dispatch(main(""));
  };
  return (
    <ReactModal
      content={
        <div className="flex flex-col h-full">
          <div className="h-[10%] flex gap-3 items-center bg-panel-background-colored p-2">
            <div>
              <CancelIcon onClick={onRequestClose} color="#fff" />
            </div>
            <div className="font-bold text-lg text-white">
              Forward message to
            </div>
          </div>
          <div className="h-[10%] full rounded-lg p-2">
            <InputWithSearchAndBackIcon />
          </div>
          <div className="h-[55%] overflow-y-scroll border-y-[1px]">
            <div className="text-sm p-5 text-panel-background-colored">
              RECENT CHATS
            </div>
            {new Array(30).fill(0).map((d) => (
              <div className="flex items-center gap-5 px-5">
                <input
                  type="checkbox"
                  className="accent-panel-background-colored w-6 h-6"
                />
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={data.loggedInUser.url} />
                  </div>
                </div>
                <div className="flex flex-col py-3 w-full border-t-[1px]">
                  <div className="text-sm">My jio</div>
                  <div className="text-xs">message yourself</div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-[20%] flex p-1 gap-2">
            <div
              style={{
                flexBasis: "80px",
                flexGrow: "0",
                flexShrink: "0",
                backgroundImage: `url(${data.loggedInUser.url})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderRadius: "5px",
              }}
              className="h-full"
            ></div>
            <textarea
              placeholder="Add a message"
              className="outline-none resize-none text-sm p-2 w-full h-full bg-panel-header-background rounded-lg"
            />
          </div>
          <div className="h-[15%]">
            <div className="flex justify-between items-center h-full p-2">
              <div>Rajesh</div>
              <div className=" bg-[#00a884] p-3 rounded-full">
                <SendIcon />
              </div>
            </div>
          </div>
        </div>
      }
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      styles={{ width: "35vw", height: "95vh" }}
    />
  );
};

export default ForwardModal;
