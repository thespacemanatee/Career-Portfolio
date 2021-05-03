/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const tasksAdapter = createEntityAdapter({
  selectId: (task) => task.taskId,
});

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState(),
  reducers: {
    setAllTasks: tasksAdapter.setAll,
    addTask: tasksAdapter.updateOne,
    removeTask: tasksAdapter.updateOne,
    updateTaskType: tasksAdapter.updateOne,
  },
});

// Action creators are generated for each case reducer function
export const {
  setAllTasks,
  addTask,
  removeTask,
  updateTaskType,
} = tasksSlice.actions;

export const tasksSelector = tasksAdapter.getSelectors((state) => state.tasks);

export default tasksSlice.reducer;
