import { STORE_VERBS } from "../actions/verbs";

const initialState = {
  verbs: [],
};

const verbsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_VERBS:
      return {
        ...state,
        verbs: action.verbs,
      };

    default:
      return state;
  }
};

export default verbsReducer;
