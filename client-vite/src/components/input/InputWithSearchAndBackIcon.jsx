import React, { useState } from "react";
import SearchIcon from "../../icons/SearchIcon";
import BackIcon from "../../icons/BackIcon";

const InputWithSearchAndBackIcon = () => {
  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);
  return (
    <div className="flex rounded-lg p-1 w-full bg-panel-header-background">
      <div className="px-5">
        {focus ? (
          <BackIcon className="fill-panel-background-colored" />
        ) : (
          <SearchIcon />
        )}
      </div>
      <div className="w-full">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setFocus(false);
            setValue("");
          }}
          type="text"
          placeholder="Search or start new chat"
          className="outline-none bg-panel-header-background w-full"
        />
      </div>
    </div>
  );
};

export default InputWithSearchAndBackIcon;
