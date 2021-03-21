import { combineReducers } from "redux";
// import loginReducer from "../Login/reducer";
import authReducer from "../modules/auth/reducer";
import calculationReducer from "../modules/online-calculation/reducer";

export const mainReducer = combineReducers({  
  auth: authReducer,  
  calculation: calculationReducer
});