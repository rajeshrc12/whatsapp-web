import React from "react";
import Profile from "../images/profile.png";
const SelectContact = ({ name, setForwardUserList, forwardUserList }) => {
  const checkUser = (e) => {
    if (e.target.checked) {
      setForwardUserList([...forwardUserList, name]);
    } else {
      setForwardUserList(forwardUserList.filter((user) => user !== name));
    }
  };
  return (
    <div className="flex w-full items-center gap-5 ">
      <div>
        <input
          type="checkbox"
          checked={forwardUserList.includes(name)}
          onChange={checkUser}
          className="w-4 h-4"
        />
      </div>
      <div className="flex items-center gap-3 border-t-[1px] w-full">
        <div>
          <img
            className="rounded-[3rem]"
            src={Profile}
            height={50}
            width={50}
          />
        </div>
        <div className="py-3">
          <div>{name}</div>
          <div>Status</div>
        </div>
      </div>
    </div>
  );
};

export default SelectContact;
