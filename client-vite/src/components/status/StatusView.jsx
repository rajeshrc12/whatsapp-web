import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { main } from "../../state/panel/panelSlice";

const StatusView = ({ media }) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const dispatch = useDispatch();

  let count = 0,
    indexCount = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      if (count <= 100) {
        setPercent(count);
        count++;
      } else {
        indexCount++;
        if (indexCount < media.length) {
          count = 0;
          setStatusIndex(indexCount);
        } else {
          clearInterval(interval);
          dispatch(main(""));
        }
      }
    }, 50);
  }, []);
  return (
    <div
      className="flex h-screen w-screen fixed top-0 left-0 bg-black"
      style={{
        backgroundImage: `url(${media[statusIndex]})`,
        backgroundSize: "contain",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-[30%]"></div>
      <div className="w-[40%] flex gap-1 p-5">
        {media.map((_, i) => (
          <progress
            className="w-full"
            value={statusIndex === i ? percent : statusIndex > i ? 100 : 0}
            max={100}
          />
        ))}
      </div>
      <div className="w-[30%]"></div>
    </div>
  );
};

export default StatusView;
