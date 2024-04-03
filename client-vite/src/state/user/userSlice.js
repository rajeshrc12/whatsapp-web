import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  name: null,
  onlineUsers: [],
  selectedUser: null,
  chats: [],
  allUsers: [],
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
    resetState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
    });
    builder.addCase(getChats.fulfilled, (state, action) => {
      console.log("fetching chat completed");
      state.chats = action.payload;
    });
  },
});

export const getAllUsers = createAsyncThunk("getAllUsers", async (name) => {
  try {
    const result = await axios.get(`http://localhost:3001/users`);
    return result.data.filter((user) => user.name !== name);
  } catch (error) {
    console.log(error);
    return [];
  }
});

export const getChats = createAsyncThunk("getChats", async (name) => {
  try {
    const result = await axios.get(`http://localhost:3001/chat/${name}`);
    return result.data.map((chat) => ({
      name: chat.users.find((user) => user !== name),
      chats: chat.chats,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
});

export const {
  setName,
  setOnlineUsers,
  setSelectedUser,
  setUserChats,
  resetState,
} = userSlice.actions;
export default userSlice.reducer;
