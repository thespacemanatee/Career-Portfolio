/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocalState {
  verbs: string[];
  occupations: string[];
}

const initialState: LocalState = {
  verbs: null,
  occupations: null,
};

export const localSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setVerbs: (state, action: PayloadAction<any>) => {
      state.verbs = action.payload;
    },
    setOccupations: (state, action: PayloadAction<any>) => {
      state.occupations = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVerbs, setOccupations } = localSlice.actions;

export default localSlice.reducer;
