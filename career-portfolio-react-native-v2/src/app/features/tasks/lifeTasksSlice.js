/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const lifeTasksAdapter = createEntityAdapter({
  selectId: (task) => task.taskId,
});

export const lifeTasksSlice = createSlice({
  name: "tasks",
  initialState: lifeTasksAdapter.getInitialState(),
  reducers: {
    addLifeTask: lifeTasksAdapter.addOne,
    removeLifeTask: lifeTasksAdapter.removeOne,
  },
});

export const { addLifeTask, removeLifeTask } = lifeTasksSlice.actions;

export const lifeTasksSelector = lifeTasksAdapter.getSelectors(
  (state) => state.lifeTasks
);

export default lifeTasksSlice.reducer;
