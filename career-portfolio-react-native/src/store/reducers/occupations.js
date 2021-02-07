import { STORE_OCCUPATIONS } from "../actions/occupations";

const initialState = {
  occupations: [],
};

const occupationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_OCCUPATIONS:
      return {
        ...state,
        occupations: action.occupations,
      };

    default:
      return state;
  }
};

export default occupationsReducer;
