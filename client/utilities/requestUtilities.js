import axios from 'axios';
import { loadUserToken } from '../utilities/localStorage';

export function getJsonHeaders() {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

export function getHeaders(token) {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
}

export function get(endpoint) {
  const token = loadUserToken();
  const headers = getHeaders(token);

  return axios.get(endpoint, headers);
}

export function post(endpoint, data) {
  const token = loadUserToken();
  const headers = getHeaders(token);

  return axios.post(endpoint, data, headers);
}

export function put(endpoint, data) {
  const token = loadUserToken();
  const headers = getHeaders(token);

  return axios.put(endpoint, data, headers);
}
