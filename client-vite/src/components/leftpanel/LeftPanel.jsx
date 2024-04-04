import React, { useCallback, useEffect, useState } from "react";
import EmptyProfileIcon from "../../icons/EmptyProfileIcon";
import NewChatIcon from "../../icons/NewChatIcon";
import MenuIcon from "../../icons/MenuIcon";
import { useDispatch, useSelector } from "react-redux";
import { left } from "../../state/panel/panelSlice";
import NewChat from "./NewChat";
import { setCurrentUser } from "../../state/user/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContactUnseenCount from "./ContactUnseenCount";
const LeftPanel = () => {
  const navigate = useNavigate();
  const leftValue = useSelector((state) => state.panel.left);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const render = useCallback(() => {
    switch (leftValue) {
      case "newChat":
        return <NewChat />;

      default:
        return (
          <>
            <div className="h-[10%] bg-panel-header-background flex justify-between items-center p-5">
              <div>
                <EmptyProfileIcon />
              </div>
              <div className="flex gap-5">
                <div>
                  <NewChatIcon onClick={() => dispatch(left("newChat"))} />
                </div>
                <div>
                  <MenuIcon
                    onClick={async () => {
                      try {
                        navigate("/");
                        sessionStorage.removeItem("name");
                        await axios.get(
                          `http://localhost:3001/logout/${user.currentUser.name}`
                        );
                        dispatch(setCurrentUser({ name: "" }));
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="h-[10%] p-2">
              <input
                className="bg-gray-100 w-full rounded-lg p-2 outline-none"
                placeholder="Enter name"
              />
            </div>
            <div className="h-[80%] overflow-y-scroll">
              {user?.currentUser?.contacts?.map((contact) => (
                <ContactUnseenCount
                  contact={contact}
                  key={contact.name.join("")}
                />
              ))}
            </div>
          </>
        );
    }
  }, [leftValue, user]);
  return <div className="h-full w-full">{render()}</div>;
};

export default LeftPanel;
