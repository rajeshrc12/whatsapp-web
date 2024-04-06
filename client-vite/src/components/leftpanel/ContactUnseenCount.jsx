import React from "react";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import { useDispatch } from "react-redux";
import {
  getCurrentUserContacts,
  getSelectedUserChats,
} from "../../state/user/userSlice";
const ContactUnseenCount = ({ contact, selectedUserName }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        const name = contact.name.join("") || "";
        if (name !== selectedUserName) dispatch(getSelectedUserChats(name));
        dispatch(getCurrentUserContacts());
      }}
      className="flex w-full items-center hover:bg-gray-100 cursor-pointer"
    >
      <div className="p-2">
        <EmptyProfileIcon size={50} />
      </div>
      <div className="w-full p-2 flex-col border-t ">
        <div className="flex justify-between items-center">
          <div>{contact.name.join("") || ""}</div>
          <div className="text-xs"></div>
        </div>
        <div className="flex justify-between items-center">
          <div></div>
          {contact.unseenCount > 0 && (
            <div className="bg-unread-marker-background rounded-full w-6 pl-2 text-white">
              {contact.unseenCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUnseenCount;
