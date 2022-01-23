import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { reducer as jobClassReducer } from "./features/jobClass";

const rootReducer = combineReducers({
  jobClass: jobClassReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
