import React, { useEffect } from "react";
import LeftPanel from "./components/leftpanel/LeftPanel";
import MiddlePanel from "./components/middlepanel/MiddlePanel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "./state/user/userSlice";

const App = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionStorage.getItem("name")) {
      dispatch(setCurrentUser({ name: sessionStorage.getItem("name") }));
    } else {
      navigate("/");
    }
  }, [sessionStorage.getItem("name")]);
  return (
    <div className="flex h-screen w-screen">
      <div className="border w-[30%]">
        <LeftPanel />
      </div>
      <div className="border w-[70%]">
        <MiddlePanel />
      </div>
    </div>
  );
};

export default App;
