import React, { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import data from "../../data/data";
const CheckBar = ({
  size = 12,
  answer = "",
  answers = {},
  setAnswers = () => {},
  selectedUsers = [],
}) => {
  console.log(selectedUsers, data.loggedInUser.mobile);
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-start gap-1 w-full">
      <div
        onClick={() => {
          setChecked(!checked);
          setAnswers({ ...answers, [answer]: !checked });
        }}
        className={`cursor-pointer rounded-full m-1 inline-block ${
          checked
            ? "bg-poll-bar-fill-sender border-[2px] border-poll-bar-fill-sender"
            : "bg-outgoing-background border-[2px] border-poll-checkbox-default-border-color-sender"
        } r`}
      >
        <IoMdCheckmark
          size={size}
          color="#fff"
          className={checked ? "visible" : "invisible"}
        />
      </div>
      <div className="flex flex-col w-full px-2">
        <div className="flex justify-between">
          <div>{answer}</div>
          <div>{selectedUsers.length}</div>
        </div>
        <div className="w-full h-2 rounded-lg bg-poll-bar-container-sender">
          <div
            style={{
              width: selectedUsers.includes(data.loggedInUser.mobile)
                ? "100%"
                : "0%",
            }}
            className={`h-full bg-poll-bar-fill-sender rounded-lg`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CheckBar;
