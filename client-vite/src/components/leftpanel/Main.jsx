import React from "react";
import StatusIcon from "../../icons/Status";
import Menu from "../../icons/Menu";
import data from "../../data/data";
import Search from "../../icons/Search";
import Filter from "../../icons/Filter";
const Main = () => {
  return (
    <div className="grid h-full grid-rows-6">
      <div className="row-span-1 h-full overflow-clip border-b-[1px]">
        <div className="grid grid-rows-2 h-full">
          <div className="px-5 flex justify-between items-center bg-panel-header-background">
            <div>
              <img
                src={data.loggedInUser.url}
                className="w-10"
                style={{ borderRadius: "100%" }}
                alt=""
              />
            </div>
            <div className="flex gap-3">
              <StatusIcon />
              <Menu />
            </div>
          </div>
          <div className="flex px-1 gap-2 justify-between items-center">
            <div className="flex rounded-lg p-1 w-full bg-panel-header-background">
              <div className="px-5">
                <Search />
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
              <Filter />
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-5 overflow-y-scroll">
        {new Array(30).fill(0).map((d) => (
          <div>yup</div>
        ))}
      </div>
    </div>
  );
};

export default Main;
