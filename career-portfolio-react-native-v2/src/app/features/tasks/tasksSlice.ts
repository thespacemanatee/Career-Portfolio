/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import type { RootState } from "../../store";
import { TaskObject } from "../../../types";

const tasksAdapter = createEntityAdapter<TaskObject>({
  selectId: (task: TaskObject) => task.taskId,
});

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState(),
  reducers: {
    setAllTasks: tasksAdapter.setAll,
    addTask: tasksAdapter.updateOne,
    removeTask: tasksAdapter.updateOne,
    updateTaskType: tasksAdapter.updateOne,
    addLifeTask: tasksAdapter.upsertOne,
    removeLifeTask: tasksAdapter.removeOne,
    resetLifeTasks: tasksAdapter.removeMany,
  },
});

export const {
  setAllTasks,
  addTask,
  removeTask,
  updateTaskType,
  addLifeTask,
  removeLifeTask,
  resetLifeTasks,
} = tasksSlice.actions;

export const tasksSelector = tasksAdapter.getSelectors(
  (state: RootState) => state.tasks
);

export default tasksSlice.reducer;
