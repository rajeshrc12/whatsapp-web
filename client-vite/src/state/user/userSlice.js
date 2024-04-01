import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  socket: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setName, setSocket } = userSlice.actions;
export default userSlice.reducer;
