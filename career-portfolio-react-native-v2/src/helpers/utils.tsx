import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

import alert from "../components/CustomAlert";
import * as data from "../data/career_data.json";
import { ResultsLocalStorage, ResultsPayload } from "../types";

const dataArray = Object.values(data);

export const saveUserInput = async (payload: ResultsPayload, id: string) => {
  const saveId = id || uuidv4();
  console.log(saveId);
  try {
    let savedEntries: ResultsLocalStorage = JSON.parse(
      await AsyncStorage.getItem("savedEntries")
    );

    if (savedEntries === null) {
      savedEntries = {};
    }

    const toSave: ResultsLocalStorage = {
      [saveId]: {
        payload,
        ...(id ? { editedDate: new Date() } : { date: new Date() }),
      },
    };

    Object.assign(savedEntries, toSave);

    await AsyncStorage.setItem("savedEntries", JSON.stringify(savedEntries));
  } catch (err) {
    console.error("Error saving user input data", err);
  }
  return saveId;
};

/**
 * ? Experimental
 * @param result object containing the results from backend
 * @param tasks tasks input by user
 */
// export const saveResultsToStorage = async (
//   result: ResultsState,
//   tasks: TaskObject[]
// ) => {
//   const { count, missing, similar } = result;
//   try {
//     let savedResults: ResultsLocalStorageData = JSON.parse(
//       await AsyncStorage.getItem("results")
//     );

//     if (savedResults === null) {
//       savedResults = [];
//     }

//     const familiarity = [...count]
//       .sort((a, b) => b.similarTasks - a.similarTasks)
//       .slice(0, 10);

//     const preference = [...count]
//       .sort((a, b) => b.preferenceScore - a.preferenceScore)
//       .slice(0, 10);

//     const personality = [...count]
//       .sort((a, b) => b.riasecScore - a.riasecScore)
//       .slice(0, 10);

//     const bestFit = [...count]
//       .sort((a, b) => b.similarityScore - a.similarityScore)
//       .slice(0, 10);

//     const id = uuidv4();
//     const toSave: ResultsLocalStorageItem = {
//       id,
//       [ResultsCategory.FAMILIARITY]: {
//         count: familiarity,
//         missing: processResultBaseData(familiarity, missing),
//         similar: processResultBaseData(familiarity, similar),
//         irrelevant: processIrrelevantTasks(tasks, similar),
//       },
//       [ResultsCategory.PREFERENCE]: {
//         count: preference,
//         missing: processResultBaseData(preference, missing),
//         similar: processResultBaseData(preference, similar),
//         irrelevant: processIrrelevantTasks(tasks, similar),
//       },
//       [ResultsCategory.PERSONALITY]: {
//         count: personality,
//         missing: processResultBaseData(personality, missing),
//         similar: processResultBaseData(personality, similar),
//         irrelevant: processIrrelevantTasks(tasks, similar),
//       },
//       [ResultsCategory.BEST_FIT]: {
//         count: bestFit,
//         missing: processResultBaseData(bestFit, missing),
//         similar: processResultBaseData(bestFit, similar),
//         irrelevant: processIrrelevantTasks(tasks, similar),
//       },
//     };

//     savedResults.push(toSave);
//     console.log(savedResults);

//     await AsyncStorage.setItem("results", JSON.stringify(savedResults));
//   } catch (err) {
//     // error reading value
//     console.error("Error saving results data", err);
//   }
// };

// const processResultBaseData = (
//   result: ResultsCountData[],
//   toFilter: ResultsBaseData[]
// ): ResultsBaseData[][] => {
//   return result.map((item: ResultsBaseData) =>
//     toFilter.filter((e) => e.title === item.title)
//   );
// };

// const processIrrelevantTasks = (
//   result: TaskObject[],
//   toFilter: ResultsSimilarData[]
// ): ResultsSimilarData[][] => {
//   return result.map((item: TaskObject) =>
//     toFilter.filter((e) => e.similarIWA !== item.IWA_Title)
//   );
// };

export const getTasksByAction = (action: string) => {
  let tempArray = dataArray.filter((e) => {
    const words = `${e.Task}`.split(/[ ,]+/).map((verb) => verb.toLowerCase());
    return words.includes(action.toLowerCase());
  });

  tempArray = tempArray.filter(
    (task, index, self) => self.findIndex((e) => e.Task === task.Task) === index
  );
  return tempArray;
};

export const getTasksByOccupation = (occupation) => {
  let tempArray = dataArray.filter((e) => e.Title === occupation);

  tempArray = tempArray.filter(
    (task, index, self) => self.findIndex((e) => e.Task === task.Task) === index
  );
  return tempArray;
};

export const getActionVerbsArray = () => {
  return new Promise((resolve) => {
    const tempArray = [];
    dataArray.forEach((element) => {
      const { Task } = element;
      const actionVerb = `${Task}`.split(/[ ,]+/, 1).toString();
      if (
        !tempArray.find(
          (v) => `${v}`.split(/[ ,]+/, 1).toString() === actionVerb
        )
      )
        tempArray.push(actionVerb);
    });
    tempArray.sort();
    resolve(tempArray);
  });
};

export const getOccupationsArray = () => {
  return new Promise((resolve) => {
    const tempArray = [];
    dataArray.forEach((element) => {
      const { Title } = element;
      if (!tempArray.find((v) => v === Title)) tempArray.push(Title);
    });
    tempArray.sort();
    resolve(tempArray);
  });
};

export const handleErrorResponse = (err: any, action?: () => void) => {
  if (err.name) {
    const { name, message, stack } = err;
    console.error(name);
    console.error(message);
    console.error(stack);
    alert(
      name,
      message,
      action
        ? [
            { text: "Cancel", style: "cancel" },
            { text: "Confirm", onPress: action },
          ]
        : [{ text: "Okay" }]
    );
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error(err.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error", err.message);
  }
  console.error(err.config);
};
