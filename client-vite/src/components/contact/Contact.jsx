import React from "react";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../state/user/userSlice";

const Contact = ({ user = { name: "", lastSeen: "" } }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() =>
        dispatch(setSelectedUser({ name: user.name, status: "offline" }))
      }
      key={user.name}
      className="flex px-2 gap-2 hover:bg-gray-100 cursor-pointer"
    >
      <div className="flex items-center">
        <div>
          <EmptyProfileIcon size={50} />
        </div>
      </div>
      <div className="flex flex-col border-t-[1px] w-full justify-start py-3">
        <div>{user.name}</div>
        <div className="text-sm text-input-border">{user.lastSeen}</div>
      </div>
    </div>
  );
};

export default Contact;
