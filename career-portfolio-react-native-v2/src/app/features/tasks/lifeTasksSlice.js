/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const lifeTasksAdapter = createEntityAdapter({
  selectId: (task) => task["Task ID"],
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

export default lifeTasksSlice.reducer;
