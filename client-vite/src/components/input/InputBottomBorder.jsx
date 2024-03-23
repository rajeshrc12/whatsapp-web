import React, { useState } from "react";

const InputBottomBorder = () => {
  const [value, setValue] = useState("");
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="bg-white border-b-[2px] p-1 outline-none focus:border-poll-bar-fill-sender"
    />
  );
};

export default InputBottomBorder;
