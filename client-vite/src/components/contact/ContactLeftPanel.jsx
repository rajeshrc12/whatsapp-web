import React from "react";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import { useDispatch } from "react-redux";
import {
  getChats,
  getUserContacts,
  setSelectedUser,
} from "../../state/user/userSlice";

const ContactLeftPanel = ({ user, name }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(getChats(user.name.join("")));
      }}
      className="flex px-2 gap-2 hover:bg-gray-100 cursor-pointer w-full"
    >
      <div className="flex items-center">
        <div>
          <EmptyProfileIcon size={50} />
        </div>
      </div>
      <div className="flex flex-col border-t-[1px] w-full justify-start py-3">
        <div className="flex justify-between items-center">
          <div>{user.name.join("")}</div>
          <div className="text-xs">7:12 pm</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-input-border">Status</div>
          {user.unseenCount > 0 && (
            <div className="bg-unread-marker-background text-white rounded-full px-[7px]">
              {user.unseenCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactLeftPanel;
