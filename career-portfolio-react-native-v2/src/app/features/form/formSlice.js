/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    input_title: null,
    onet_title: null,
    title_id: null,
  },
  reducers: {
    addSelection: (state, action) => {
      const { inputTitle, onetTitle, titleId } = action.payload;
      state.input_title = inputTitle;
      state.onet_title = onetTitle;
      state.title_id = titleId;
    },
  },
});

export const { addSelection } = formSlice.actions;

export default formSlice.reducer;
