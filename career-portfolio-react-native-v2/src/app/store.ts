import { configureStore, combineReducers } from "@reduxjs/toolkit";

import formReducer from "./features/form/formSlice";
import localReducer from "./features/local/localSlice";
import tasksReducer from "./features/tasks/tasksSlice";
import resultsReducer from "./features/results/resultsSlice";

const rootReducer = combineReducers({
  form: formReducer,
  local: localReducer,
  tasks: tasksReducer,
  results: resultsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
