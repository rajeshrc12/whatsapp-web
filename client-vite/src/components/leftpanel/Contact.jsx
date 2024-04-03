import React from "react";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";

const Contact = () => {
  return (
    <div className="flex w-full items-center">
      <div className="p-2">
        <EmptyProfileIcon size={50} />
      </div>
      <div className="w-full p-2 flex-col border-t ">
        <div className="flex justify-between items-center">
          <div>name</div>
          <div className="text-xs"></div>
        </div>
        <div className="flex justify-between items-center">
          <div></div>
          <div className="bg-unread-marker-background rounded-full w-6 pl-2 text-white">
            1
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
