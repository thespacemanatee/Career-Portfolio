/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const tasksAdapter = createEntityAdapter({
  selectId: (task) => task["Task ID"],
});

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState(),
  reducers: {
    addTask: tasksAdapter.addOne,
    removeTask: tasksAdapter.removeOne,
  },
});

// Action creators are generated for each case reducer function
export const { addTask, removeTask } = tasksSlice.actions;

export default tasksSlice.reducer;
