import _ from "lodash";
import {
  ADD_ALL_TASKS,
  TOGGLE_LIFE_TASK,
  RESET_CORE_TASKS,
  TOGGLE_CORE_TASK,
  DELETE_TASKS,
  DELETE_LIFE_TASKS,
  ADD_COMBINED_TASKS,
  SET_USER_INPUT,
} from "../actions/task";

const initialState = {
  userInput: null,
  chosenOccupation: null,
  tasks: [],
  lifeTasks: [],
  combinedTasks: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALL_TASKS:
      return {
        ...state,
        tasks: action.tasks,
      };

    case ADD_COMBINED_TASKS:
      console.log("ADDING COMBINED TASK NOW");
      return {
        ...state,
        combinedTasks: action.tasks,
      };

    case TOGGLE_CORE_TASK:
      console.log(state.tasks);

      const updatedCoreTasks = [...state.tasks];
      updatedCoreTasks.map((item) => {
        item.taskId === action.coreTask.taskId
          ? item.task_type === "core"
            ? (item.task_type = "supplementary")
            : (item.task_type = "core")
          : item;
      });
      // console.log(state.tasks);
      return {
        ...state,
        tasks: updatedCoreTasks,
      };

    case RESET_CORE_TASKS:
      console.log(`ACTION: ${action.chosenOccupation}`);
      console.log(`STATE: ${state.chosenOccupation}`);
      if (action.chosenOccupation === state.chosenOccupation) {
        return state;
      }
      return { ...state, chosenOccupation: action.chosenOccupation, tasks: [] };

    case TOGGLE_LIFE_TASK:
      const lifeTask = { ...action.lifeTask };
      lifeTask.task_type = "life";
      console.log(state.lifeTasks.concat(lifeTask));
      return {
        ...state,
        lifeTasks: state.lifeTasks.concat(lifeTask),
      };
    // if (state.lifeTasks.some((item) => item.taskId === lifeTask.taskId)) {
    //   const updatedLifeTasks = [...state.lifeTasks];
    //   // updatedLifeTasks.splice(existingIndex, 1);
    //   const filtered = updatedLifeTasks.filter(
    //     (item) => item.taskId !== lifeTask.taskId
    //   );
    //   console.log("existingIndex >= 0: --------------------");
    //   console.log(updatedLifeTasks);
    //   return {
    //     ...state,
    //     lifeTasks: filtered,
    //   };
    // } else {
    //   // console.log("REDUCER TASK: " + JSON.stringify(action.coreTask));
    //   console.log("else: --------------------");
    //   console.log(state.lifeTasks.concat(lifeTask));
    //   return {
    //     ...state,
    //     lifeTasks: state.lifeTasks.concat(lifeTask),
    //   };
    // }
    case DELETE_TASKS:
      let updatedDeleteCoreTasks = [...state.tasks];
      updatedDeleteCoreTasks = updatedDeleteCoreTasks.filter(
        (task) => !action.tasks.includes(task.taskId)
      );
      return {
        ...state,
        tasks: updatedDeleteCoreTasks,
      };
    case DELETE_LIFE_TASKS:
      let updatedDeleteLifeTasks = [...state.lifeTasks];
      updatedDeleteLifeTasks = updatedDeleteLifeTasks.filter(
        (task) => !action.tasks.includes(task.taskId)
      );
      return {
        ...state,
        lifeTasks: updatedDeleteLifeTasks,
      };
    case SET_USER_INPUT:
      return {
        ...state,
        userInput: action.input,
      };

    default:
      return state;
  }
};

export default tasksReducer;
