import {
  RESET_CALCULATION,
  SAVE_FIRST_STEP,
  SAVE_SECOND_STEP
} from "./actions";

const initialState = {  
  firstStep: {},
  secondStep: {}  
};

function calculationReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_FIRST_STEP:
      state = {
        ...state,
        firstStep: action.payload,
      };
      break;
    case SAVE_SECOND_STEP:
      state = {
        ...state,
        secondStep: action.payload,
      };
      break;    
    case RESET_CALCULATION:
      state = {
        ...initialState,
      };
      break;    
    default:
      return state;
  }
  return state;
}
export default calculationReducer;