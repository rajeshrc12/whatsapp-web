import React from "react";
import { useDispatch } from "react-redux";
import { addFiles } from "../../state/files/filesSlice";

const InputFileIcon = ({
  icon = <></>,
  callback = () => {},
  multiple = true,
}) => {
  const dispatch = useDispatch();
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
          dispatch(addFiles(e.target.files));
          callback();
        }}
        className="hidden"
        type="file"
      />
    </div>
  );
};

export default InputFileIcon;
