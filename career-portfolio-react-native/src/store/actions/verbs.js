import _ from "lodash";
import * as data from "../../data/career_data.json";

const dataArray = Object.values(data);

export const STORE_VERBS = "STORE_VERBS";

export const storeVerbs = (verbs) => {
  // console.log("action: " + verbs);
  return { type: STORE_VERBS, verbs };
};

// const getActionVerbsArray = () => {
//   return new Promise((resolve, reject) => {
//     const tempArray = [];
//     dataArray.forEach((element) => {
//       const { Task } = element;
//       const actionVerb = (Task + "").split(/[ ,]+/, 1).toString();
//       if (
//         !tempArray.find((v) =>
//           _.isEqual((v + "").split(/[ ,]+/, 1).toString(), actionVerb)
//         )
//       )
//         tempArray.push(actionVerb);
//     });
//     tempArray.sort();
//     // console.log(tempArray);
//     resolve(tempArray);
//   });
// };

// export const getVerbs = () => {
//   return async (dispatch) => {
//     const actionVerbs = await getActionVerbsArray();
//     dispatch(storeVerbs(actionVerbs));
//   };
// };

// const fetchActionVerbs = useCallback(async () => {
//   try {
//     const actionVerbs = await getActionVerbsArray();
//     // console.log(actionVerbs);
//     storeVerbsHandler(actionVerbs);
//   } catch {
//     console.log("Error in fetchActionVerbs");
//   }
// }, []);

// useEffect(() => {
//   fetchActionVerbs();
// }, []);
