import alert from "../components/CustomAlert";
import * as data from "../data/career_data.json";

const dataArray = Object.values(data);

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
