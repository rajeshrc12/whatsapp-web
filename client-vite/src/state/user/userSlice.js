import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  onlineUsers: [],
  selectedUser: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setName, setOnlineUsers, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
