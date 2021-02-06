import {
  ADD_ALL_TASKS,
  RESET_CORE_TASKS,
  TOGGLE_CORE_TASK,
} from "../actions/task";

const initialState = {
  chosenOccupation: null,
  tasks: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALL_TASKS:
      return {
        ...state,
        tasks: action.tasks,
      };

    case TOGGLE_CORE_TASK:
      // console.log("toggling...");
      // console.log("state.coreTasks: " + state.coreTasks);

      const updatedCoreTasks = [...state.tasks];
      updatedCoreTasks.map((item) => {
        item["Task ID"] === action.coreTask["Task ID"]
          ? (item.coreTask = !item.coreTask)
          : item;
      });
      console.log(state.tasks);
      return {
        ...state,
        chosenOccupation: action.coreTask["Title"],
        tasks: updatedCoreTasks,
      };

    // const existingIndex = state.tasks.findIndex(
    //   (task) => task === action.coreTask
    // );
    // // console.log(existingIndex);
    // if (existingIndex >= 0) {
    //   const updatedCoreTasks = [...state.tasks];
    //   updatedCoreTasks.splice(existingIndex, 1);
    //   return {
    //     ...state,
    //     chosenOccupation: action.coreTask["Title"],
    //     coreTasks: updatedCoreTasks,
    //   };
    // } else {
    //   // console.log("REDUCER TASK: " + JSON.stringify(action.coreTask));
    //   return {
    //     ...state,
    //     chosenOccupation: action.coreTask["Title"],
    //     coreTasks: state.tasks.concat(action.coreTask),
    //   };
    // }

    case RESET_CORE_TASKS:
      console.log("ACTION: " + action.chosenOccupation);
      console.log("STATE: " + state.chosenOccupation);
      if (action.chosenOccupation === state.chosenOccupation) {
        return state;
      }
      return { ...state, chosenOccupation: null, tasks: [] };

    default:
      return state;
  }
};

export default tasksReducer;
