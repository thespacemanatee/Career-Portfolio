import _ from "lodash";

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
