export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";

export const addTask = (task) => {
  return { type: ADD_TASK, task: task };
};

export const removeTask = (task) => {
  return { type: REMOVE_TASK, task: task };
};
