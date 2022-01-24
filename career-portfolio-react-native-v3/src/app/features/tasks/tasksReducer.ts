import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface TasksState {
  tasks: number[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<number[]>) => {
      state.tasks = action.payload;
    },
    removeFirstTask: (state) => {
      state.tasks.splice(0, 1);
    },
    resetState: () => initialState,
  },
});

export const { setTasks, removeFirstTask, resetState } = tasksSlice.actions;

export const { reducer } = tasksSlice;
