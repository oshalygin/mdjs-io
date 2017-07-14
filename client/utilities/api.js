import axios from 'axios';
import { loadUserToken } from '../utilities/localStorage';

export function getJsonHeaders() {
  return {
    headers: {
      'Content-Type': 'application/json'
    }
  };
}

export function getHeaders(token) {
  return {
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
      Authorization: token
    }
  };
}

const token = loadUserToken();
const headers = getHeaders(token);

export function get(endpoint) {
  return axios.get(endpoint, headers);
}

export function put(endpoint, data) {
  return axios.put(endpoint, data, headers);
}

export function post(endpoint, data) {
  return axios.post(endpoint, data, headers);
}

export function patch(endpoint, data) {
  return axios.patch(endpoint, data, headers);
}

export function deleteApi(endpoint) {
  return axios.delete(endpoint, headers);
}

export default {
  get,
  put,
  post,
  patch,
  delete: deleteApi
};
