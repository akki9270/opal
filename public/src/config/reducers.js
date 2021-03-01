import { combineReducers } from "redux";
// import loginReducer from "../Login/reducer";
import authReducer from "../modules/auth/reducer";

export const mainReducer = combineReducers({  
  auth: authReducer,  
});