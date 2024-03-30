import React from "react";
import LeftPanel from "./components/leftpanel/LeftPanel";
import MiddlePanel from "./components/middlepanel/MiddlePanel";

const App = () => {
  return (
    <div className="flex h-screen w-screen">
      <LeftPanel />
      <MiddlePanel />
    </div>
  );
};

export default App;
