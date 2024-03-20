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
    deleteAllFiles: (state) => {
      state = initialState;
    },
    deleteFileByIndex: (state, action) => {
      state.blobFiles.splice(action.payload, 1);
    },
  },
});

export const { addFiles, deleteAllFiles, deleteFileByIndex } =
  filesSlice.actions;
export default filesSlice.reducer;
