import axios from 'axios';

export function headers(token) {
  return {
    headers: {
      'content-type': 'application/json',
      authorization: token,
    },
  };
}

export function get(token) {
  return function(endpoint) {
    return axios.get(endpoint, headers(token));
  };
}

export function put(token) {
  return function(endpoint, data) {
    return axios.put(endpoint, data, headers(token));
  };
}

export function post(token) {
  return function(endpoint, data) {
    return axios.post(endpoint, data, headers(token));
  };
}

export function patch(token) {
  return function(endpoint, data) {
    return axios.patch(endpoint, data, headers(token));
  };
}

export function deleteApi(token) {
  return function(endpoint) {
    return axios.delete(endpoint, headers(token));
  };
}

export default {
  get,
  put,
  post,
  patch,
  delete: deleteApi,
};
