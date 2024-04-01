import React from "react";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";

const Contact = () => {
  return (
    <div className="flex px-2 gap-2">
      <div className="flex items-center">
        <div>
          <EmptyProfileIcon size={50} />
        </div>
      </div>
      <div className="flex flex-col border-t-[1px] w-full justify-start py-3">
        <div>Rajesh</div>
        <div className="text-sm text-input-border">
          last seen today at 7.15 pm
        </div>
      </div>
    </div>
  );
};

export default Contact;
