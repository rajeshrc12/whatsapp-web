import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import Status from "./Status";
import Main from "./Main";
const LeftPanel = () => {
  const leftValue = useSelector((state) => state.panel.left);
  const render = useCallback(() => {
    switch (leftValue) {
      case "status":
        return <Status />;
      default:
        return <Main />;
    }
  }, [leftValue]);
  return render();
};

export default LeftPanel;
