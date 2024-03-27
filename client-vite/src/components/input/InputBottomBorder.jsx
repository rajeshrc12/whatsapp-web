import React, { useState } from "react";

const InputBottomBorder = ({ placeholder = "" }) => {
  const [value, setValue] = useState("");
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      className="w-full bg-white border-b-[1px] focus:border-b-[1px] border-input-border p-1 outline-none focus:border-panel-background-colored"
    />
  );
};

export default InputBottomBorder;
