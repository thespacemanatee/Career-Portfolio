/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const localSlice = createSlice({
  name: "tasks",
  initialState: {
    verbs: null,
    occupations: null,
  },
  reducers: {
    setVerbs: (state, action) => {
      state.verbs = action.payload;
    },
    setOccupations: (state, action) => {
      state.occupations = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVerbs, setOccupations } = localSlice.actions;

export default localSlice.reducer;
