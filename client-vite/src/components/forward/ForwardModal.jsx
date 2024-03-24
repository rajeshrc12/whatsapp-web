import React, { useState } from "react";
import ReactModal from "../reactmodal/ReactModal";
import CancelIcon from "../../icons/CancelIcon";
import { useDispatch } from "react-redux";
import { main } from "../../state/panel/panelSlice";
import InputWithSearchAndBackIcon from "../input/InputWithSearchAndBackIcon";
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
          <div className="h-[70%] overflow-y-scroll">
            <div className="text-sm p-5 text-panel-background-colored">
              RECENT CHATS
            </div>
          </div>
          <div className="h-[10%]"></div>
        </div>
      }
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      styles={{ width: "35vw", height: "90vh" }}
    />
  );
};

export default ForwardModal;
