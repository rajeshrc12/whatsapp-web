import React from "react";

const VideoIcon = ({ onClick = () => {}, size = "24" }) => {
  return (
    <svg
      viewBox="0 0 16 20"
      height={size}
      width={size}
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
      onClick={onClick}
    >
      <title>status-video</title>
      <path
        className="fill-input-border"
        d="M15.243,5.868l-3.48,3.091v-2.27c0-0.657-0.532-1.189-1.189-1.189H1.945 c-0.657,0-1.189,0.532-1.189,1.189v7.138c0,0.657,0.532,1.189,1.189,1.189h8.629c0.657,0,1.189-0.532,1.189-1.189v-2.299l3.48,3.09 V5.868z"
      ></path>
    </svg>
  );
};

export default VideoIcon;
