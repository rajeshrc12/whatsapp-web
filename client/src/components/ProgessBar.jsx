import React, { useEffect, useState } from "react";

const ProgessBar = ({ intervals }) => {
  const [progressBars, setProgressBars] = useState(
    new Array(intervals.length).fill(0)
  );
  const [currentBarIndex, setCurrentBarIndex] = useState(0);

  useEffect(() => {
    if (currentBarIndex < intervals.length) {
      const intervalId = setInterval(() => {
        setProgressBars((currentProgressBars) => {
          const updatedProgressBars = [...currentProgressBars];
          if (updatedProgressBars[currentBarIndex] < 100) {
            updatedProgressBars[currentBarIndex] += 1; // Increment progress
          } else {
            clearInterval(intervalId); // Stop current bar's interval
            setCurrentBarIndex((current) => current + 1); // Move to next bar
          }
          return updatedProgressBars;
        });
      }, intervals[currentBarIndex]); // Use current bar's interval time

      return () => clearInterval(intervalId); // Cleanup interval
    }
  }, [currentBarIndex, intervals]); // Dependencies

  return (
    <>
      {progressBars.map((progress, index) => (
        <div
          key={index}
          className="bg-gray-300 rounded-full h-2 dark:bg-gray-700 m-1"
        >
          <div
            className="bg-white h-2 rounded-full"
            style={{ width: `${progress}%`, transition: "width 0.2s linear" }}
          ></div>
        </div>
      ))}
    </>
  );
};

export default ProgessBar;
