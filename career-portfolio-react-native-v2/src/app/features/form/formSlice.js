/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input_title: null,
  onet_title: null,
  title_id: null,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addSelection: (state, action) => {
      const { inputTitle, onetTitle, titleId } = action.payload;
      state.input_title = inputTitle;
      state.onet_title = onetTitle;
      state.title_id = titleId;
    },
    resetState: () => initialState,
  },
});

export const { addSelection, resetState } = formSlice.actions;

export default formSlice.reducer;
