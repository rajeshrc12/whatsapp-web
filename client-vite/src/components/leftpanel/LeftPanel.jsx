import React from "react";
import StatusIcon from "../../icons/StatusIcon.jsx";
import MenuIcon from "../../icons/MenuIcon.jsx";
import FilterIcon from "../../icons/FilterIcon.jsx";
import data from "../../data/data.js";
import InputWithSearchAndBackIcon from "../input/InputWithSearchAndBackIcon.jsx";
const LeftPanel = () => {
  return (
    <div className="w-[30%]">
      <div className="h-[10%]">
        <div className="px-5 h-full flex justify-between items-center bg-panel-header-background">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={data.loggedInUser.url} />
            </div>
          </div>
          <div className="flex gap-3">
            <StatusIcon />
            <MenuIcon />
          </div>
        </div>
      </div>
      <div className="h-[10%]">
        <div className="flex h-full px-1 gap-2 justify-between items-center">
          <div className="w-full">
            <InputWithSearchAndBackIcon />
          </div>
          <div>
            <FilterIcon />
          </div>
        </div>
      </div>
      <div className="h-[80%] overflow-y-scroll">
        {new Array(30).fill(0).map((d) => (
          <div>hello</div>
        ))}
      </div>
    </div>
  );
};

export default LeftPanel;
