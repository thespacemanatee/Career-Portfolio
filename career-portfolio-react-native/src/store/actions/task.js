export const TOGGLE_CORE_TASK = "TOGGLE_CORE_TASK";
export const RESET_CORE_TASKS = "RESET_CORE_TASKS";

export const toggleCoreTask = (task) => {
  return { type: TOGGLE_CORE_TASK, coreTask: task };
};

export const resetCoreTasks = (occupation) => {
  return { type: RESET_CORE_TASKS, chosenOccupation: occupation };
};
