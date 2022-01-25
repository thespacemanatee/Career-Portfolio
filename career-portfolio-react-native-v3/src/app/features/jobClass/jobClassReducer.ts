import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type JobClass = {
  title: string;
  socCodes: number[];
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
    resetJobClassState: () => initialState,
  },
});

export const { setJobClasses, resetJobClassState } = JobClassSlice.actions;

export const { reducer } = JobClassSlice;
