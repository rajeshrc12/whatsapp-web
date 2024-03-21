import React, { useCallback } from "react";
import { useSelector } from "react-redux";

const RightPanel = () => {
  const rightValue = useSelector((state) => state.panel.right);
  const render = useCallback(() => {
    switch (rightValue) {
      case "userProfile":
        return (
          <div className="w-[30%] overflow-y-scroll">
            {new Array(30).fill(0).map((d) => (
              <div>hello</div>
            ))}
          </div>
        );
      default:
        return <></>;
    }
  }, [rightValue]);
  return render();
};

export default RightPanel;
