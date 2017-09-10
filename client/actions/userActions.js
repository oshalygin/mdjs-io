import {
  LOGOUT_SUCCESS,
  REQUEST_LOGGED_IN_USER,
  GET_LOGGED_IN_USER_ERROR,
  GET_LOGGED_IN_USER_SUCCESS,
  REQUEST_LOGIN,
  LOGIN_ERROR,
  REQUEST_LOGOUT,
} from './actionTypes';

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logout = () => ({
  type: REQUEST_LOGOUT,
});

export const retrieveLoggedInUser = () => ({
  type: REQUEST_LOGGED_IN_USER,
});

export const userLogin = data => ({
  type: REQUEST_LOGIN,
  data,
});

export const userLoginValidationErrors = () => ({
  type: LOGIN_ERROR,
});

export const getLoggedInUserError = () => ({
  type: GET_LOGGED_IN_USER_ERROR,
});

export const getLoggedInUserSuccess = data => ({
  type: GET_LOGGED_IN_USER_SUCCESS,
  data,
});
