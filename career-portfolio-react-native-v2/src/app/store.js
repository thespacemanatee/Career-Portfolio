import { configureStore } from "@reduxjs/toolkit";

import formReducer from "./features/form/formSlice";
import localReducer from "./features/local/localSlice";
import tasksReducer from "./features/tasks/tasksSlice";
import lifeTasksReducer from "./features/tasks/lifeTasksSlice";

export default configureStore({
  reducer: {
    form: formReducer,
    local: localReducer,
    tasks: tasksReducer,
    lifeTasks: lifeTasksReducer,
  },
});
