import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Status from "../icons/Status";
import { left } from "../state/panel/panelSlice";
const LeftPanel = () => {
  const leftValue = useSelector((state) => state.panel.left);
  const dispatch = useDispatch();
  const render = useCallback(() => {
    switch (leftValue) {
      case "status":
        return <div>status</div>;
      default:
        return (
          <div className="grid h-full grid-rows-6">
            <div className="border row-span-1">icons</div>
            <div className="border row-span-5 overflow-y-scroll"></div>
          </div>
        );
    }
  }, [leftValue]);
  return render();
};

export default LeftPanel;
