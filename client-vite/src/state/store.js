import { configureStore } from "@reduxjs/toolkit";
import panelReducer from "./panel/panelSlice";
import filesReducer from "./files/filesSlice";

export const store = configureStore({
  reducer: {
    panel: panelReducer,
    files: filesReducer,
  },
});
