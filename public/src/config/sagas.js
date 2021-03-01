import { all } from "redux-saga/effects";
import loginSaga  from "../modules/auth/loginSaga";
import signupSaga  from "../modules/auth/signupSaga";

export default function* mainSaga() {
  yield all([
    loginSaga(),    
    signupSaga()
  ]);
}

// import { fork } from 'redux-saga/effects'
// import { watchLoginRequest, watchSignupRequest }  from "../modules/auth/saga";

// export default function* mainSaga() {
//   yield [
//     fork(watchLoginRequest),
//     fork(watchSignupRequest)
//   ]
// }  