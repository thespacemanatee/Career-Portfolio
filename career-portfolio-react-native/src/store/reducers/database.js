import { POST_RESULT } from "../actions/database";

const initialState = {
  result: [],
};

const databaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_RESULT:
      //   console.log(action.result);
      return {
        ...state,
        result: action.result,
      };
    default:
      return state;
  }
};

export default databaseReducer;
