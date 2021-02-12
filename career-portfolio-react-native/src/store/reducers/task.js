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
        chosenOccupation: action.chosenOccupation,
        tasks: action.tasks,
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
