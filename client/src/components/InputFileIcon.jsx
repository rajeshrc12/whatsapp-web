import React from "react";

const InputFileIcon = ({
  icon,
  setFiles = () => {},
  files = [],
  setBolbFiles = () => {},
  blobFiles = [],
  callback = () => {},
  multiple = true,
}) => {
  return (
    <div>
      <label className="cursor-pointer" for="file-input">
        {icon}
      </label>
      <input
        multiple={multiple}
        id="file-input"
        onChange={(e) => {
          e.preventDefault();
          callback();
          setBolbFiles([...blobFiles, ...e.target.files]);
          setFiles([
            ...files,
            ...Array.from(e.target.files).map((file) =>
              URL.createObjectURL(file)
            ),
          ]);
        }}
        className="hidden"
        type="file"
      />
    </div>
  );
};

export default InputFileIcon;
