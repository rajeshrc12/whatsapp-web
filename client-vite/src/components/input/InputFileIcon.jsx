import React from "react";

const InputFileIcon = ({
  icon = <></>,
  callback = () => {},
  multiple = true,
  accept = "",
}) => {
  return (
    <div>
      <label className="cursor-pointer" htmlFor="file-input">
        {icon}
      </label>
      <input
        multiple={multiple}
        id="file-input"
        onChange={(e) => {
          e.preventDefault();
          callback(e);
        }}
        className="hidden"
        type="file"
        accept={accept}
      />
    </div>
  );
};

export default InputFileIcon;
