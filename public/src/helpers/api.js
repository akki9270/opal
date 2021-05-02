import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 30000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if(token){
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    }
    return config;
  },
  (error) => {
    console.log('Error reuest: ', error);
    Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  (response) => {    
    const { headers, data } = response;
    console.log('response: ', response);  
    return response;
  },
  (error) => {
    console.log('Error response: ', JSON.stringify(error));
    return Promise.reject(error);
  },
);
