import React, { useState } from "react";
import data from "../../data/data";

const ReactionTab = () => {
  const tabs = [
    { name: "mob_rajesh", emoji: "0x1F600" },
    { name: "mob_mahesh", emoji: "0x1F600" },
    { name: "mob_ganesh", emoji: "0x1F601" },
  ];
  const tabsgroup = Object.entries(Object.groupBy(tabs, ({ emoji }) => emoji));
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="flex flex-col w-full h-[30vh]">
      <div className="flex border-b-[1px] w-full">
        <div
          onClick={() => setSelectedIndex(0)}
          className={`p-1 gap-1 cursor-pointer ${
            selectedIndex === 0 && "border-b-[2px] border-poll-bar-fill-sender"
          } flex`}
        >
          <div>All</div>
          <div>{tabs.length}</div>
        </div>
        {tabsgroup.map((tab, i) => (
          <div
            onClick={() => {
              setSelectedIndex(i + 1);
              console.log(i + 1);
            }}
            className={`py-1 px-3 gap-1 cursor-pointer ${
              selectedIndex === i + 1 &&
              "border-b-[2px] border-poll-bar-fill-sender"
            } flex`}
          >
            <div>{String.fromCodePoint(tab[0])}</div>
            <div>{tab[1].length}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col p-2">
        {selectedIndex === 0
          ? tabs.map((tab) => (
              <div className="flex justify-between gap-2">
                <div>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={data.loggedInUser.url} />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    {tab.name === data.loggedInUser.mobile ? "You" : tab.name}
                  </div>
                  {tab.name === data.loggedInUser.mobile && (
                    <div className="text-xs font-thin">Click to remove</div>
                  )}
                </div>
                <div>{String.fromCodePoint(tab.emoji)}</div>
              </div>
            ))
          : tabsgroup[selectedIndex - 1][1].map((tab) => (
              <div className="flex justify-between gap-2">
                <div>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={data.loggedInUser.url} />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    {tab.name === data.loggedInUser.mobile ? "You" : tab.name}
                  </div>
                  {tab.name === data.loggedInUser.mobile && (
                    <div className="text-xs font-thin">Click to remove</div>
                  )}
                </div>
                <div>{String.fromCodePoint(tab.emoji)}</div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ReactionTab;
