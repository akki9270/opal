import { notification } from 'antd';
import history from '../helpers/history';

export const browserRedirect = location => {  
  history.push(location);
}

export const showNotification = (type, message) => {  
  notification[type]({
    message,
  })
}

export const isAuthenticated = () => {  
  if (localStorage.getItem('user') && localStorage.getItem('token')) {   
    return true;
  }
  return false;
};

export const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};