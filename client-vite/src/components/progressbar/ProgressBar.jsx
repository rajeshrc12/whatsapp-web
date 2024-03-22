import React, { useEffect, useState } from "react";

const ProgressBar = ({ value = "0" }) => {
  const [percent, setPercent] = useState(value);
  useEffect(() => {
    setPercent(value);
  }, [value]);
  console.log(percent);
  return (
    <div className="w-full h-2 rounded-lg bg-poll-bar-container-sender">
      <div
        style={{ width: percent }}
        className={`h-full bg-poll-bar-fill-sender rounded-lg`}
      ></div>
    </div>
  );
};

export default ProgressBar;
