import React, { useCallback } from "react";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import NewChatIcon from "../../icons/NewChatIcon";
import MenuIcon from "../../icons/MenuIcon";
import BackIcon from "../../icons/BackIcon";
import Contact from "./Contact";
import { useDispatch, useSelector } from "react-redux";
import { left } from "../../state/panel/panelSlice";
import NewChat from "./NewChat";
const LeftPanel = () => {
  const leftValue = useSelector((state) => state.panel.left);
  const dispatch = useDispatch();
  console.log(leftValue);
  const render = useCallback(() => {
    switch (leftValue) {
      case "newChat":
        return <NewChat />;

      default:
        return (
          <>
            <div className="h-[10%] bg-panel-header-background flex justify-between items-center p-5">
              <div>
                <EmptyProfileIcon />
              </div>
              <div className="flex gap-5">
                <div>
                  <NewChatIcon onClick={() => dispatch(left("newChat"))} />
                </div>
                <div>
                  <MenuIcon />
                </div>
              </div>
            </div>
            <div className="h-[10%] p-2">
              <input
                className="bg-gray-100 w-full rounded-lg p-2 outline-none"
                placeholder="Enter name"
              />
            </div>
            <div className="h-[80%] overflow-y-scroll">
              {new Array(30).fill(0).map((d) => (
                <Contact />
              ))}
            </div>
          </>
        );
    }
  }, [leftValue]);
  return <div className="h-full w-full">{render()}</div>;
};

export default LeftPanel;
