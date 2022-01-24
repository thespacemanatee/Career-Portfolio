import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type JobClass = {
  title: string;
  socCode: number[];
};

interface JobClassState {
  jobClasses: JobClass[];
}

const initialState: JobClassState = {
  jobClasses: [],
};

const JobClassSlice = createSlice({
  name: "jobClass",
  initialState,
  reducers: {
    setJobClasses: (state, action: PayloadAction<JobClass[]>) => {
      state.jobClasses = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { setJobClasses, resetState } = JobClassSlice.actions;

export const { reducer } = JobClassSlice;
