import React from "react";
import StatusIcon from "../../icons/StatusIcon.jsx";
import MenuIcon from "../../icons/MenuIcon.jsx";
import SearchIcon from "../../icons/FilterIcon.jsx";
import FilterIcon from "../../icons/SearchIcon.jsx";
import data from "../../data/data.js";
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
          <div className="flex rounded-lg p-1 w-full bg-panel-header-background">
            <div className="px-5">
              <FilterIcon />
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Search or start new chat"
                className="outline-none bg-panel-header-background w-full"
              />
            </div>
          </div>
          <div>
            <SearchIcon />
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
