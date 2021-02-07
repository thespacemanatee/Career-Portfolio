import {
  ADD_ALL_TASKS,
  TOGGLE_LIFE_TASK,
  RESET_CORE_TASKS,
  TOGGLE_CORE_TASK,
} from "../actions/task";
import _ from "lodash";

const initialState = {
  chosenOccupation: null,
  tasks: [],
  lifeTasks: [],
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
      // console.log(state.tasks);
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

    case TOGGLE_LIFE_TASK:
      const lifeTask = { ...action.lifeTask };
      lifeTask.lifeTask = true;
      // console.log(lifeTask);
      // const existingIndex = state.tasks.findIndex((task) => task === lifeTask);
      // console.log(existingIndex);
      if (
        state.lifeTasks.some((item) => item["Task ID"] === lifeTask["Task ID"])
      ) {
        const updatedLifeTasks = [...state.lifeTasks];
        // updatedLifeTasks.splice(existingIndex, 1);
        const filtered = updatedLifeTasks.filter(
          (item) => item["Task ID"] !== lifeTask["Task ID"]
        );
        console.log("existingIndex >= 0: --------------------");
        console.log(updatedLifeTasks);
        return {
          ...state,
          lifeTasks: filtered,
        };
      } else {
        // console.log("REDUCER TASK: " + JSON.stringify(action.coreTask));
        console.log("else: --------------------");
        console.log(state.lifeTasks.concat(lifeTask));
        return {
          ...state,
          lifeTasks: state.lifeTasks.concat(lifeTask),
        };
      }

    // console.log("updatedLifeTasks: " + updatedLifeTasks);
    // updatedLifeTasks.map((item) => {
    //   if (item["Task ID"] === action.lifeTask["Task ID"]) {
    //     item.lifeTask = !item.lifeTask;
    //   }
    // });
    // return {
    //   ...state,
    //   tasks: updatedLifeTasks,
    // };

    default:
      return state;
  }
};

export default tasksReducer;
