import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: { name: "", contacts: [] },
  selectedUser: { name: "", lastSeen: "", chats: [] },
  newChatUsers: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.newChatUsers = action.payload;
    });
    builder.addCase(getSelectedUserChats.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
    });
    builder.addCase(getSelectedUserLastSeen.fulfilled, (state, action) => {
      state.selectedUser.lastSeen = action.payload;
    });
    builder.addCase(getCurrentUserContacts.fulfilled, (state, action) => {
      state.currentUser.contacts = action.payload;
    });
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.selectedUser.chats = action.payload;
    });
  },
});
export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const result = await axios.get(`http://localhost:3001/users`);
      return result.data.filter(
        (user) => user.name !== state.user.currentUser.name
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const getSelectedUserChats = createAsyncThunk(
  "getSelectedUserChats",
  async (name, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const selectedUserName = name || state.user.selectedUser.name || "";
      let chats = [],
        lastSeen = "offline";
      if (state.user.currentUser.name && selectedUserName) {
        await axios.get(
          `http://localhost:3001/seenall/${state.user.currentUser.name}/${selectedUserName}`
        );
        chats = await axios.get(
          `http://localhost:3001/chats/${state.user.currentUser.name}/${selectedUserName}`
        );
        lastSeen = await axios.get(
          `http://localhost:3001/getonlineuser/${selectedUserName}`
        );
        await axios.post(`http://localhost:3001/openprofile`, {
          name: state.user.currentUser.name,
          openProfile: selectedUserName,
        });
      }
      return {
        name: selectedUserName,
        lastSeen: lastSeen.data,
        chats: chats.data,
      };
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const fetchChats = createAsyncThunk(
  "fetchChats",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let chats = [];
      if (state.user.currentUser.name && state.user.selectedUser.name) {
        const result = await axios.get(
          `http://localhost:3001/chats/${state.user.currentUser.name}/${state.user.selectedUser.name}`
        );
        chats = result.data;
      }
      return chats;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const getSelectedUserLastSeen = createAsyncThunk(
  "getSelectedUserLastSeen",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let lastSeen = state.user.selectedUser.lastSeen;
      if (state.user.selectedUser.name) {
        const result = await axios.get(
          `http://localhost:3001/getonlineuser/${state.user.selectedUser.name}`
        );
        lastSeen = result.data;
      }
      return lastSeen;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCurrentUserContacts = createAsyncThunk(
  "getCurrentUserContacts",
  async (name, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const currentUserName = name || state.user.currentUser.name || "";
      let contacts = [];
      if (currentUserName) {
        const result = await axios.get(
          `http://localhost:3001/usercontacts/${currentUserName}`
        );
        contacts = result.data;
      }
      return contacts;
    } catch (error) {
      console.log(error);
    }
  }
);

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
