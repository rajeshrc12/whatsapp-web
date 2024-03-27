import React from "react";
import { useDispatch } from "react-redux";
import ReactModal from "../reactmodal/ReactModal";
import CancelIcon from "../../icons/CancelIcon";
import InputBottomBorder from "../input/InputBottomBorder";
import Switch from "../switch/Switch";
import SendIcon from "../../icons/SendIcon";
import { main } from "../../state/panel/panelSlice";

const PollModal = () => {
  const dispatch = useDispatch();
  const onRequestClose = () => {
    dispatch(main(""));
  };
  return (
    <ReactModal
      content={
        <div className="flex flex-col h-full">
          <div className="h-[10%] font-bold bg-panel-background-colored text-white flex gap-3 p-4">
            <div>
              <CancelIcon color="#fff" onClick={() => dispatch(main(""))} />
            </div>
            <div>Create Poll</div>
          </div>
          <div className="h-[10%] font-medium p-4">Question</div>
          <div className="h-[10%] p-4">
            <InputBottomBorder placeholder="Ask question" />
          </div>
          <div className="h-[10%] font-medium p-4">Options</div>
          <div className="h-[35%] p-4 overflow-y-scroll flex flex-col gap-10">
            {new Array(30).fill(0).map((d) => (
              <div>
                <InputBottomBorder placeholder="Add" />
              </div>
            ))}
          </div>
          <div className="h-[10%] p-4 flex justify-between">
            <div>Allow multiple answer</div>
            <div>
              <Switch />
            </div>
          </div>
          <div className="h-[15%] p-4 flex justify-end">
            <div>
              <div className=" bg-[#00a884] p-3 rounded-full">
                <SendIcon />
              </div>
            </div>
          </div>
        </div>
      }
      isOpen={true}
      onRequestClose={onRequestClose}
      styles={{ width: "25rem", height: "95vh" }}
    />
  );
};

export default PollModal;
