import { put, all, call, takeLatest } from 'redux-saga/effects';
import { apiInstance } from '../../helpers/api';
import {
  SIGNUP_REQUESTING,
  signupSuccess,
  signupError,
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

// Register Watcher
export default function* signupSaga() {
  yield all([
    takeLatest(SIGNUP_REQUESTING, signupWorker),       
  ]);
}