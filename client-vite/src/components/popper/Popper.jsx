import React from "react";

const Popper = ({
  className = "",
  direction = "dropdown-end",
  content = <></>,
  clickCotent = <></>,
}) => {
  return (
    <div className={`dropdown ${direction}`}>
      <div tabIndex={0} className="cursor-pointer">
        {clickCotent}
      </div>
      <div
        tabIndex={0}
        className={`dropdown-content z-[1] shadow bg-white ${className}`}
      >
        {content}
      </div>
    </div>
  );
};

export default Popper;
