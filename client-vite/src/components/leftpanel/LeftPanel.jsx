import React, { useCallback, useEffect } from "react";
import StatusIcon from "../../icons/StatusIcon.jsx";
import FilterIcon from "../../icons/FilterIcon.jsx";
import data from "../../data/data.js";
import InputWithSearchAndBackIcon from "../input/InputWithSearchAndBackIcon.jsx";
import NewChatIcon from "../../icons/NewChatIcon.jsx";
import { useDispatch, useSelector } from "react-redux";
import { left } from "../../state/panel/panelSlice.js";
import { setName, setSocket } from "../../state/user/userSlice.js";
import BackIcon from "../../icons/BackIcon.jsx";
import Contact from "../contact/Contact.jsx";
import MenuIcon from "../../icons/MenuIcon.jsx";
import Popper from "../popper/Popper.jsx";
import { useNavigate } from "react-router-dom";
const LeftPanel = () => {
  const navigate = useNavigate();
  const leftValue = useSelector((state) => state.panel.left);
  const dispatch = useDispatch();
  const render = useCallback(() => {
    switch (leftValue) {
      case "newChat":
        return (
          <>
            <div className="h-[20%] bg-panel-background-colored flex items-end">
              <div className="flex items-center gap-5 p-5">
                <div>
                  <BackIcon onClick={() => dispatch(left(""))} />
                </div>
                <div className="text-lg text-white font-bold">New chat</div>
              </div>
            </div>
            <div className="h-[10%] p-2 flex items-center">
              <InputWithSearchAndBackIcon />
            </div>
            <div className="h-[70%] overflow-y-scroll">
              {new Array(30).fill(0).map((contact) => (
                <Contact />
              ))}
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="h-[10%]">
              <div className="px-5 h-full flex justify-between items-center bg-panel-header-background">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={data.loggedInUser.url} />
                  </div>
                </div>
                <div className="flex gap-3">
                  <StatusIcon />
                  <NewChatIcon onClick={() => dispatch(left("newChat"))} />
                  <Popper
                    content={
                      <div className="flex flex-col py-2">
                        <div
                          onClick={() => {
                            sessionStorage.removeItem("name");
                            dispatch(setName(""));
                            dispatch(setSocket(null));
                            navigate("/");
                          }}
                          className="hover:bg-gray-100 px-5 py-2"
                        >
                          Logout
                        </div>
                      </div>
                    }
                    clickCotent={<MenuIcon />}
                    className="rounded  w-40"
                    direction="dropdown-end"
                  />
                </div>
              </div>
            </div>
            <div className="h-[10%]">
              <div className="flex h-full px-1 gap-2 justify-between items-center">
                <div className="w-full">
                  <InputWithSearchAndBackIcon />
                </div>
                <div>
                  <FilterIcon />
                </div>
              </div>
            </div>
            <div className="h-[80%] overflow-y-scroll">
              {new Array(30).fill(0).map((contact, i) => (
                <Contact key={i} />
              ))}
            </div>
          </>
        );
    }
  }, [leftValue]);
  return <div className="w-[30%]">{render()}</div>;
};

export default LeftPanel;
