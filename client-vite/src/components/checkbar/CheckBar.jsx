import React, { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import data from "../../data/data";
const CheckBar = ({
  people = 1,
  size = 12,
  answer = "",
  answers = {},
  setAnswers = () => {},
  selectedUsers = [],
  type = "multiple",
}) => {
  return (
    <div className="flex items-start gap-1 w-full">
      <div
        onClick={() => {
          const temp = { ...answers };
          if (type === "single")
            for (const ans of Object.keys(temp)) {
              temp[ans] = false;
            }
          setAnswers({ ...temp, [answer]: !answers[answer] });
        }}
        className={`cursor-pointer rounded-full m-1 inline-block ${
          answers[answer]
            ? "bg-poll-bar-fill-sender border-[2px] border-poll-bar-fill-sender"
            : "bg-outgoing-background border-[2px] border-poll-checkbox-default-border-color-sender"
        } r`}
      >
        <IoMdCheckmark
          size={size}
          color="#fff"
          className={answers[answer] ? "visible" : "invisible"}
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
                ? (selectedUsers.length / people) * 100 + "%"
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
