import { put, all, call, takeLatest } from 'redux-saga/effects';
import { apiInstance } from '../../helpers/api';
import { showNotification } from '../../helpers';
import {
  LOGIN_REQUESTING,
  loginSuccess,
  loginError,
} from './actions';
import { browserRedirect } from '../../helpers';

//Login API call
function loginCall(payload) {
  return apiInstance('post', '/auth/signin', payload);
}

// LOGIN Worker
export function* loginWorker({ payload }) {
  try {
    const response = yield call(loginCall, payload);
    // console.log('Login Response: ', response)    
    if (response && response.data && response.data.user && response.data.token) {
      yield put(loginSuccess());
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      // showNotification('suceess', 'Login Successfully!');
      yield call(browserRedirect, '/home');
    }
  } catch (err) {    
    // console.log('Login Error: ', JSON.stringify(err))
    yield put(loginError(JSON.stringify(err)));
  }
}

// Login Watcher
export default function* loginSaga() {
  yield all([
    takeLatest(LOGIN_REQUESTING, loginWorker),
  ]);
}