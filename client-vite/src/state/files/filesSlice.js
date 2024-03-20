import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blobFiles: [],
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addFiles: (state, action) => {
      const allFiles = [...state.blobFiles, ...action.payload];
      state.blobFiles = allFiles;
    },
    deleteFiles: (state) => {
      state = initialState;
    },
  },
});

export const { addFiles, deleteFiles } = filesSlice.actions;
export default filesSlice.reducer;
