export const SIGNUP_REQUESTING = 'SIGNUP_REQUESTING';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_PAGE_INIT = 'SIGNUP_PAGE_INIT';

export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_PAGE_INIT = 'LOGIN_PAGE_INIT';

export function signupPageInit() {
  return {
    type: SIGNUP_PAGE_INIT,
  };
}

export function signupRequest(payload) {
  return {
    type: SIGNUP_REQUESTING,
    payload
  };
}

export function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    error,
  };
}

export function signupSuccess() {
  return {
    type: SIGNUP_SUCCESS,
  };
}

export function loginPageInit() {
  return {
    type: LOGIN_PAGE_INIT,
  };
}

export function loginRequest(payload) {
  return {
    type: LOGIN_REQUESTING,
    payload
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}