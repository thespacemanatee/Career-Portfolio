import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Buffer } from "buffer";
import {
  ONET_ENDPOINT,
  ONET_PASSWORD,
  ONET_USERNAME,
} from "react-native-dotenv";
import { v4 as uuidv4 } from "uuid";

import alert from "../components/CustomAlert";
import * as data from "../data/career_data.json";
import {
  ResultsCountData,
  ResultsLocalStorage,
  ResultsPayload,
  ResultsState,
  TaskObject,
} from "../types";

type CareerDataTask = {
  index: number;
  "O*NET-SOC Code": string;
  Title: string;
  "Task ID": number;
  Task: string;
  "Task Type": string;
  "DWA ID": string;
  "DWA Title": string;
  "IWA ID": string;
  "IWA Title": string;
  "Element ID": string;
  "Element Name": string;
};

const dataArray: CareerDataTask[] = Object.values(data);

export const fetchOnetData = async (occupation: string) => {
  const url = `${ONET_ENDPOINT}${occupation}&start=1&end=50`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${ONET_USERNAME}:${ONET_PASSWORD}`
      ).toString("base64")}`,
    },
  });

  return res.data.occupation?.map((item) => item.title);
};

export const saveUserInput = async (
  payload: ResultsPayload,
  id: string,
  editing: boolean
) => {
  const saveId = id || uuidv4();
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
        ...(editing && { editedDate: new Date().getTime() }),
      },
    };

    Object.assign(savedEntries, toSave);

    await AsyncStorage.setItem("savedEntries", JSON.stringify(savedEntries));
  } catch (err) {
    console.error("Error saving user input data", err);
  }
  return saveId;
};

export const deleteUserInput = async (id: string) => {
  try {
    const savedEntries: ResultsLocalStorage = JSON.parse(
      await AsyncStorage.getItem("savedEntries")
    );

    delete savedEntries[id];

    await AsyncStorage.setItem("savedEntries", JSON.stringify(savedEntries));
  } catch (err) {
    console.error("Error deleteing user input data", err);
  }
};

export const getResultsTasks = (
  occupation: ResultsCountData,
  results: ResultsState,
  tasks: TaskObject[]
) => {
  const similarTasks: string[] = results.similar
    .filter((e) => e.title === occupation.title)
    .map((e) => e.similarIWA);
  const missingTasks: string[] = results.missing
    .filter((e) => e.title === occupation.title)
    .map((e) => e.missingIWA);
  const notRelevantTasks: string[] = tasks
    .filter(
      (e) =>
        !similarTasks.some((d) => e.task === d) &&
        !missingTasks.some((d) => e.task === d)
    )
    .map((e) => e.task);
  return { similarTasks, missingTasks, notRelevantTasks };
};

export const sortByOccurrences = (array: any[]) => {
  const map = array.reduce((p, c) => {
    p[c] = (p[c] || 0) + 1;
    return p;
  }, {});

  return Object.keys(map).sort((a, b) => map[b] - map[a]);
};

export const getTasksByAction = (action: string) => {
  let tasks = dataArray.filter((e) => {
    const words = `${e.Task}`.split(/[ ,]+/).map((verb) => verb.toLowerCase());
    return words.includes(action.toLowerCase());
  });

  tasks = tasks.filter(
    (task, index, self) =>
      task["IWA Title"] && self.findIndex((e) => e.Task === task.Task) === index
  );
  return tasks;
};

export const getTasksByOccupation = (occupation: string) => {
  let tasks = dataArray.filter((e) => e.Title === occupation);

  tasks = tasks.filter(
    (task, index, self) =>
      task["IWA Title"] && self.findIndex((e) => e.Task === task.Task) === index
  );
  return tasks;
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
