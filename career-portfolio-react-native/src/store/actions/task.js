export const ADD_ALL_TASKS = "ADD_ALL_TASKS";
export const TOGGLE_CORE_TASK = "TOGGLE_CORE_TASK";
export const RESET_CORE_TASKS = "RESET_CORE_TASKS";
export const TOGGLE_LIFE_TASK = "TOGGLE_LIFE_TASK";
// export const POST_TASKS = "POST_TASKS";

export const addAllTasks = (tasks, occupation) => {
  return { type: ADD_ALL_TASKS, tasks: tasks, chosenOccupation: occupation };
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

// export const postTasks = (storeTasks) => {
//   return async (dispatch) => {
//     const response = await fetch("http://localhost:3000/posts/1", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(storeTasks),
//     });

//     if (!response.ok) {
//       const errorResponse = await response.json();
//       const errorId = errorResponse.error.message;
//       let message = "Something went wrong!";
//     }

//     const responseData = await response.json();
//     console.log(responseData);

//     dispatch(null);
//   };
// };
