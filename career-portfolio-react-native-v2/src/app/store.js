import { configureStore } from "@reduxjs/toolkit";

import formReducer from "./features/form/formSlice";
import tasksReducer from "./features/tasks/tasksSlice";

export default configureStore({
  reducer: {
    form: formReducer,
    tasks: tasksReducer,
  },
});
