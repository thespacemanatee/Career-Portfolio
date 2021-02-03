import { RESET_CORE_TASKS, TOGGLE_CORE_TASK } from "../actions/task";

const initialState = {
  chosenOccupation: null,
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
        return {
          ...state,
          chosenOccupation: action.coreTask["Title"],
          coreTasks: updatedCoreTasks,
        };
      } else {
        // console.log("REDUCER TASK: " + JSON.stringify(action.coreTask));
        return {
          ...state,
          chosenOccupation: action.coreTask["Title"],
          coreTasks: state.coreTasks.concat(action.coreTask),
        };
      }

    case RESET_CORE_TASKS:
      console.log("ACTION: " + action.chosenOccupation);
      console.log("STATE: " + state.chosenOccupation);
      if (action.chosenOccupation === state.chosenOccupation) {
        return state;
      }
      return { ...state, chosenOccupation: null, coreTasks: [] };

    default:
      return state;
  }
};

export default tasksReducer;
