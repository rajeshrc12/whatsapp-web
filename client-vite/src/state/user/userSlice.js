import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  onlineUsers: [],
  selectedUser: null,
  chats: [],
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
    setUserChats: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export const { setName, setOnlineUsers, setSelectedUser, setUserChats } =
  userSlice.actions;
export default userSlice.reducer;
