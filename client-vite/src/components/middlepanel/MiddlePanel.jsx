import React from "react";
import WhatsaAppBG from "../../data/whatsapp.png";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import TickIcon from "../../icons/TickIcon";
const MiddlePanel = () => {
  return (
    <div className="h-full">
      <div className="h-[10%] bg-panel-header-background p-2">
        <div className="flex gap-3">
          <div>
            <EmptyProfileIcon />
          </div>
          <div className="flex flex-col">
            <div>Rajesh</div>
            <div className="text-sm text-input-border">
              last seen at 7:12 pm
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-[80%] bg-panel-header-background overflow-y-scroll"
        style={{ backgroundImage: `url(${WhatsaAppBG})` }}
      >
        <div className="flex flex-col gap-2 relative z-0 px-10">
          <div className="flex justify-center sticky top-2 z-10">
            <div className="bg-white shadow-sm rounded-lg text-xs px-3 py-2">
              01/01/2024
            </div>
          </div>
          {new Array(30).fill(0).map((d, i) => (
            <div key={i} className="flex justify-end">
              <div className="flex items-end bg-outgoing-background p-2 rounded-lg gap-2">
                <div className="text-sm">Hello</div>
                <div className="text-xs text-input-border">7:12 pm</div>
                <div>
                  <TickIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[10%] bg-panel-header-background p-2">
        <input
          className="bg-white w-full rounded-lg p-2 outline-none"
          placeholder="Enter message"
        />
      </div>
    </div>
  );
};

export default MiddlePanel;
