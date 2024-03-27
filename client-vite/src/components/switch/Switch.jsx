import React, { useState } from "react";

const Switch = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="flex justify-center items-end h-full relative"
      onClick={() => setChecked(!checked)}
    >
      <div
        className={`w-8 h-4 ${
          checked ? "bg-switch-track-checked-color" : "bg-switch-track-color"
        } rounded-lg`}
      ></div>
      <div
        className={`w-5 h-5 rounded-full ${
          checked
            ? "bg-panel-background-colored right-0"
            : "bg-switch-button-color left-0"
        } absolute top-[5px]`}
      ></div>
    </div>
  );
};

export default Switch;
