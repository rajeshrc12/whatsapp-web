import { configureStore } from "@reduxjs/toolkit";
import panelReducer from "./panel/panelSlice";
import filesReducer from "./files/filesSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    panel: panelReducer,
    files: filesReducer,
    user: userReducer,
  },
});
