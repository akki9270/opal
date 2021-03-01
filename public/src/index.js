import React from 'react';
import ReactDOM from 'react-dom';
import { Button, message } from 'antd';
import Routes from './Routes';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './config/store';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.register({
  onUpdate: (registration) => {
    if (registration && registration.waiting) {
      message.info({
        content: (
          <>
            New version available! Click Reload to get the latest version.
            <Button
              className='ml-1 mb-0'
              type='link'
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                registration &&
                  registration.waiting &&
                  registration.waiting.postMessage &&
                  registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                // eslint-disable-next-line no-undef
                window.location.reload(true);
              }}
            >
              Reload
            </Button>
          </>
        ),
        duration: 0
      });
    }
  }
});
