import { put, all, call, takeLatest } from 'redux-saga/effects';
import { apiInstance } from '../../helpers/api';
import {
  SIGNUP_REQUESTING,
  signupSuccess,
  signupError,
  LOGIN_REQUESTING,
  loginSuccess,
  loginError,
} from './actions';
import { browserRedirect } from '../../helpers';

//Register API call
function signupCall(payload) {  
  return apiInstance('post', '/auth/signup', payload);
}

// Register Worker
export function* signupWorker({ payload }) {
  try {
    let response = yield call(signupCall, payload);
    console.log('Response: ', response)
    yield put(signupSuccess());    
    yield call(browserRedirect, '/');
  } catch (err) {
    yield put(signupError(err.response.data));
  }
}

export function* watchSignupRequest() {
  yield* takeLatest(SIGNUP_REQUESTING, signupWorker)
}

//Login API call
function loginCall(payload) {
  return apiInstance('post', '/auth/signin', payload);
}

// LOGIN Worker
export function* loginWorker({ payload }) {
  try {
    let response = yield call(loginCall, payload);
    console.log('Login Response: ', response)
    yield put(loginSuccess());
    yield call(browserRedirect, '/');
  } catch (err) {
    yield put(loginError(err.response.data));
  }
}

export function* watchLoginRequest() {
  yield* takeLatest(LOGIN_REQUESTING, loginWorker)
}

// Register Watcher
// export default function* authSaga() {
//   yield all([
//     takeLatest(SIGNUP_REQUESTING, signupWorker),   
//     takeLatest(LOGIN_REQUESTING, loginWorker), 
//   ]);
// }