import React from "react";
import data from "../../data/data";
import Search from "../../icons/Search";
import Menu from "../../icons/Menu";
import EmojiPicker from "emoji-picker-react";
import emojis from "../../data/data-by-group";
const MiddlePanel = () => {
  return (
    <div className="grid grid-rows-12 h-full">
      <div className="row-span-1 bg-panel-header-background">
        <div className="flex h-full px-5 justify-between items-center">
          <div className="flex items-center gap-3">
            <div>
              <img
                src={data.loggedInUser.url}
                className="w-10"
                style={{ borderRadius: "100%" }}
                alt=""
              />
            </div>
            <div className="text-sm">
              <div>Rajesh</div>
              <div>Last seen</div>
            </div>
          </div>
          <div className="flex gap-5">
            <Search />
            <Menu />
          </div>
        </div>
      </div>
      <div className="row-span-4 bg-green-100"></div>
      <div className="row-span-6 bg-panel-header-background">
        <div className="grid grid-rows-6 h-full">
          <div className="row-span-1 border"></div>
          <div className="row-span-1 border"></div>
          <div className="row-span-4 border">
            <div className="flex w-full p-3">
              {emojis.map((emoji) => (
                <div>{emoji.emoji}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-1 bg-panel-header-background">
        <div className="flex"></div>
      </div>
    </div>
  );
};

export default MiddlePanel;
