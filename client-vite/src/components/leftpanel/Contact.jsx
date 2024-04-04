import React from "react";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import { useDispatch } from "react-redux";
import { getSelectedUserChats } from "../../state/user/userSlice";
import { left } from "../../state/panel/panelSlice";

const Contact = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(getSelectedUserChats(user.name));
        dispatch(left(""));
      }}
      className="flex w-full items-center hover:bg-gray-100 cursor-pointer"
    >
      <div className="p-2">
        <EmptyProfileIcon size={50} />
      </div>
      <div className="w-full p-2 flex-col border-t ">
        <div className="flex justify-between items-center">
          <div>{user.name}</div>
          <div className="text-xs"></div>
        </div>
        <div className="flex justify-between items-center">
          <div>status</div>
          <div className="bg-unread-marker-background rounded-full w-6 pl-2 text-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
