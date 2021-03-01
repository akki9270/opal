import {
  SIGNUP_PAGE_INIT,
  SIGNUP_ERROR,
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  LOGIN_PAGE_INIT,
  LOGIN_ERROR,
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
} from './actions';

// The initial state of the Login Reducer
export const initialState = {  
  requesting: false,
  successful: false,
  messages: [],
  errors: {},
  user: null,  
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case SIGNUP_PAGE_INIT:
      return { ...state, errors: {} };
    case SIGNUP_REQUESTING:
      return { ...state, requesting: true };
    case SIGNUP_SUCCESS:
      return { ...state, requesting: false, successful: true, errors: {} };
    case SIGNUP_ERROR:
      return { ...state, requesting: false, successful: false, errors: { ...actions.error } };
    case LOGIN_PAGE_INIT:
      return { ...state, errors: {} };
    case LOGIN_REQUESTING:
      return { ...state, requesting: true };
    case LOGIN_SUCCESS:
      return { ...state, requesting: false, successful: true, user: { ...actions.payload } };
    case LOGIN_ERROR:
      return { ...state, requesting: false, successful: false, errors: { ...actions.error } };
    default:
      return state;
  }
}