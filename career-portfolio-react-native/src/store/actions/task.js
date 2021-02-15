export const ADD_ALL_TASKS = "ADD_ALL_TASKS";
export const ADD_COMBINED_TASKS = "ADD_COMBINED_TASKS";
export const TOGGLE_CORE_TASK = "TOGGLE_CORE_TASK";
export const RESET_CORE_TASKS = "RESET_CORE_TASKS";
export const TOGGLE_LIFE_TASK = "TOGGLE_LIFE_TASK";
export const DELETE_TASKS = "DELETE_TASKS";
export const DELETE_LIFE_TASKS = "DELETE_LIFE_TASKS";
export const SET_USER_INPUT = "SET_USER_INPUT";

export const addAllTasks = (tasks) => {
  return { type: ADD_ALL_TASKS, tasks: tasks };
};
export const addCombinedTasks = (tasks) => {
  return { type: ADD_COMBINED_TASKS, tasks: tasks };
};

export const toggleCoreTask = (task) => {
  return { type: TOGGLE_CORE_TASK, coreTask: task };
};

export const resetCoreTasks = (occupation) => {
  return { type: RESET_CORE_TASKS, chosenOccupation: occupation };
};

export const toggleLifeTask = (task) => {
  return { type: TOGGLE_LIFE_TASK, lifeTask: task };
};

export const deleteTasks = (tasks) => {
  return { type: DELETE_TASKS, tasks: tasks };
};

export const deleteLifeTasks = (tasks) => {
  return { type: DELETE_LIFE_TASKS, tasks: tasks };
};

export const setUserInput = (input) => {
  return { type: SET_USER_INPUT, input: input };
};
