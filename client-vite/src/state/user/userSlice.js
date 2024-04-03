import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: { name: "" },
  selectedUser: { name: "", lastSeen: "" },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
