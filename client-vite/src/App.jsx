import React, { useCallback } from "react";
import LeftPanel from "./components/leftpanel/LeftPanel";
import RightPanel from "./components/rightpanel/RightPanel";
import MiddlePanel from "./components/middlepanel/MiddlePanel";
import { useSelector } from "react-redux";
const App = () => {
  const mainValue = useSelector((state) => state.panel.main);
  const render = useCallback(() => {
    switch (mainValue) {
      case "status":
        return <div className="fixed h-screen w-screen bg-white">Status</div>;
      case "showRightPanel":
        return (
          <>
            <div className="border col-span-3 overflow-y-scroll">
              <MiddlePanel />
            </div>
            <div className="border col-span-2 overflow-y-scroll">
              <RightPanel />
            </div>
          </>
        );
      default:
        return (
          <div className="border col-span-5 overflow-y-scroll">
            <MiddlePanel />
          </div>
        );
    }
  }, [mainValue]);
  return (
    <div className="grid grid-cols-7 h-screen w-screen">
      <div className="border col-span-2 overflow-hidden">
        <LeftPanel />
      </div>
      {render()}
    </div>
  );
};

export default App;
