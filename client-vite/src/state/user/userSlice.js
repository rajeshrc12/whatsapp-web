import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  name: null,
  onlineUsers: [],
  selectedUser: null,
  chats: [],
  allUsers: [],
  userContacts: [],
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
    builder.addCase(getUserContacts.fulfilled, (state, action) => {
      state.userContacts = action.payload;
    });
    builder.addCase(getChats.fulfilled, (state, action) => {
      state.chats = action.payload.chats;
      state.selectedUser = action.payload.selectedUser;
      state.userContacts = action.payload.userContacts;
    });
    builder.addCase(checkUserStatus.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
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

export const getUserContacts = createAsyncThunk(
  "getUserContacts",
  async (name) => {
    try {
      const result = await axios.get(
        `http://localhost:3001/usercontacts/${name}`
      );
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const getChats = createAsyncThunk(
  "getChats",
  async (selectedUser, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const result = await axios.get(
        `http://localhost:3001/chats/${state.user.name}/${selectedUser}`
      );
      const userContacts = await axios.get(
        `http://localhost:3001/usercontacts/${state.user.name}`
      );
      const lastSeen = await axios.get(
        `http://localhost:3001/getonlineuser/${selectedUser}`
      );
      console.log(lastSeen.data);
      return {
        chats: result.data,
        selectedUser: { name: selectedUser, lastSeen: lastSeen.data },
        userContacts: userContacts.data,
      };
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const checkUserStatus = createAsyncThunk(
  "checkUserStatus",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      console.log(state);
      const lastSeen = await axios.get(
        `http://localhost:3001/getonlineuser/${state.user.selectedUser.name}`
      );
      return { name: state.user.selectedUser.name, lastSeen: lastSeen.data };
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const {
  setName,
  setOnlineUsers,
  setSelectedUser,
  setUserChats,
  resetState,
} = userSlice.actions;
export default userSlice.reducer;
