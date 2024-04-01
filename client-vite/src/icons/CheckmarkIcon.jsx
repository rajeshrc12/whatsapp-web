import React from "react";
import iconColors from "./colors";

const CheckmarkIcon = ({ onClick = () => {} }) => {
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 24 24"
      height="24"
      width="24"
      preserveAspectRatio="xMidYMid meet"
      className=""
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 24 24"
    >
      <title>checkmark</title>
      <path
        fill={iconColors.panelHeaderIcon}
        d="M9,17.2l-4-4l-1.4,1.3L9,19.9L20.4,8.5L19,7.1L9,17.2z"
      ></path>
    </svg>
  );
};

export default CheckmarkIcon;
