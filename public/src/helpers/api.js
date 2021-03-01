import axios from "axios";

const API_ROOT = process.env.REACT_APP_SERVER_URL;

export const apiInstance = (method, url, payload = null, headers = 1) => {
  let requestData = {
    method: method,
    url: API_ROOT + url
  }
  if (payload)
    requestData.data = payload;
  // if (headers === 1)
  //   requestData.headers = {
  //     'Authorization': 'Bearer ' + localStorage.getItem('token')
  //   };
  console.log('requestData: ', requestData)  
  return axios(requestData);
}