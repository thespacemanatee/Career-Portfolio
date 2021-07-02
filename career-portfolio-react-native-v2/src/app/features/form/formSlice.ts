/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  input_title: string;
  onet_title: string;
  title_id: string;
}

const initialState: FormState = {
  input_title: null,
  onet_title: null,
  title_id: null,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addSelection: (state, action: PayloadAction<any>) => {
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
