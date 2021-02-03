import { TOGGLE_CORE_TASK } from "../actions/task";

const initialState = {
  coreTasks: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CORE_TASK:
      // console.log("toggling...");
      // console.log("state.coreTasks: " + state.coreTasks);

      const existingIndex = state.coreTasks.findIndex(
        (task) => task === action.coreTask
      );
      // console.log(existingIndex);
      if (existingIndex >= 0) {
        const updatedCoreTasks = [...state.coreTasks];
        updatedCoreTasks.splice(existingIndex, 1);
        return { coreTasks: updatedCoreTasks };
      } else {
        // console.log("REDUCER TASK: " + JSON.stringify(action.coreTask));
        return {
          coreTasks: state.coreTasks.concat(action.coreTask),
        };
      }
    default:
      return state;
  }
};

export default tasksReducer;
