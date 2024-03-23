import React, { useCallback, useState } from "react";
import data from "../../data/data";

const MediaPreviewTabs = ({}) => {
  const [activeTab, setActiveTab] = useState("Media");
  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case "Docs":
        return (
          <div className="flex flex-col px-10 py-2">
            <div className="flex flex-col w-full border rounded-lg bg-white">
              <div className="h-[10vh]">Test.pdf</div>
              <div>Message</div>
            </div>
          </div>
        );
      case "Links":
        return <>Links</>;
      default:
        return (
          <div className="flex flex-wrap justify-around gap-2 p-2">
            {new Array(30).fill(0).map((i) => (
              <div
                style={{
                  flexBasis: "120px",
                  flexGrow: "0",
                  flexShrink: "0",
                  backgroundImage: `url(${data.loggedInUser.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                className={`h-28 rounded-lg border-[7px] border-[#d1d7db] transition`}
              ></div>
            ))}
          </div>
        );
    }
  }, [activeTab]);
  return (
    <div className="h-full w-full">
      <div className="h-[10%]">
        <div className="flex text-sm h-full">
          {["Media", "Docs", "Links"].map((tab) => (
            <div
              onClick={() => setActiveTab(tab)}
              key={tab}
              style={{ flexGrow: 1, flexBasis: 0 }}
              className={`flex items-center justify-center cursor-pointer ${
                activeTab === tab
                  ? "border-b-[4px] border-panel-background-colored text-panel-background-colored"
                  : "border-b-[1px] text-poll-checkbox-default-border-color-sender"
              }`}
            >
              <div>{tab}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[90%] overflow-y-scroll">{renderTabContent()}</div>
    </div>
  );
};

export default MediaPreviewTabs;
