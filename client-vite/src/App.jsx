import React from "react";
import LeftPanel from "./components/leftpanel/LeftPanel";
import MiddlePanel from "./components/middlepanel/MiddlePanel";

const App = () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="border w-[30%]">
        <LeftPanel />
      </div>
      <div className="border w-[70%]">
        <MiddlePanel />
      </div>
    </div>
  );
};

export default App;
