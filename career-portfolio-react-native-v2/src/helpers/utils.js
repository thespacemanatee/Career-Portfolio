import _ from "lodash";

import alert from "../components/CustomAlert";
import * as data from "../data/career_data.json";

const dataArray = Object.values(data);

export const getActionVerbsArray = () => {
  return new Promise((resolve, reject) => {
    const tempArray = [];
    dataArray.forEach((element) => {
      const { Task } = element;
      const actionVerb = `${Task}`.split(/[ ,]+/, 1).toString();
      if (
        !tempArray.find((v) =>
          _.isEqual(`${v}`.split(/[ ,]+/, 1).toString(), actionVerb)
        )
      )
        tempArray.push(actionVerb);
    });
    tempArray.sort();
    resolve(tempArray);
  });
};

export const getOccupationsArray = () => {
  return new Promise((resolve, reject) => {
    const tempArray = [];
    dataArray.forEach((element) => {
      const { Title } = element;
      // const actionVerb = (Task + "").split(/[ ,]+/, 1).toString();
      if (!tempArray.find((v) => _.isEqual(v, Title))) tempArray.push(Title);
    });
    tempArray.sort();
    resolve(tempArray);
  });
};

// eslint-disable-next-line import/prefer-default-export
export const handleErrorResponse = (err, action) => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { data, status, headers } = err.response;
    console.error(data);
    console.error(status);
    console.error(headers);

    switch (Math.floor(err.response.status / 100)) {
      case 4: {
        alert(
          "Error",
          data.description,
          action
            ? [
                { text: "Cancel", style: "cancel" },
                { text: "Confirm", onPress: action },
              ]
            : [{ text: "Okay" }]
        );
        break;
      }
      case 5: {
        alert("Server Error", "Please contact your administrator.");
        break;
      }
      default: {
        alert("Request timeout", "Check your internet connection.");
        break;
      }
    }
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
