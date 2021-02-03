export const TOGGLE_CORE_TASK = "TOGGLE_CORE_TASK";
// export const REMOVE_TASK = "REMOVE_TASK";

export const toggleCoreTask = (task) => {
  return { type: TOGGLE_CORE_TASK, coreTask: task };
};

// export const removeTask = (task) => {
//   return { type: REMOVE_TASK, task: task };
// };
