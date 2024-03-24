import React, { useCallback, useEffect, useState } from "react";
import LeftPanel from "./components/leftpanel/LeftPanel";
import MiddlePanel from "./components/middlepanel/MiddlePanel";
import RightPanel from "./components/rightpanel/RightPanel";
import { useSelector } from "react-redux";
import MediaPreview from "./components/mainpanel/MediaPreview";
import ForwardModal from "./components/forward/ForwardModal";

const App = () => {
  const mainValue = useSelector((state) => state.panel.main);

  const render = useCallback(() => {
    switch (mainValue) {
      case "mediaPreview":
        return <MediaPreview />;
      case "forwardModal":
        return <ForwardModal />;
      default:
        return <></>;
    }
  }, [mainValue]);
  return (
    <div className="flex h-screen w-screen">
      <LeftPanel />
      <MiddlePanel />
      <RightPanel />
      {render()}
    </div>
  );
};

export default App;
