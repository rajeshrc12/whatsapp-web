import { configureStore } from "@reduxjs/toolkit";
import panelReducer from "./panel/panelSlice";

export const store = configureStore({
  reducer: {
    panel: panelReducer,
  },
});
