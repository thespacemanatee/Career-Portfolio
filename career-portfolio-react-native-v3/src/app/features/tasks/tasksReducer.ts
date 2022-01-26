import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type RecommendedTask = {
  index: number;
  iwaId: string;
  similarityScore: number;
};

interface TasksState {
  taskSet: number;
  recommendedTasks: RecommendedTask[];
  swipedTasks: string[];
}

const initialState: TasksState = {
  taskSet: 0,
  recommendedTasks: [],
  swipedTasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskSet: (state, action: PayloadAction<number>) => {
      state.taskSet = action.payload;
    },
    setRecommendedTasks: (state, action: PayloadAction<RecommendedTask[]>) => {
      state.recommendedTasks = action.payload.reverse();
    },
    setSwipedTask: (state, action: PayloadAction<string[]>) => {
      state.swipedTasks = action.payload;
    },
    removeFirstTask: (state) => {
      state.recommendedTasks.splice(0, 1);
    },
    resetTasks: (state) => {
      state.recommendedTasks = [];
    },
    resetTasksState: () => initialState,
  },
});

export const {
  setTaskSet,
  setRecommendedTasks,
  setSwipedTask,
  removeFirstTask,
  resetTasks,
  resetTasksState,
} = tasksSlice.actions;

export const { reducer } = tasksSlice;
