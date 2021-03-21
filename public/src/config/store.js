import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { mainReducer } from "../config/reducers";
import mainSaga from "../config/sagas";

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(mainSaga);

export default store;