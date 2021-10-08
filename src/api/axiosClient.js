import axios from 'axios';
import queryString from "querystring";


let headers = {};
headers['x-access-token'] = localStorage.x_accessToken? localStorage.x_accessToken : null;
headers['x-refresh-token'] = localStorage.x_refreshToken? localStorage.x_refreshToken : null;


const axiosClient = axios.create({
  baseURL: 'http://localhost:3002/api/',
  headers: headers,
  timeout: 5000,
  paramsSerializer: (params) => queryString.stringify(params),
});

export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
};
export default axiosClient;