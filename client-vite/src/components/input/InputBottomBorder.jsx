import React, { useState } from "react";

const InputBottomBorder = ({
  placeholder = "",
  borderWidth = 1,
  value = "",
  setValue = () => {},
}) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      className={`w-full bg-white border-b-[${borderWidth}px] focus:border-b-[${borderWidth}px] border-input-border p-1 outline-none focus:border-panel-background-colored`}
    />
  );
};

export default InputBottomBorder;
