import React from "react";
import LeftPanel from "./components/leftpanel/LeftPanel";
import MiddlePanel from "./components/middlepanel/MiddlePanel";
import RightPanel from "./components/rightpanel/RightPanel";

const App = () => {
  return (
    <div className="flex h-screen w-screen">
      <LeftPanel />
      <MiddlePanel />
      <RightPanel />
    </div>
  );
};

export default App;
